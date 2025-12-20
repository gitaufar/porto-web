import { useEffect, useRef } from "react";

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
        <nav className="fixed top-6 flex w-full justify-center items-center z-50">
            <div
                className="
      text-xl px-8 gap-6 py-4
      flex items-center justify-center rounded-full
      bg-white/10
      backdrop-blur-md
      border border-white/20
      shadow-lg
    "
            >
                <a className="text-base text-white cursor-pointer hover:text-gray-300" href="#home">Home</a>
                <a className="text-base text-white cursor-pointer hover:text-gray-300" href="#about">About</a>
                <a className="text-base text-white cursor-pointer hover:text-gray-300" href="#experience">Experience</a>
                <a className="text-base text-white cursor-pointer hover:text-gray-300" href="#project">Projects</a>
                <a className="text-base text-white cursor-pointer hover:text-gray-300" href="#contact">Contact</a>
            </div>
        </nav>

    );
}
