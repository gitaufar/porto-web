import { useState, useRef } from 'react';

export const ProjectCard = ({ project }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div className="w-full max-w-xl">
      <div className="py-4" style={{ perspective: '1000px' }}>
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative transition-all duration-200 ease-linear mx-auto"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`
          }}
        >
          <div className="transform-3d *:transform-3d relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/10 dark:border-white/20 border-black/20 shadow-lg w-full flex flex-col justify-between rounded-xl p-5 border bg-slate-900/80 backdrop-blur-sm">
            
            {/* Image Section */}
            <div
              className="transition duration-200 ease-linear w-full cursor-crosshair"
              style={{
                transform: `translateZ(40px)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <img
                src={project.image}
                height="1000"
                width="1000"
                className="h-40 md:h-56 lg:h-64 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt={`${project.title} thumbnail`}
              />
            </div>

            {/* Title Section */}
            <div className="flex justify-between items-center mt-6">
              <div
                className="w-fit transition duration-200 ease-linear text-xl md:text-2xl font-bold text-neutral-600 dark:text-white hover:underline"
                style={{
                  transform: `translateZ(30px)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={project.githubLink}
                >
                  {project.title}
                </a>
              </div>
            </div>

            {/* Description */}
            <p
              className="w-fit transition duration-200 ease-linear text-neutral-400 text-sm md:text-base max-w-full pr-2 text-justify mt-2 dark:text-neutral-300 line-clamp-4"
              style={{
                transform: `translateZ(25px)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {project.description}
            </p>

            {/* Tech Stack and GitHub Button */}
            <div className="flex justify-between items-center mt-8">
              {/* Tech Stack Icons */}
              <div
                className="w-fit transition duration-200 ease-linear"
                style={{
                  transform: `translateZ(35px)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="flex flex-row items-center justify-center gap-2">
                  {project.techStack.map((tech, index) => (
                    <div key={index} className="group relative -mr-4 z-1000">
                      <img
                        height="40"
                        width="40"
                        src={tech.logo}
                        alt={tech.name}
                        className="relative m-0! h-8 w-8 md:h-10 md:w-10 rounded-full border-2 border-white/10 bg-white object-cover object-center p-0! transition duration-500 group-hover:z-30 group-hover:scale-110 shadow-md shadow-black/20"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* GitHub Button */}
              <a
                className="w-fit transition duration-200 ease-linear flex items-center pl-3 pr-2 py-[0.4rem] rounded-full bg-linear-to-r from-gray-900 to-black text-white text-xs font-semibold hover:from-black hover:to-gray-800 hover:scale-105 hover:shadow-xl hover:shadow-black/50 border border-gray-700"
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  transform: `translateZ(35px)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                View on GitHub
                <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};