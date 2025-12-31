import { useLayoutEffect, useRef, useCallback, useEffect } from 'react';
import { useScroll } from '../../utils/ScrollProvider.jsx'

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{
      backfaceVisibility: 'hidden',
      transformStyle: 'preserve-3d'
    }}
  >
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef(null);
  const cardsRef = useRef([]);
  const cardPositionsRef = useRef([]); // Store initial absolute positions
  const endElementTopRef = useRef(0);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  // Use global scroll context from provider
  const scrollCtx = useScroll()

  // When pinned, use experienceProgress to drive stacking
  const isPinned = scrollCtx?.isExperiencePinned ?? false
  const experienceProgress = scrollCtx?.experienceProgress ?? 0

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const containerHeight = window.innerHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const numCards = cardsRef.current.length;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      let progress = 0;
      let translateY = 0;
      let scale = 1;
      let rotation = 0;
      let blur = 0;

      if (isPinned) {
        // When pinned, use experienceProgress to calculate each card's state
        // Each card stacks one by one as progress goes from 0 to 1
        const cardProgress = experienceProgress * numCards - i;
        progress = Math.max(0, Math.min(1, cardProgress));
        
        // Calculate stacked position
        const stackedY = stackPositionPx + itemStackDistance * i;
        const originalY = cardPositionsRef.current[i] ?? 0;
        const scrollTop = scrollCtx?.scrollTop ?? 0;
        const currentVisualY = originalY - scrollTop;
        
        // Interpolate from current position to stacked position
        translateY = progress * (stackedY - currentVisualY);
        
        // Scale and rotation
        const targetScale = baseScale + i * itemScale;
        scale = 1 - progress * (1 - targetScale);
        rotation = rotationAmount ? i * rotationAmount * progress : 0;
        
        // Blur for cards behind
        if (blurAmount && progress >= 1) {
          const currentTopCard = Math.floor(experienceProgress * numCards);
          if (i < currentTopCard) {
            blur = (currentTopCard - i) * blurAmount;
          }
        }
      } else {
        // Normal scroll behavior - no transforms needed when not pinned
        translateY = 0;
        scale = 1;
        rotation = 0;
        blur = 0;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;

        lastTransformsRef.current.set(i, newTransform);
      }

      if (i === numCards - 1 && progress >= 1 && !stackCompletedRef.current) {
        stackCompletedRef.current = true;
        onStackComplete?.();
      } else if (progress < 1 && stackCompletedRef.current) {
        stackCompletedRef.current = false;
      }
    });

    isUpdatingRef.current = false;
  }, [
    isPinned,
    experienceProgress,
    itemScale,
    itemStackDistance,
    stackPosition,
    baseScale,
    rotationAmount,
    blurAmount,
    onStackComplete,
    parsePercentage,
    scrollCtx
  ]);

  // Trigger updates when experienceProgress or isPinned changes
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(() => {
      updateCardTransforms()
    })
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [experienceProgress, isPinned, updateCardTransforms])

  // ScrollStack uses global scroll from ScrollProvider. Do not create a local Lenis here.
  // All scroll reads should use `scrollCtx.scrollTop` via getScrollData().

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    );

    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    // Calculate and cache initial absolute positions ONCE
    const currentScrollTop = window.scrollY;
    cardPositionsRef.current = cards.map(card => {
      const rect = card.getBoundingClientRect();
      return rect.top + currentScrollTop;
    });

    // Cache end element position
    const endElement = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scroller.querySelector('.scroll-stack-end');
    if (endElement) {
      const endRect = endElement.getBoundingClientRect();
      endElementTopRef.current = endRect.top + currentScrollTop;
    }

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      stackCompletedRef.current = false;
      cardsRef.current = [];
      cardPositionsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    itemDistance,
    useWindowScroll
  ]);

  // Container styles based on scroll mode
  const containerStyles = useWindowScroll
    ? {
        // Global scroll mode - no overflow constraints
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)'
      }
    : {
        // Container scroll mode - original behavior
        overscrollBehavior: 'contain',
        WebkitOverflowScrolling: 'touch',
        scrollBehavior: 'smooth',
        WebkitTransform: 'translateZ(0)',
        transform: 'translateZ(0)',
        willChange: 'scroll-position'
      };

  const containerClassName = useWindowScroll
    ? `relative w-full ${className}`.trim()
    : `relative w-full h-full overflow-y-auto overflow-x-visible ${className}`.trim();

  return (
    <div className={containerClassName} ref={scrollerRef} style={containerStyles}>
      <div className="scroll-stack-inner pt-[20vh] px-20 pb-200 min-h-screen">
        {children}
        {/* Spacer so the last pin can release cleanly */}
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
