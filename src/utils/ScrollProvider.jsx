import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ScrollContext = createContext(null)

export const useScroll = () => useContext(ScrollContext)

export const ScrollProvider = ({ children }) => {
    const lenisRef = useRef(null)
    const [scrollTop, setScrollTop] = useState(0)
    const [scrollState, setScrollState] = useState({ from: 'home', to: 'about', t: 0 })
    const [activeSection, setActiveSection] = useState('home')
    const [experienceIndex, setExperienceIndex] = useState(0)

    // initialize Lenis once and sync with GSAP
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
            syncTouchLerp: 0.075,
            autoRaf: false
        })

        lenis.on('scroll', ({ scroll }) => {
            setScrollTop(scroll)
            ScrollTrigger.update()
        })

        // Use GSAP ticker for Lenis
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)

        lenisRef.current = lenis

        return () => {
            if (lenisRef.current) lenisRef.current.destroy()
        }
    }, [])

    // compute section tracking
    const computeScrollState = useCallback(() => {
        const sections = ['home', 'about', 'experience', 'project', 'techstack', 'contact']
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

        // Track experience card index for 3D scene
        if (closest === 'experience') {
            const experienceSection = document.getElementById('experience')
            if (experienceSection) {
                const cards = experienceSection.querySelectorAll('.experience-card')
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
    }, [scrollTop])

    useEffect(() => {
        computeScrollState()
    }, [scrollTop, computeScrollState])

    const value = {
        lenis: lenisRef,
        scrollTop,
        scrollState,
        activeSection,
        experienceIndex
    }

    return (
        <ScrollContext.Provider value={value}>
            {children}
        </ScrollContext.Provider>
    )
}

export default ScrollProvider
