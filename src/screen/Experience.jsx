import React, { useRef, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ExperienceCard from '../component/Card/ExperienceCard'

gsap.registerPlugin(ScrollTrigger)

const Experience = () => {
  const sectionRef = useRef(null)
  const cardsContainerRef = useRef(null)

  const experiences = [
    {
      title: "Web Developer",
      period: "Nov 2025 - Present",
      company: "Studyoio",
      place: "London (Remote)",
      description: [
        "Developed the internal Admin Panel for Studyo’s education platform (1M+ users), including tutor onboarding, KPI dashboard, payment history, and customer support integration using Zammad.",
        "Designed and implemented scalable Firestore database structures, ensuring efficient data flow for multi-role users (Student, Tutor, Parent).",
        "Converted Figma designs into responsive, production-ready interfaces and integrated them with backend services.",
        "Collaborated with the product team to refine feature requirements and deliver maintainable, high-quality frontend architecture."
      ],
      summary: "Building and maintaining the Admin Panel for a large-scale education platform, focusing on responsive design, database structuring, and user role management."
    },
    {
      title: "Core Team Android Development",
      period: "Okt 2025 - Present",
      company: "GDGoC Brawijaya University",
      place: "Malang, Indonesia (Hybrid)",
      description: [
        "Developed and maintained the Android learning path curriculum (Flutter-based) for 223 learners within a 960+ member community.",
        "Delivered Study Jam sessions, teaching Flutter fundamentals, UI building, state management, API integration, and best development practices.",
        "Mentored community members through discussions, code reviews, and guided learning to support their progress in mobile development."
      ],
      summary: "Leading Android development curriculum and mentoring in a large developer community, focusing on Flutter and mobile app best practices."
    },
    {
      title: "Laboratory Assistant of Algorithm and Data Structure",
      period: "Aug 2025 – Nov 2025",
      company: "Faculty of Computer Science (FILKOM) Universitas Brawijaya",
      place: "Malang, Indonesia (Onsite)",
      description: [
        "Instructed and mentored 32 third-semester students in algorithm design, data structures, and problem-solving techniques.",
        "Designed and developed coding exercises and problem sets to enhance students’ understanding and prepare them for Love Coding assessments.",
        "Assisted in evaluating and providing feedback on student submissions to improve code efficiency and algorithmic thinking.",
        "Collaborated with fellow assistants to ensure consistent delivery of course materials and grading standards."
      ],
      summary: "Assisted in teaching algorithms and data structures to university students, focusing on practical coding skills and problem-solving techniques."
    },
    {
      title: "Mobile Developer & Staff of Innovation and Technology",
      period: "March 2024 – Nov 2025",
      company: "Raion Community",
      place: "Malang, Indonesia (Onsite)",
      description: [
        "Delivered a workshop session on integrating Android applications with RESTful APIs using Retrofit, enhancing members’ backend connectivity skills.",
        "Collaborated with UI/UX designers and product managers to build and refine the Raion Community website, ensuring alignment between functionality and user experience."
      ],
      summary: "Developed website and conducted workshops on Android API integration for raion community."
    },
    {
      title: "Software Engineer Associate",
      period: "Jun 2025 – Okt 2025",
      company: "Magna Partners",
      place: "Remote",
      description: [
        "Participated in daily Scrum meetings during two-week sprints to coordinate development tasks and ensure timely delivery.",
        "Implemented responsive and pixel-perfect frontend from Figma mockups using Next.js.",
        "Developed and integrated RESTful APIs with Supabase for data management and authentication.",
        "Built and integrated an admin dashboard to connect frontend components with backend services for efficient data handling."
      ],
      summary: "Worked as a Software Engineer Associate at Magna Partners, contributing to frontend development and backend integration using Next.js and Supabase.",
    },
    {
      title: "Laboratory Assistant of Java Advanced Programming",
      period: "Feb 2025 – Jun 2025",
      company: "Faculty of Computer Science (FILKOM) Universitas Brawijaya",
      place: "Malang, Indonesia (Onsite)",
      description: [
        "Guided 41 first-year students in advanced Java programming concepts, emphasizing object-oriented principles, library usage, and best coding practices.",
        "Facilitated weekly lab sessions to strengthen students’ coding, debugging, and problem-solving skills through practical exercises.",
        "Assisted in grading and providing feedback on programming assignments to help students improve code structure and maintainability."
      ],
      summary: "Assisted in teaching advanced Java programming to first-year university students, focusing on practical coding skills and object-oriented principles."
    }
  ];

  // Desktop scroll storytelling animation
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    
    mm.add("(min-width: 768px)", () => {
      const section = sectionRef.current
      const cardsContainer = cardsContainerRef.current
      if (!section || !cardsContainer) return

      const cards = gsap.utils.toArray(cardsContainer.querySelectorAll('.experience-card'))
      if (!cards.length) return

      const numCards = cards.length
      const scrollPerCard = window.innerHeight * 0.8
      const totalScroll = scrollPerCard * numCards

      // Set initial state - all cards start off-screen to the right
      cards.forEach((card, index) => {
        gsap.set(card, {
          position: 'absolute',
          top: '50%',
          left: '50%',
          xPercent: 30,
          yPercent: -50,
          x: index === 0 ? 0 : window.innerWidth,
          zIndex: numCards - index, // First card highest z-index initially
          opacity: index === 0 ? 1 : 0,
          scale: 1,
          transformOrigin: 'center center',
        })
      })

      // Create a timeline for the card animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${totalScroll}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          id: 'experience-pin',
        }
      })

      // Animate each card sliding in from right
      cards.forEach((card, index) => {
        if (index === 0) return // First card already visible

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
            x: window.innerWidth,
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
          if (t.vars.id?.startsWith('experience-')) {
            t.kill()
          }
        })
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <div id="experience" ref={sectionRef} className='min-h-screen'>
      {/* Title - fixed at top during scroll */}
      <div className="absolute top-20 left-0 right-0 z-10 text-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-2">
          Work Experience
        </h1>
        <div className="w-24 h-1 bg-white mx-auto mt-4"></div>
      </div>

      {/* Mobile simplified list */}
      <div className="md:hidden pt-24 px-6 flex flex-col gap-4">
        {experiences.map((exp, idx) => (
          <div key={idx} data-aos="fade-up" className="p-4 bg-slate-900/90 border border-white/10 rounded-lg">
            <div className="flex flex-col items-start">
              <h3 className="text-lg font-semibold text-white">{exp.company}</h3>
              <span className="text-xs text-white/70 font-mono">{exp.period}</span>
              <p className="text-sm text-white/90 mt-1">{exp.title}</p>
            </div>
            <p className="text-slate-300 text-sm mt-3">{exp.summary}</p>
          </div>
        ))}
      </div>

      {/* Desktop scroll storytelling cards */}
      <div 
        ref={cardsContainerRef}
        className="hidden md:block relative w-full h-screen"
        style={{ perspective: '1000px' }}
      >
        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className="experience-card w-full max-w-2xl"
          >
            <ExperienceCard experience={exp} index={index} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Experience