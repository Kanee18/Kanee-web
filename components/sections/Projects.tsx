'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlitchText } from '@/components/ui/GlitchText';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: "01",
        title: "NEON DASHBOARD",
        subtitle: "ANALYTICS SYSTEM",
        desc: "A futuristic analytics dashboard with real-time data visualization and complex filtering capabilities.",
        tech: ["Next.js", "D3.js", "Tailwind"],
        imageColor: "bg-cyan-900/20",
        links: { github: "#", demo: "#" }
    },
    {
        id: "02",
        title: "CYBER COMMERCE",
        subtitle: "VIRTUAL MARKETPLACE",
        desc: "E-commerce platform featuring 3D product previews, AR try-on modules, and seamless payment capability.",
        tech: ["React", "Three.js", "Shopify"],
        imageColor: "bg-purple-900/20",
        links: { github: "#", demo: "#" }
    },
    {
        id: "03",
        title: "AI NEXUS",
        subtitle: "NEUROMORPHIC CHAT",
        desc: "Next-generation AI interface with adaptive learning patterns and fluid conversation UI.",
        tech: ["OpenAI", "Framer", "Node"],
        imageColor: "bg-emerald-900/20",
        links: { github: "#", demo: "#" }
    }
];

const illustrations = [
    {
        id: "01",
        title: "CYBER PORTRAIT",
        subtitle: "CHARACTER DESIGN",
        desc: "High-fidelity cyberpunk character illustration with focus on neon lighting and mechanical details.",
        tech: ["Photoshop", "Blender", "Stable Diffusion"],
        imageColor: "bg-pink-900/20",
        links: { github: "#", demo: "#" }
    },
    {
        id: "02",
        title: "NEON CITY",
        subtitle: "ENVIRONMENT ART",
        desc: "Futuristic cityscape concept art exploring verticality and atmospheric density.",
        tech: ["Unreal Engine", "Maya", "Photoshop"],
        imageColor: "bg-blue-900/20",
        links: { github: "#", demo: "#" }
    },
    {
        id: "03",
        title: "MECHA FRAME",
        subtitle: "CONCEPT ART",
        desc: "Detailed mechanical design study of a combat exoskeleton frame.",
        tech: ["ZBrush", "Keyshot", "Photoshop"],
        imageColor: "bg-orange-900/20",
        links: { github: "#", demo: "#" }
    }
];

interface ProjectCarouselProps {
    items: typeof projects;
    sidebarText: string;
    sidebarPosition?: 'left' | 'right';
}

function ProjectCarousel({ items, sidebarText, sidebarPosition = 'right' }: ProjectCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, [items.length]);

    const currentProject = items[currentIndex];

    return (
        <div className="relative w-full flex">
            {/* Left Sidebar (if active) */}
            {sidebarPosition === 'left' && (
                <div className="hidden md:flex w-16 bg-lenis-pink text-black flex-col items-center justify-center border-y border-l border-lenis-pink">
                    <div className="-rotate-90 whitespace-nowrap font-bold font-orbitron tracking-widest text-lg">
                        {sidebarText}
                    </div>
                </div>
            )}

            {/* Main Carousel Box */}
            <div className="relative flex-1 aspect-[16/9] md:aspect-[21/9] bg-white/5 border border-white/10 overflow-hidden group">

                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,0,0,0.5)_25%,transparent_25%,transparent_50%,rgba(0,0,0,0.5)_50%,rgba(0,0,0,0.5)_75%,transparent_75%,transparent)] bg-[size:4px_4px] opacity-20" />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 flex flex-col md:flex-row"
                    >
                        {/* Visual Side (Left) */}
                        <div className={cn("w-full md:w-2/3 h-full relative p-8 md:p-12 flex flex-col justify-end", currentProject.imageColor)}>
                            <div className="absolute top-4 right-4 text-6xl md:text-9xl font-bold font-orbitron text-white/5 select-none pointer-events-none">
                                {currentProject.id}
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="h-4 w-1 bg-lenis-pink"></div>
                                    <span className="text-lenis-pink font-mono text-xs tracking-widest uppercase">
                                        {currentProject.subtitle}
                                    </span>
                                </div>
                                <h3 className="text-4xl md:text-7xl font-bold text-white font-antonio uppercase leading-none mb-6">
                                    {currentProject.title}
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                    {currentProject.tech.map((t, i) => (
                                        <span key={i} className="px-3 py-1 bg-black/50 border border-white/10 text-xs text-gray-300 font-mono backdrop-blur-sm">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Description Side (Right) */}
                        <div className="w-full md:w-1/3 h-full bg-black/80 border-l border-white/10 p-8 flex flex-col justify-between backdrop-blur-md">
                            <div>
                                <h4 className="text-xl font-bold text-white mb-4 font-orbitron">MISSION BRIEF</h4>
                                <p className="text-gray-400 leading-relaxed font-light">
                                    {currentProject.desc}
                                </p>
                            </div>

                            <div className="flex flex-col gap-4 mt-8">
                                <a
                                    href={currentProject.links.github}
                                    className="flex items-center justify-between p-4 border border-white/20 hover:border-lenis-pink hover:bg-lenis-pink/10 transition-all group/btn"
                                >
                                    <span className="font-mono text-sm text-gray-300 group-hover/btn:text-white">SOURCE_CODE</span>
                                    <Github className="w-4 h-4 text-gray-500 group-hover/btn:text-lenis-pink" />
                                </a>
                                <a
                                    href={currentProject.links.demo}
                                    className="flex items-center justify-between p-4 border border-white/20 hover:border-lenis-pink hover:bg-lenis-pink/10 transition-all group/btn"
                                >
                                    <span className="font-mono text-sm text-gray-300 group-hover/btn:text-white">LIVE_SYSTEM</span>
                                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover/btn:text-lenis-pink" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/50 hover:bg-lenis-pink hover:text-black border border-white/10 text-white transition-all z-20 backdrop-blur-sm"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/50 hover:bg-lenis-pink hover:text-black border border-white/10 text-white transition-all z-20 backdrop-blur-sm"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Pagination Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
                    {items.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={cn(
                                "w-12 h-1 transition-all",
                                idx === currentIndex ? "bg-lenis-pink" : "bg-white/20 hover:bg-white/40"
                            )}
                        />
                    ))}
                </div>
            </div>

            {/* Right Sidebar (if active) */}
            {sidebarPosition === 'right' && (
                <div className="hidden md:flex w-16 bg-lenis-pink text-black flex-col items-center justify-center border-y border-r border-lenis-pink">
                    <div className="rotate-90 whitespace-nowrap font-bold font-orbitron tracking-widest text-lg">
                        {sidebarText}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const illustrationHeaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { y: -50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 80%"
                    }
                }
            );

            gsap.fromTo(illustrationHeaderRef.current,
                { y: -50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: illustrationHeaderRef.current,
                        start: "top 80%"
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" className="py-24 bg-[#0a0a0a] relative overflow-hidden flex flex-col justify-center min-h-screen" ref={containerRef}>

            {/* Top Bar Decoration like the "Notices" line in reference */}
            <div className="container mx-auto px-6 mb-8 flex items-center text-xs font-mono text-gray-500 border-b border-white/10 pb-4">
                <span className="text-lenis-pink mr-4">// PROJECT_LOGS</span>
                <span>{new Date().toISOString().split('T')[0]}</span>
                <span className="ml-auto">SYSTEM_STATUS: ONLINE</span>
            </div>

            {/* Projects Header */}
            <div ref={headerRef} className="container mx-auto px-6 mb-12">
                <h2 className="text-3xl md:text-5xl font-medium text-white font-antonio tracking-tight">
                    <GlitchText text="DEPLOYMENT" /> <span className="text-gray-600 italic font-serif">Zone</span>
                </h2>
                <div className="h-1 w-24 bg-lenis-pink mt-4"></div>
            </div>

            {/* Projects Carousel */}
            <div className="container mx-auto px-6 relative z-10 mb-24">
                <ProjectCarousel items={projects} sidebarText="PROJECT IT" />
            </div>

            {/* Illustration Header */}
            <div ref={illustrationHeaderRef} className="container mx-auto px-6 mb-12 flex flex-col items-end">
                <h2 className="text-3xl md:text-5xl font-medium text-white font-antonio tracking-tight text-right">
                    <GlitchText text="ILLUSTRATION" /> <span className="text-gray-600 italic font-serif">Zone</span>
                </h2>
                <div className="h-1 w-24 bg-lenis-pink mt-4"></div>
            </div>

            {/* Illustration Carousel */}
            <div className="container mx-auto px-6 relative z-10">
                <ProjectCarousel items={illustrations} sidebarText="ILLUSTRATIONS" sidebarPosition="left" />
            </div>

            {/* Bottom Action Bar */}
            <div className="container mx-auto px-6 mt-16 flex justify-end">
                <a
                    href="https://github.com/Kanee18"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1a1a1a] hover:bg-[#252525] text-white px-8 py-4 flex items-center space-x-3 border-l-4 border-lenis-pink transition-colors"
                >
                    <span className="font-bold tracking-wider font-orbitron uppercase">More Intel</span>
                    <ArrowRight size={18} className="text-lenis-pink" />
                </a>
            </div>
        </section>
    );
}
