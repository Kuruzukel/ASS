import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Home', to: '#home' },
        { name: 'About', to: '#about' },
        { name: 'Services', to: '#services' },
        { name: 'Contacts', to: '#contact' },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id.replace('#', ''));
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
        }
    };

    return (
        <motion.nav
            initial={{ y: -100, x: "-50%" }}
            animate={{ y: 0, x: "-50%" }}
            className="fixed top-4 left-1/2 w-[95%] z-50 glass rounded-full px-6 py-3 flex justify-between items-center shadow-lg"
        >
            <div className="text-2xl font-bold text-primary cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                Appoint<span className="text-secondary">Me</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
                {navLinks.map((link) => (
                    <button
                        key={link.name}
                        onClick={() => scrollToSection(link.to)}
                        className="text-gray-700 hover:text-primary font-medium transition-colors"
                    >
                        {link.name}
                    </button>
                ))}
                <Link to="/login">
                    <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        Login
                    </button>
                </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 text-2xl focus:outline-none">
                    {isOpen ? <HiX /> : <HiMenu />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col space-y-4 md:hidden">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => scrollToSection(link.to)}
                            className="text-gray-700 hover:text-primary font-medium text-lg text-left"
                        >
                            {link.name}
                        </button>
                    ))}
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                        <button className="w-full bg-primary text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all">
                            Login
                        </button>
                    </Link>
                </div>
            )}
        </motion.nav>
    );
};

export default Navbar;
