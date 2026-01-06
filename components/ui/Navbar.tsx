'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Volume2, VolumeX } from 'lucide-react';

const navItems = [
    { name: 'HOME', href: '#hero' },
    { name: 'ABOUT', href: '#about' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        // Use passive listener for better scroll performance
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Attempt autoplay
        const playAudio = async () => {
            if (audioRef.current) {
                audioRef.current.volume = 0.4;
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (error) {
                    console.log("Autoplay blocked, waiting for interaction...");
                    // Add one-time interaction listener
                    const enableAudio = async () => {
                        if (audioRef.current) {
                            try {
                                await audioRef.current.play();
                                setIsPlaying(true);
                                document.removeEventListener('click', enableAudio);
                            } catch (e) {
                                console.log("Interaction play failed", e);
                            }
                        }
                    };
                    document.addEventListener('click', enableAudio);
                }
            }
        };

        playAudio();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(error => {
                console.log("Audio playback failed:", error);
            });
        }
        setIsPlaying(!isPlaying);
    };

    const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setMobileMenuOpen(false); // Close mobile menu on click
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b border-transparent",
                    scrolled ? "bg-black/50 backdrop-blur-md border-lenis-pink/20 py-4" : "bg-transparent py-6"
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    {/* Logo */}
                    <div className="font-orbitron font-bold text-2xl text-white tracking-wider z-[101] relative">
                        KANEE<span className="text-white">.DEV</span>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => handleScrollTo(e, item.href)}
                                className="text-sm font-medium text-gray-300 hover:text-lenis-pink transition-colors relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lenis-pink transition-all group-hover:w-full" />
                            </a>
                        ))}

                        {/* Audio Toggle */}
                        <button
                            onClick={toggleAudio}
                            className="p-2 bg-white/5 border border-white/10 hover:border-lenis-pink hover:text-lenis-pink transition-all rounded-full group ml-4"
                            aria-label="Toggle Audio"
                        >
                            {isPlaying ? (
                                <Volume2 size={18} className="text-gray-300 group-hover:text-lenis-pink" />
                            ) : (
                                <VolumeX size={18} className="text-gray-500 group-hover:text-lenis-pink" />
                            )}
                        </button>
                        <audio ref={audioRef} loop src="/audio/background.mp3" />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden text-white flex items-center gap-4 z-[101] relative">
                        {/* Audio Toggle Mobile */}
                        <button
                            onClick={toggleAudio}
                            className="p-2 bg-white/5 border border-white/10 hover:border-lenis-pink hover:text-lenis-pink transition-all rounded-full"
                        >
                            {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
                        </button>

                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 focus:outline-none">
                            {mobileMenuOpen ? (
                                // Close Icon
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                // Hamburger Icon
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm md:hidden"
                        />

                        {/* Slide-out Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 z-[100] h-full w-[70%] max-w-[300px] bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col p-8 md:hidden"
                        >
                            {/* Close Button Header */}
                            <div className="flex justify-end mb-12">
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="p-2 text-white/50 hover:text-lenis-pink transition-colors"
                                >
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Links */}
                            <div className="flex flex-col space-y-6">
                                {navItems.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        onClick={(e) => handleScrollTo(e, item.href)}
                                        className="text-xl font-orbitron font-medium text-white hover:text-lenis-pink transition-colors tracking-widest flex items-center gap-3 group"
                                    >
                                        <span className="w-1 h-1 bg-lenis-pink opacity-0 group-hover:opacity-100 transition-opacity rounded-full"></span>
                                        {item.name}
                                    </a>
                                ))}
                            </div>

                            {/* Mobile Menu Footer/Decoration */}
                            <div className="mt-auto border-t border-white/10 pt-6">
                                <div className="text-xs font-mono text-white/30 text-center">
                                    SYSTEM_NAV // V.2.0
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
