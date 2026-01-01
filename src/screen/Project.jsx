import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ProjectCard } from "../component/Card/ProjectCard";

export default function Project() {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Durasi animasi dalam milidetik
            once: true, // Animasi hanya dijalankan sekali
        });
    }, [])

    const projects = [
        {
            title: "Magna Partners V2",
            description:
                "Full-stack web system with dashboards, authentication, and modular backend — deployed for real organizational use.",
            githubLink: "https://magnapartners.org/",
            image: "/project/magnav2.png",
            techStack: [
                {
                    name: "Next.js",
                    logo: "/techstack/nextjs.png",
                },
                {
                    name: "Tailwind CSS",
                    logo: "/techstack/tailwind_logo.png",
                },
                {
                    name: "Supabase",
                    logo: "/techstack/supabase_logo.png",
                },
                {
                    name: "TypeScript",
                    logo: "/techstack/typescript_logo.png",
                },
                {
                    name: "Bruno",
                    logo: "/techstack/bruno_logo.png",
                }
            ],
            type: "website"
        },
        {
            title: "Portfolio Website",
            description: "Full-stack web system with dashboards, authentication, and modular backend — deployed for real organizational use.",
            githubLink: "https://aufarzhfr.vercel.app/",
            image: "/project/portofolio.png",
            techStack: [
                {
                    name: "React.js",
                    logo: "/techstack/react_logo.png",
                },
                {
                    name: "Tailwind CSS",
                    logo: "/techstack/tailwind_logo.png",
                },
                {
                    name: "TypeScript",
                    logo: "/techstack/typescript_logo.png",
                },
                {
                    name: "Three Js",
                    logo: "/techstack/threejs_logo.png",
                }
            ],
            type: "website"
        },
        {
            title: "Raion Community Website",
            description:
                "Full-stack web system with dashboards, authentication, and modular backend — deployed for real organizational use.",
            githubLink: "https://raion.ub.ac.id",
            image: "/project/raion.png",
            techStack: [
                {
                    name: "Next.js",
                    logo: "/techstack/nextjs.png",
                },
                {
                    name: "Tailwind CSS",
                    logo: "/techstack/tailwind_logo.png",
                },
                {
                    name: "TypeScript",
                    logo: "/techstack/typescript_logo.png",
                }
            ],
            type: "website"
        },
        {
            title: "Pemdesa Wringinanom Website",
            description:
                "Full-stack web system with dashboards, authentication, and modular backend — deployed for real organizational use.",
            githubLink: "https://www.pemdeswringinanom.web.id/",
            image: "/project/wringinanom.png",
            techStack: [
                {
                    name: "Next.js",
                    logo: "/techstack/nextjs.png",
                },
                {
                    name: "Tailwind CSS",
                    logo: "/techstack/tailwind_logo.png",
                },
                {
                    name: "Supabase",
                    logo: "/techstack/supabase_logo.png",
                },
                {
                    name: "TypeScript",
                    logo: "/techstack/typescript_logo.png",
                },
            ],
            type: "website"
        },
        {
            title: "Optimind",
            description:
                "Full-stack web system with dashboards, authentication, and modular backend — deployed for real organizational use.",
            githubLink: "https://technoday.vercel.app/",
            image: "/project/optimind.png",
            techStack: [
                {
                    name: "Next.js",
                    logo: "/techstack/nextjs.png",
                },
                {
                    name: "Tailwind CSS",
                    logo: "/techstack/tailwind_logo.png",
                },
                {
                    name: "Supabase",
                    logo: "/techstack/supabase_logo.png",
                },
                {
                    name: "TypeScript",
                    logo: "/techstack/typescript_logo.png",
                },
                {
                    name: "Fast API",
                    logo: "/techstack/fastapi_logo.png",
                },
                {
                    name: "Hugging Face",
                    logo: "/techstack/huggingface_logo.png",
                }
            ],
            type: "website"
        },
    ];
    return (
        <div className="min-h-screen" id="project">
            <div className="absolute top-20 left-0 right-0 z-10 text-center">
                <h1 className="text-white text-4xl md:text-5xl font-bold mb-2">
                    Top Project
                </h1>
                <div className="w-24 h-1 bg-white mx-auto mt-4"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
                <ul className="w-full">
                    <div className="pt-24 px-6 md:px-20 flex flex-col items-start gap-12 md:gap-16">
                        {projects.map((project, index) => (
                            <li key={index} data-aos="fade-right">
                                <ProjectCard project={project} />
                            </li>
                        ))}
                    </div>
                </ul>
            </div>
        </div>
    )
}