import CircularGallery from "./blocks/Components/CircularGallery/CircularGallery"
import RollingGallery from "./blocks/Components/RollingGallery/RollingGallery"
import "./TechStack.css"


export default function TechStack() {
    return (
        <div className="tech-stack-section" id="tech-stack">
            <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
            <RollingGallery />
        </div>
    )
}