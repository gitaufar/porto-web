import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function ScrollToHash() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return

    const id = hash.replace("#", "")
    const el = document.getElementById(id)

    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }, [hash])

  return null
}
export default ScrollToHash