import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import HomeIcon from "../assets/icons/nav/home-icon.svg?react";
import AboutIcon from "../assets/icons/nav/about-icon.svg?react";
import ExperienceIcon from "../assets/icons/nav/experience-icon.svg?react";
import ProjectsIcon from "../assets/icons/nav/projects-icon.svg?react";
import ContactIcon from "../assets/icons/nav/contact-icon.svg?react";
import PlusIcon from "../assets/icons/nav/plus-icon.svg?react";
import CloseIcon from "../assets/icons/nav/close-icon.svg?react";
import Logo from "../assets/logo/km-logo.svg?react";

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        // Apply or remove a class on the body or a parent to hide/show the footer
        document.body.classList.toggle('mobile-menu-open', isMobileMenuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) { // Adjust breakpoint
                setIsMobileMenuOpen(false);
                document.body.classList.remove('mobile-menu-open'); // Ensure class is removed on desktop
            }
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className="site-header">
            <div className="logo">
                <Link to="/">
                    <Logo />
                </Link>
            </div>
            {!isMobileMenuOpen && (
                <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                    <PlusIcon />
                </button>
            )}
            <nav className={`mobile-navbar ${isMobileMenuOpen ? 'open' : ''}`}>
                {isMobileMenuOpen && (
                    <button className="mobile-menu-toggle close-button" onClick={toggleMobileMenu}>
                        <CloseIcon />
                    </button>
                )}
                <ul>
                    <li>
                        <Link to="/">
                            <HomeIcon />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                            <AboutIcon />
                            <span>About</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/experience">
                            <ExperienceIcon />
                            <span>Experience</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/projects">
                            <ProjectsIcon />
                            <span>Projects</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact">
                            <ContactIcon />
                            <span>Contact</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;