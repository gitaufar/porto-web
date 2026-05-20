import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useScroll } from "./ScrollProvider"

function ScrollToHash() {
  const { hash, pathname } = useLocation()
  const { lenis } = useScroll() || {}

  useEffect(() => {
    window.history.scrollRestoration = "manual"

    if (!hash) {
      if (lenis?.current) {
        lenis.current.scrollTo(0, { immediate: true })
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      }
      return
    }

    const id = hash.replace("#", "")
    const scrollToTarget = () => {
      const el = document.getElementById(id)
      if (!el) return

      ScrollTrigger.refresh()

      if (lenis?.current) {
        lenis.current.scrollTo(el, { immediate: true })
      } else {
        el.scrollIntoView({ behavior: "instant" })
      }
    }

    const frame = requestAnimationFrame(scrollToTarget)
    const timeouts = [80, 240, 600].map((delay) => setTimeout(scrollToTarget, delay))

    return () => {
      cancelAnimationFrame(frame)
      timeouts.forEach(clearTimeout)
    }
  }, [hash, pathname, lenis])

  return null
}
export default ScrollToHash
