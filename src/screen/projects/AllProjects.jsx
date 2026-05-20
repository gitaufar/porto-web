import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Scene from '../../component/Three/Scene'
import { projects } from '../../core/projects'

const AllProjects = () => {
  const [showShootingStar, setShowShootingStar] = useState(false)

  useEffect(() => {
    let timeoutId

    const spawnStar = () => {
      setShowShootingStar(true)
      timeoutId = setTimeout(spawnStar, Math.random() * 4000 + 1000)
    }

    spawnStar()

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent px-6 pb-16 pt-32 text-white md:px-10 lg:px-16">
      <Scene
        showShootingStar={showShootingStar}
        onStarFinished={() => setShowShootingStar(false)}
        activeSection="project"
        scrollState={{ from: 'project', to: 'project', t: 0 }}
      />
      <div className="pointer-events-none fixed inset-0 z-1 bg-linear-to-b from-black/70 via-black/20 to-black/90" />
      <div className="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.08),transparent_24%)]" />

      <section className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-200/80">
              Selected Work
            </p>
            <h1 className="text-4xl font-bold md:text-6xl">All Projects</h1>
          </div>

          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
          >
            Back to Home
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-lg border border-white/10 bg-slate-950/85 shadow-xl shadow-black/30 backdrop-blur-md transition hover:-translate-y-1 hover:border-white/25"
            >
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                <img
                  src={project.image}
                  alt={`${project.title} thumbnail`}
                  className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </a>

              <div className="p-5">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-bold text-white transition hover:text-blue-200"
                  >
                    {project.title}
                  </a>
                  <span className="rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1 text-xs font-semibold capitalize text-blue-100">
                    {project.type}
                  </span>
                </div>

                <p className="min-h-16 text-sm leading-6 text-slate-300">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={`${project.title}-${tech.name}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200"
                    >
                      <img src={tech.logo} alt="" className="h-4 w-4 rounded-full bg-white object-cover" />
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default AllProjects
