

const TechRow = ({ direction = 'left', items }) => {
    return (
        <div className="overflow-hidden w-full">
            <div
                className={`
          flex w-max gap-10
          ${direction === 'left'
                        ? 'animate-marquee-left'
                        : 'animate-marquee-right'}
        `}
            >
                {[...items, ...items].map((tech, i) => (
                    <div
                        key={i}
                        className="flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition"
                    >
                        <img
                            src={tech.icon}
                            alt={tech.name}
                            className="w-12 h-12 object-contain mix-blend-color"
                        />
                        <span className="text-xs text-slate-300">{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}


const Techstack = () => {

    const techStackRow1 = [
        { name: 'JavaScript', icon: '/techstack/js_logo.png' },
        { name: 'TypeScript', icon: '/techstack/typescript_logo.png' },
        { name: 'Python', icon: '/techstack/python_logo.png' },
        { name: 'Java', icon: '/techstack/java_logo.png' },
        { name: 'Kotlin', icon: '/techstack/kotlin_logo.png' },
        { name: 'Claude AI', icon: '/techstack/claude_logo.png' },
        { name: 'ChatGPT', icon: '/techstack/chatgpt_logo.png' },
    ]


    const techStackRow2 = [
        { name: 'React', icon: '/techstack/react_logo.png' },
        { name: 'Next.js', icon: '/techstack/nextjs.png' },
        { name: 'Tailwind CSS', icon: '/techstack/tailwind_logo.png' },
        { name: 'CSS', icon: '/techstack/css_logo.png' },
        { name: 'HTML', icon: '/techstack/html_logo.png' },
        { name: 'Chakra UI', icon: '/techstack/chakra_logo.png' },
        { name: 'Jetpack Compose', icon: '/techstack/jetpack_logo.jpg' },
        { name: 'Three.js', icon: '/techstack/threejs_logo.png' },
    ]

    const techStackRow3 = [
        { name: 'Node.js', icon: '/techstack/js_logo.png' },
        { name: 'Express.js', icon: '/techstack/express_logo.png' },
        { name: 'FastAPI', icon: '/techstack/fastapi_logo.png' },
        { name: 'Laravel', icon: '/techstack/laravel_logo.png' },
        { name: 'Supabase', icon: '/techstack/supabase_logo.png' },
        { name: 'Firebase', icon: '/techstack/firebase_logo.png' },
    ]

    const techStackRow4 = [
        { name: 'MySQL', icon: '/techstack/mysql_logo.png' },
        { name: 'Postman', icon: '/techstack/postman_logo.png' },
        { name: 'Git', icon: '/techstack/git_logo.png' },
        { name: 'Bruno', icon: '/techstack/bruno_logo.png' },
        { name: 'Prisma', icon: '/techstack/prisma_logo.svg' },
        { name: 'Hugging Face', icon: '/techstack/huggingface_logo.png' },
        { name: 'Zammad', icon: '/techstack/zammad_logo.png' },
    ]



    return (
        <div id="techstack" className="relative z-2 flex flex-col justify-center items-center min-h-screen min-w-screen gap-12">
            <h1 className="text-6xl font-bold text-white" style={{
                textShadow: '0 4px 16px rgba(0,0,0,0.6)',
            }}>Tools and Tech Stacks that I used</h1>
            <div className="flex flex-col max-w-4xl gap-12 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                <TechRow items={techStackRow1} direction="right" />
                <TechRow items={techStackRow2} direction="left" />
                <TechRow items={techStackRow3} direction="right" />
                <TechRow items={techStackRow4} direction="left" />
            </div>
        </div>
    )
}

export default Techstack