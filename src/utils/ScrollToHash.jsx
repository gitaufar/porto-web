import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useScroll } from "./ScrollProvider"

function ScrollToHash() {
  const { hash, pathname } = useLocation()
  const { lenis } = useScroll() || {}
  const hasHandledInitialLocation = useRef(false)

  useEffect(() => {
    window.history.scrollRestoration = "manual"
    const isInitialLocation = !hasHandledInitialLocation.current
    hasHandledInitialLocation.current = true

    const scrollToTop = () => {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      lenis?.current?.scrollTo(0, { immediate: true })
    }

    if (!hash) {
      scrollToTop()
      return
    }

    if (isInitialLocation && pathname === "/") {
      window.history.replaceState(null, "", pathname)
      scrollToTop()

      const timeouts = [0, 80, 180, 420, 900, 1600, 2600, 3600].map((delay) =>
        setTimeout(scrollToTop, delay)
      )

      return () => timeouts.forEach(clearTimeout)
    }

    const id = hash.replace("#", "")
    const shouldSmooth = pathname === "/"
    const scrollToTarget = () => {
      const el = document.getElementById(id)
      if (!el) return

      ScrollTrigger.refresh()
      const targetY = Math.max(0, window.scrollY + el.getBoundingClientRect().top)

      if (lenis?.current) {
        lenis.current.scrollTo(targetY, { immediate: !shouldSmooth })
      } else {
        window.scrollTo({
          top: targetY,
          left: 0,
          behavior: shouldSmooth ? "smooth" : "instant",
        })
      }
    }

    const frame = requestAnimationFrame(scrollToTarget)

    return () => cancelAnimationFrame(frame)
  }, [hash, pathname, lenis])

  return null
}

export default ScrollToHash
