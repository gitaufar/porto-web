import { useEffect, useRef } from "react";
import './Navbar.css';

export default function Navbar() {
    const navbarRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const navbarNav = navbarRef.current;
        const menu = menuRef.current;

        if (!navbarNav || !menu) return;

        const toggleMenu = () => {
            navbarNav.classList.toggle("right-0");
            navbarNav.classList.toggle("-right-full");
        };

        menu.addEventListener("click", toggleMenu);

        const closeMenu = (e) => {
            if (!menu.contains(e.target) && !navbarNav.contains(e.target)) {
                navbarNav.classList.add("-right-full");
                navbarNav.classList.remove("right-0");
            }
        };

        document.addEventListener("click", closeMenu);

        return () => {
            menu.removeEventListener("click", toggleMenu);
            document.removeEventListener("click", closeMenu);
        };
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full bg-[#1e1e1e] p-5 flex justify-between items-center z-50">
            <div className="text-purple-400 text-lg font-mono border-r-2 border-purple-400 pr-2 whitespace-nowrap overflow-hidden typing-effect">
                import Aufar.Portofolio
            </div>
            <div ref={navbarRef} className="absolute md:static top-full -right-full md:right-0 bg-[#1e1e1e] md:bg-transparent flex flex-col md:flex-row md:items-center gap-4 w-1/2 md:w-auto h-screen md:h-auto transition-all duration-300">
                <a href="#about" className="text-white hover:text-purple-400 transition">about</a>
                <a href="#tech-stack" className="text-white hover:text-purple-400 transition">tech stack</a>
                <a href="#project" className="text-white hover:text-purple-400 transition">projects</a>
                <a href="#journey" className="text-white hover:text-purple-400 transition">journey</a>
            </div>
            <svg
                ref={menuRef}
                className="md:hidden cursor-pointer text-white fill-white"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        </div>
    );
}
