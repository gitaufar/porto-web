import { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ProjectCard } from "../../component/Card/ProjectCard";
import { projects } from "../../core/projects";

gsap.registerPlugin(ScrollTrigger)

export default function Project() {
    const sectionRef = useRef(null)
    const cardsContainerRef = useRef(null)
    // Scroll storytelling animation
    useLayoutEffect(() => {
        const mm = gsap.matchMedia()

        // Tablet (centered cards)
        mm.add("(min-width: 640px) and (max-width: 1023px)", () => {
            const section = sectionRef.current
            const cardsContainer = cardsContainerRef.current
            if (!section || !cardsContainer) return

            const cards = gsap.utils.toArray(cardsContainer.querySelectorAll('.project-card'))
            if (!cards.length) return

            const numCards = cards.length
            const scrollPerCard = window.innerHeight * 0.7
            const totalScroll = scrollPerCard * numCards

            // Tablet: cards centered
            cards.forEach((card, index) => {
                gsap.set(card, {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    xPercent: -50,
                    yPercent: -50,
                    x: index === 0 ? 0 : -window.innerWidth,
                    zIndex: numCards - index,
                    opacity: index === 0 ? 1 : 0,
                    scale: 1,
                    transformOrigin: 'center center',
                })
            })

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: `+=${totalScroll}`,
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.5,
                    id: 'project-pin-tablet',
                }
            })

            cards.forEach((card, index) => {
                if (index === 0) return
                const cardDuration = 1 / (numCards - 1)
                const startTime = (index - 1) * cardDuration

                tl.set(card, { zIndex: numCards + index }, startTime)
                tl.to(cards[index - 1], {
                    x: 50,
                    opacity: 0.2,
                    scale: 0.85,
                    filter: 'blur(4px)',
                    duration: cardDuration,
                    ease: 'power1.inOut',
                }, startTime)
                tl.fromTo(card,
                    { x: -window.innerWidth, opacity: 0, scale: 0.9 },
                    { x: 0, opacity: 1, scale: 1, duration: cardDuration, ease: 'power1.inOut' },
                    startTime
                )
            })

            return () => {
                ScrollTrigger.getAll().forEach(t => {
                    if (t.vars.id?.startsWith('project-')) t.kill()
                })
            }
        })

        // Desktop small (cards slightly to the left)
        mm.add("(min-width: 1024px) and (max-width: 1439px)", () => {
            const section = sectionRef.current
            const cardsContainer = cardsContainerRef.current
            if (!section || !cardsContainer) return

            const cards = gsap.utils.toArray(cardsContainer.querySelectorAll('.project-card'))
            if (!cards.length) return

            const numCards = cards.length
            const scrollPerCard = window.innerHeight * 0.8
            const totalScroll = scrollPerCard * numCards

            const isLaptopHeight = window.innerHeight <= 900

            // Small desktop: cards positioned slightly to the left
            cards.forEach((card, index) => {
                gsap.set(card, {
                    position: 'absolute',
                    top: '50%',
                    left: isLaptopHeight ? '43%' : '40%',
                    xPercent: isLaptopHeight ? -58 : -70,
                    yPercent: -50,
                    x: index === 0 ? 0 : -window.innerWidth,
                    zIndex: numCards - index,
                    opacity: index === 0 ? 1 : 0,
                    scale: 1,
                    transformOrigin: 'center center',
                })
            })

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: `+=${totalScroll}`,
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.5,
                    id: 'project-pin-desktop-sm',
                }
            })

            cards.forEach((card, index) => {
                if (index === 0) return
                const cardDuration = 1 / (numCards - 1)
                const startTime = (index - 1) * cardDuration

                tl.set(card, { zIndex: numCards + index }, startTime)
                tl.to(cards[index - 1], {
                    x: 10,
                    opacity: 0.2,
                    scale: 0.85,
                    filter: 'blur(4px)',
                    duration: cardDuration,
                    ease: 'power1.inOut',
                }, startTime)
                tl.fromTo(card,
                    { x: -window.innerWidth, opacity: 0, scale: 0.9 },
                    { x: 0, opacity: 1, scale: 1, duration: cardDuration, ease: 'power1.inOut' },
                    startTime
                )
            })

            return () => {
                ScrollTrigger.getAll().forEach(t => {
                    if (t.vars.id?.startsWith('project-')) t.kill()
                })
            }
        })

        // Desktop large (cards more to the left)
        mm.add("(min-width: 1440px)", () => {
            const section = sectionRef.current
            const cardsContainer = cardsContainerRef.current
            if (!section || !cardsContainer) return

            const cards = gsap.utils.toArray(cardsContainer.querySelectorAll('.project-card'))
            if (!cards.length) return

            const numCards = cards.length
            const scrollPerCard = window.innerHeight * 0.8
            const totalScroll = scrollPerCard * numCards

            const isLaptopHeight = window.innerHeight <= 900

            // Large desktop: cards positioned to the left
            cards.forEach((card, index) => {
                gsap.set(card, {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    xPercent: isLaptopHeight ? -90 : -120,
                    yPercent: -50,
                    x: index === 0 ? 0 : -window.innerWidth,
                    zIndex: numCards - index,
                    opacity: index === 0 ? 1 : 0,
                    scale: 1,
                    transformOrigin: 'center center',
                })
            })

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: `+=${totalScroll}`,
                    pin: true,
                    pinSpacing: true,
                    scrub: 0.5,
                    id: 'project-pin-desktop-lg',
                }
            })

            // Animate each card sliding in from right
            cards.forEach((card, index) => {
                if (index === 0) return

                const cardDuration = 1 / (numCards - 1)
                const startTime = (index - 1) * cardDuration

                // Bring new card to front
                tl.set(card, { zIndex: numCards + index }, startTime)

                // Previous card moves left and fades
                tl.to(cards[index - 1], {
                    x: -10,
                    opacity: 0.2,
                    scale: 0.85,
                    filter: 'blur(4px)',
                    duration: cardDuration,
                    ease: 'power1.inOut',
                }, startTime)

                // New card slides in from right
                tl.fromTo(card,
                    {
                        x: -window.innerWidth,
                        opacity: 0,
                        scale: 0.9,
                    },
                    {
                        x: 0,
                        opacity: 1,
                        scale: 1,
                        duration: cardDuration,
                        ease: 'power1.inOut',
                    },
                    startTime
                )
            })

            return () => {
                ScrollTrigger.getAll().forEach(t => {
                    if (t.vars.id?.startsWith('project-')) {
                        t.kill()
                    }
                })
            }
        })

        return () => mm.revert()
    }, [])

    return (
        <div className="min-h-screen relative mt-20 md:mt-0" id="project" ref={sectionRef}>
            {/* Title - responsive positioning */}
            <div className="md:absolute md:top-30 lg:top-20 2xl:top-30 z-10 text-center md:left-0 md:right-0 2xl:text-center lg:right-16 2xl:left-0 2xl:right-0">
                <h1 className="text-white text-4xl 2xl:text-5xl font-bold mb-2">
                    Top Project
                </h1>
                <div className="w-24 h-1 bg-white mx-auto lg:ml-auto lg:mr-0 2xl:mx-auto mt-4"></div>
                <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 mt-5 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 laptop-project-view-all-cta"
                >
                    View All
                    <span aria-hidden="true">→</span>
                </Link>
            </div>

            {/* Mobile simplified list */}
            <div className="sm:hidden pt-24 px-6 flex flex-col gap-6">
                {projects.map((project, index) => (
                    <div key={index} className="project-card-mobile">
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>

            {/* Tablet/Desktop scroll storytelling cards */}
            <div
                ref={cardsContainerRef}
                className="hidden sm:block relative w-full h-screen"
                style={{ perspective: '1000px' }}
            >
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="project-card w-full max-w-2xl"
                    >
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>
        </div>
    )
}

