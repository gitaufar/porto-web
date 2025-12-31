import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {ProjectCard} from "../component/Card/ProjectCard";

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
            image:"/project/magnav2.png",
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
            image:"/project/portofolio.png",
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
            image:"/project/raion.png",
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
            image:"/project/wringinanom.png",
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
            image:"/project/optimind.png",
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
        <div className="min-h-screen min-w-screen grid grid-cols-2 items-center" id="project">
            <ul className="w-full">
                <div className="pt-40 px-20 flex flex-col items-center gap-16">
                    {projects.map((project, index) => (
                        <li key={index} data-aos="fade-right">
                            <ProjectCard project={project} />
                        </li>
                    ))}
                </div>
            </ul>
        </div>
    )
}