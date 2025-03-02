import { useEffect, useRef } from 'react';
import './Navbar.css';

export default function Navbar() {
    const navbarRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const navbarNav = navbarRef.current;
        const menu = menuRef.current;

        if (!navbarNav || !menu) return;

        // Event klik untuk menampilkan sidebar
        const toggleMenu = () => {
            navbarNav.classList.toggle('active');
        };

        menu.addEventListener('click', toggleMenu);

        // Event klik di luar navbar untuk menutupnya
        const closeMenu = (e) => {
            if (!menu.contains(e.target) && !navbarNav.contains(e.target)) {
                navbarNav.classList.remove('active');
            }
        };

        document.addEventListener('click', closeMenu);

        return () => {
            menu.removeEventListener('click', toggleMenu);
            document.removeEventListener('click', closeMenu);
        };
    }, []);

    return (
        <div className='w-full container'>
            <div className='nama-container'>
                <h6 className='typing-effect'>import Aufar.Portofolio</h6>
            </div>
            <div ref={navbarRef} className='list-container'>
                <a href='#about'>about</a>
                <a href='#tech-stack'>tech stack</a>
                <a href='#project'>projects</a>
                <a href='#journey'>journey</a>
            </div>
            <svg ref={menuRef} id='menu' className="w-6 h-6" width="24" height="24" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
        </div>
    );
}
