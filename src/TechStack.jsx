import CircularGallery from "./blocks/Components/CircularGallery/CircularGallery"
import BlurText from "./blocks/Components/BlurText"
import "./TechStack.css"

export default function TechStack() {
    return (
        <div className="tech-stack-section" id="tech-stack">
            <BlurText 
            delay={0.2}
            animateBy="words"
            direction="top"
            className="tech-text"
            text="Tech Stack"
            />
            <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
        </div>
    )
}