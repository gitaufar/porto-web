import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'

const ScrollContext = createContext(null)

export const useScroll = () => useContext(ScrollContext)

export const ScrollProvider = ({ children }) => {
    const lenisRef = useRef(null)
    const rafRef = useRef(null)
    const [scrollTop, setScrollTop] = useState(0)
    const [scrollState, setScrollState] = useState({ from: 'home', to: 'about', t: 0 })
    const [activeSection, setActiveSection] = useState('home')
    const [experienceIndex, setExperienceIndex] = useState(0)
    
    // Experience pinning state
    const [isExperiencePinned, setIsExperiencePinned] = useState(false)
    const [experienceProgress, setExperienceProgress] = useState(0)
    const experiencePinPointRef = useRef(null) // scroll position where we pinned
    const totalCardsRef = useRef(6) // number of experience cards

    // Handle wheel events when pinned
    useEffect(() => {
        if (!isExperiencePinned) return

        const onWheel = (e) => {
            e.preventDefault()
            e.stopPropagation()
            
            const delta = e.deltaY * 0.002 // sensitivity
            
            setExperienceProgress(prev => {
                const next = prev + delta
                
                // If scrolling down past 1, unpin and continue scrolling
                if (next >= 1) {
                    setIsExperiencePinned(false)
                    // Let Lenis continue from where we pinned
                    if (lenisRef.current && experiencePinPointRef.current !== null) {
                        // Scroll a bit past the experience section
                        const experienceEl = document.getElementById('experience')
                        if (experienceEl) {
                            const targetScroll = experiencePinPointRef.current + experienceEl.offsetHeight
                            lenisRef.current.scrollTo(targetScroll, { immediate: true })
                        }
                    }
                    return 1
                }
                
                // If scrolling up past 0, unpin and go back
                if (next <= 0) {
                    setIsExperiencePinned(false)
                    return 0
                }
                
                return next
            })
        }

        window.addEventListener('wheel', onWheel, { passive: false })
        return () => window.removeEventListener('wheel', onWheel)
    }, [isExperiencePinned])

    // initialize Lenis once
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 2,
            infinite: false,
            wheelMultiplier: 1,
            lerp: 0.1,
            syncTouch: true,
            syncTouchLerp: 0.075
        })

        lenis.on('scroll', ({ scroll }) => {
            // always update scrollTop from Lenis — do NOT stop Lenis entirely
            setScrollTop(scroll)
        })


        const raf = (time) => {
            lenis.raf(time)
            rafRef.current = requestAnimationFrame(raf)
        }

        rafRef.current = requestAnimationFrame(raf)
        lenisRef.current = lenis

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            if (lenisRef.current) lenisRef.current.destroy()
        }
    }, [])

    // compute section/experience tracking centrally
    const computeScrollState = useCallback(() => {
        const sections = ['home', 'about', 'experience', 'project', 'contact']
        const centerY = window.innerHeight / 2
        let closest = 'home'
        let minDist = Infinity
        let closestIndex = 0

        sections.forEach((id, idx) => {
            const el = document.getElementById(id)
            if (!el) return
            const rect = el.getBoundingClientRect()
            const secCenter = rect.top + rect.height / 2
            const dist = Math.abs(secCenter - centerY)
            if (dist < minDist) {
                minDist = dist
                closest = id
                closestIndex = idx
            }
        })

        setActiveSection(closest)

        // Check if entering experience section and should pin
        if (closest === 'experience') {
            const experienceSection = document.getElementById('experience')
            if (experienceSection) {
                const rect = experienceSection.getBoundingClientRect()
                // Pin when experience section top reaches ~20% from top of viewport
                const pinTrigger = window.innerHeight * 0.2
                
                if (!isExperiencePinned && rect.top <= pinTrigger && rect.bottom > window.innerHeight) {
                    // Only pin if we haven't completed the stack yet
                    if (experienceProgress < 1) {
                        setIsExperiencePinned(true)
                        experiencePinPointRef.current = scrollTop
                        // Stop Lenis
                        if (lenisRef.current) {
                            lenisRef.current.stop()
                        }
                    }
                }

                const cards = experienceSection.querySelectorAll('[data-experience-card]')
                totalCardsRef.current = cards.length || 6
                
                let closestCardIndex = 0
                let minCardDist = Infinity

                cards.forEach((card, idx) => {
                    const cardRect = card.getBoundingClientRect()
                    const cardCenter = cardRect.top + cardRect.height / 2
                    const dist = Math.abs(cardCenter - centerY)
                    if (dist < minCardDist) {
                        minCardDist = dist
                        closestCardIndex = idx
                    }
                })

                setExperienceIndex(closestCardIndex)
            }
        } else {
            // Reset when leaving experience
            if (experienceProgress >= 1) {
                // Keep progress at 1 if completed
            } else if (closest !== 'experience') {
                setExperienceProgress(0)
            }
        }

        const currentEl = document.getElementById(sections[closestIndex])
        if (!currentEl) {
            setScrollState({ from: closest, to: closest, t: 0 })
            return
        }

        const rect = currentEl.getBoundingClientRect()
        const secCenter = rect.top + rect.height / 2

        if (secCenter > centerY && closestIndex > 0) {
            const prevSection = sections[closestIndex - 1]
            const prevEl = document.getElementById(prevSection)
            if (prevEl) {
                const prevRect = prevEl.getBoundingClientRect()
                const prevCenter = prevRect.top + prevRect.height / 2
                const totalDist = Math.abs(secCenter - prevCenter)
                const currentDist = centerY - prevCenter
                const t = Math.max(0, Math.min(1, currentDist / totalDist))
                setScrollState({ from: prevSection, to: closest, t })
                return
            }
        }

        if (secCenter < centerY && closestIndex < sections.length - 1) {
            const nextSection = sections[closestIndex + 1]
            const nextEl = document.getElementById(nextSection)
            if (nextEl) {
                const nextRect = nextEl.getBoundingClientRect()
                const nextCenter = nextRect.top + nextRect.height / 2
                const totalDist = Math.abs(nextCenter - secCenter)
                const currentDist = centerY - secCenter
                const t = Math.max(0, Math.min(1, currentDist / totalDist))
                setScrollState({ from: closest, to: nextSection, t })
                return
            }
        }

        setScrollState({ from: closest, to: closest, t: 0 })
    }, [isExperiencePinned, experienceProgress, scrollTop])

    // compute scroll state whenever Lenis updates `scrollTop`.
    useEffect(() => {
        computeScrollState()
    }, [scrollTop, computeScrollState])

    // Restart Lenis when unpinned
    useEffect(() => {
        if (!isExperiencePinned && lenisRef.current) {
            lenisRef.current.start()
        }
    }, [isExperiencePinned])

    const value = {
        lenis: lenisRef,
        scrollTop,
        scrollState,
        activeSection,
        experienceIndex,
        experienceProgress,
        isExperiencePinned,
        totalCards: totalCardsRef.current
    }

    return (
        <ScrollContext.Provider value={value}>
            {children}
        </ScrollContext.Provider>
    )
}

export default ScrollProvider
