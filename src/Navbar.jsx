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
        <div className='container'>
            <div className='nama-container'>
                <h6 className='typing-effect'>import Aufar.Portofolio</h6>
            </div>
            <svg ref={menuRef} id='menu' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <div ref={navbarRef} className='list-container'>
                <a href='#about'>about</a>
                <a href='#tech-stack'>tech stack</a>
                <a href='#project'>projects</a>
                <a href='#journey'>journey</a>
            </div>
        </div>
    );
}
