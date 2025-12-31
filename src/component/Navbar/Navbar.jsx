import { useEffect, useRef } from "react";

export default function Navbar() {
    const navbarRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const navbarNav = navbarRef.current;
        const menu = menuRef.current;

        if (!navbarNav || !menu) return;

        const openMenu = () => {
            navbarNav.classList.remove("-right-full");
            navbarNav.classList.add("right-0");
            menu.setAttribute("aria-expanded", "true");
        };

        const closeMenu = () => {
            navbarNav.classList.add("-right-full");
            navbarNav.classList.remove("right-0");
            menu.setAttribute("aria-expanded", "false");
        };

        const toggleMenu = (e) => {
            e.stopPropagation();
            if (navbarNav.classList.contains("right-0")) closeMenu();
            else openMenu();
        };

        menu.addEventListener("click", toggleMenu);

        const handleDocClick = (e) => {
            if (!menu.contains(e.target) && !navbarNav.contains(e.target)) {
                closeMenu();
            }
        };

        document.addEventListener("click", handleDocClick);

        return () => {
            menu.removeEventListener("click", toggleMenu);
            document.removeEventListener("click", handleDocClick);
        };
    }, []);

    const closeMobileMenu = () => {
        const nav = navbarRef.current;
        const menu = menuRef.current;
        if (!nav) return;
        nav.classList.add("-right-full");
        nav.classList.remove("right-0");
        if (menu) menu.setAttribute("aria-expanded", "false");
    };

    return (
        <nav className="fixed top-6 w-full z-50 flex items-center justify-center">
            {/* Mobile hamburger */}
            <div className="absolute right-4 md:hidden">
                <button ref={menuRef} aria-label="Open menu" aria-expanded="false" className="p-2 rounded-md bg-white/10 backdrop-blur-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 5h14a1 1 0 100-2H3a1 1 0 100 2zm14 6H3a1 1 0 000 2h14a1 1 0 000-2zm0 6H3a1 1 0 000 2h14a1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            {/* Desktop pill */}
            <div className="hidden md:flex text-xl px-8 gap-6 py-4 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                <a className="text-base text-white cursor-pointer hover:text-gray-300" href="#home">Home</a>
                <a className="text-base text-white cursor-pointer hover:text-gray-300" href="#about">About</a>
                <a className="text-base text-white cursor-pointer hover:text-gray-300" href="#experience">Experience</a>
                <a className="text-base text-white cursor-pointer hover:text-gray-300" href="#project">Projects</a>
                <a className="text-base text-white cursor-pointer hover:text-gray-300" href="#contact">Contact</a>
            </div>

            {/* Mobile sliding menu */}
            <div ref={navbarRef} className="fixed top-16 -right-full md:hidden transition-all duration-300 w-64 max-w-[80%] h-auto bg-white/5 backdrop-blur-md p-4 rounded-l-lg border border-white/10 z-50">
                <nav className="flex flex-col gap-3">
                    <a onClick={closeMobileMenu} className="text-white text-lg font-medium" href="#home">Home</a>
                    <a onClick={closeMobileMenu} className="text-white text-lg font-medium" href="#about">About</a>
                    <a onClick={closeMobileMenu} className="text-white text-lg font-medium" href="#experience">Experience</a>
                    <a onClick={closeMobileMenu} className="text-white text-lg font-medium" href="#project">Projects</a>
                    <a onClick={closeMobileMenu} className="text-white text-lg font-medium" href="#contact">Contact</a>
                </nav>
            </div>
        </nav>

    );
}
