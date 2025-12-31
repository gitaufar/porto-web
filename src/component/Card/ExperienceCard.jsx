import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ExperienceCard({ experience, index }) {
  const isEven = index % 2 === 0;
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -8;
    const rotateYValue = ((x - centerX) / centerX) * 8;
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div 
      className={`flex ${isEven ? 'lg:justify-end justify-center' : 'lg:justify-start justify-center'}`}
      data-aos="fade-left"
      data-experience-card
    >
      <div className="max-w-xl w-full">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${isHovered ? 'scale(1.02)' : 'scale(1)'}`,
            transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.5s ease-out',
          }}
          className="relative p-8 rounded-lg border border-white/10 bg-slate-900/90 backdrop-blur-md shadow-lg transition-colors duration-200"
        >
          {/* simple dark background + stronger backdrop blur for readability */}          
          
          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {experience.title}
                </h3>
                <p className="text-white font-semibold text-sm">
                  {experience.company}
                </p>
              </div>
              <span className="text-blue-200 text-xs font-mono px-3 py-1 bg-blue-900/20 rounded-full border border-blue-800/40">
                {experience.period}
              </span>
            </div>

            {/* Location */}
            <p className="text-slate-300 text-sm mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {experience.place}
            </p>

            {/* Description */}
            <ul className="space-y-2">
              {experience.description.map((desc, idx) => (
                <li key={idx} className="text-slate-300 text-base flex items-start gap-3">
                  <span className="text-blue-400 mt-1.5 text-sm">◆</span>
                  <span className="flex-1">{desc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/20 rounded-tl-lg"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/10 rounded-br-lg"></div>

          {/* Shine overlay */}
          {isHovered && (
            <div
              className="absolute inset-0 pointer-events-none rounded-lg"
              style={{
                background: `radial-gradient(circle at ${((rotateY / 8) + 1) * 50}% ${((rotateX / -8) + 1) * 50}%, rgba(255,255,255,0.06) 0%, transparent 40%)`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
