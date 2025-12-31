import React from 'react'
import ExperienceCard from '../component/Card/ExperienceCard'
import ScrollStack, { ScrollStackItem } from '../component/Scroll/ScrollStack'

const Experience = () => {

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

  return (
    <div id="experience" className='py-20 px-8'>
      {/* Title */}
      <div className="text-center">
        <h1 className="text-white text-5xl font-bold mb-2" data-aos="fade-up">
          Work Experience
        </h1>
        <div className="w-24 h-1 bg-white mx-auto mt-4" data-aos="fade-up"></div>
      </div>

      {/* Mobile simplified list (single concise point per item) */}
      <div className="md:hidden pt-12 px-6 flex flex-col gap-4">
        {experiences.map((exp, idx) => (
          <div key={idx} data-aos="fade-up" className="p-4 bg-slate-900/90 border border-white/6 rounded-lg">
            <div className="flex flex-col items-start">
              <h3 className="text-lg font-semibold text-white">{exp.company}</h3>
              <span className="text-xs text-white font-mono">{exp.period}</span>
              <p className="text-sm text-white mt-1">{exp.title}</p>
            </div>
            <p className="text-slate-300 text-sm mt-3">{exp.summary}</p>
          </div>
        ))}
      </div>

      {/* Desktop / Tablet experience cards (kept existing detailed layout) */}
      <div className="hidden md:flex pt-40 px-20 md:flex-col items-center lg:items-end gap-16">
        {experiences.map((exp, index) => (
          <ExperienceCard experience={exp} index={index} />
        ))}
      </div>

      <h2 className="mt-40 mb-2 text-white text-5xl font-bold text-center">Top Project</h2>
      <div className="w-24 h-1 bg-white mx-auto mt-4" data-aos="fade-up"></div>
    </div>
  )
}

export default Experience