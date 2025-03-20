import "./Project.css"
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export const ProjectContainer = ({ title, description, githubLink }) => {
    return (
        <div className="project-container">
            <h3>{title}</h3>
            <p>{description}</p>
            {githubLink && (
                <a className="git-link" href={githubLink}>
                    Github
                </a>
            )}
        </div>
    );
};

export default function Project() {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Durasi animasi dalam milidetik
            once: true, // Animasi hanya dijalankan sekali
        });
    }, [])

    const projects = [
        {
            title: "FoundIT (College Project)",
            description:
                "FoundIT is an application designed to centralize information on lost and found items, helping users report and search for missing belongings. The application is developed using Kotlin with the Jetpack Compose framework for the user interface. For data storage, FoundIT utilizes an MSSQL database, which is currently local.",
            githubLink: "https://github.com/gitaufar/FoundIT.git"
        },
        {
            title: "SafeSpeak (Competition Project)",
            description:
                "SafeSpeak is my second project, developed within one week. This application is designed to report cases of sexual harassment and help users diagnose whether they have experienced harassment. SafeSpeak also features an emergency button that sends notifications to the nearest community, allowing them to provide immediate assistance in case of harassment. The application is built using Kotlin and XML for the user interface, with Firebase as the backend service.",
            githubLink: "https://github.com/gitaufar/Raion_HackJam.git"
        },
        {
            title: "StuntCare (Internship Project at Raion Community)",
            description:
                "StuntCare is my first project, designed for pregnant mothers to help prevent stunting in newborns. This application provides personalized recommendations on nutrition, exercise, and precautions based on the data provided by the user. By following these guidelines, mothers can ensure their child's healthy growth. StuntCare is built using Kotlin and XML for the user interface, with Firebase as the backend service.",
            githubLink: "https://github.com/gitaufar/StuntCare.git"
        }
    ];
    return (
        <div className="project-section" id="project">
            <ul>
                {projects.map((project, index) => (
                    <li key={index} data-aos="fade-right">
                        <ProjectContainer
                            title={project.title}
                            description={project.description}
                            githubLink={project.githubLink}
                        />
                    </li>
                ))}
            </ul>
        </div>
    )
}