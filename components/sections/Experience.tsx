'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlitchText } from '@/components/ui/GlitchText';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        year: "2024 - PRESENT",
        role: "Backend Developer",
        company: "TECH CORP",
        desc: "Developing AI models and applications using Python and other technologies.",
        tech: ["Python", "Stable Diffusion", "OpenCV", "TensorFlow", "PyTorch", "ComfyUI", "FastAPI",]
    },
    {
        year: "2022 - 2024",
        role: "Artist Illustration",
        company: "CREATIVE AGENCY",
        desc: "Creating illustration for various projects.",
        tech: ["Clip Studio Paint", "Photoshop", "Figma"]
    },
    {
        year: "2020 - 2022",
        role: "Frontend Developer",
        company: "STARTUP INC",
        desc: "Developed responsive React applications and established the core design system for scalable products.",
        tech: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Node.js", "MongoDB", "Firebase"]
    }
];

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Laser Line animation
            gsap.fromTo(lineRef.current,
                { height: 0, opacity: 0 },
                {
                    height: "100%",
                    opacity: 1,
                    duration: 1.5,
                    ease: "power2.inOut",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                        end: "bottom 80%",
                        scrub: true
                    }
                }
            );

            // Cards animation
            gsap.utils.toArray(".exp-card").forEach((el: any, i) => {
                const direction = i % 2 === 0 ? -100 : 100;

                gsap.fromTo(el,
                    { x: direction, opacity: 0, rotateY: i % 2 === 0 ? -15 : 15 },
                    {
                        x: 0,
                        opacity: 1,
                        rotateY: 0,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                        }
                    }
                );
            });

            // Nodes animation
            gsap.utils.toArray(".timeline-node").forEach((el: any, i) => {
                gsap.fromTo(el,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        delay: 0.2,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                        }
                    }
                );
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="experience" className="py-32 bg-[#030303] relative overflow-hidden min-h-screen flex items-center" ref={containerRef}>

            {/* Background Data Grid */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#030303] via-transparent to-[#030303]"></div>
            </div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <div className="text-center mb-24 relative">
                    <h2 className="text-5xl md:text-7xl font-bold font-orbitron text-white tracking-tighter">
                        <GlitchText text="CAREER_LOGS" />
                    </h2>
                    <div className="flex items-center justify-center gap-4 mt-4">
                        <div className="h-[1px] w-12 bg-lenis-pink/50"></div>
                        <span className="text-lenis-pink font-mono tracking-[0.3em] text-sm uppercase glow-text">Chronological Data</span>
                        <div className="h-[1px] w-12 bg-lenis-pink/50"></div>
                    </div>
                </div>

                <div className="relative">
                    {/* Central Laser Timeline */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-800/50 md:-translate-x-1/2">
                        <div ref={lineRef} className="w-full bg-gradient-to-b from-lenis-pink via-cyan-400 to-lenis-pink shadow-[0_0_15px_rgba(236,72,153,0.6)]"></div>
                    </div>

                    <div className="space-y-24">
                        {experiences.map((exp, index) => (
                            <div key={index} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-start md:items-center pl-16 md:pl-0 group`}>

                                {/* Holo-Node */}
                                <div className="timeline-node absolute left-6 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20 flex items-center justify-center">
                                    <div className="w-4 h-4 bg-[#030303] rounded-full border-2 border-lenis-pink relative z-20 group-hover:scale-125 transition-transform duration-300"></div>
                                    <div className="absolute w-8 h-8 bg-lenis-pink/20 rounded-full animate-ping opacity-75 z-10"></div>
                                    <div className="absolute w-12 h-12 border border-lenis-pink/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-0 group-hover:scale-100"></div>
                                </div>

                                {/* Content Card */}
                                <div className="md:w-1/2 md:px-16 w-full">
                                    <div className="exp-card relative bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-8 group-hover:border-lenis-pink/50 transition-all duration-500 overflow-hidden">

                                        {/* Tech Corners */}
                                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-lenis-pink opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-lenis-pink opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-lenis-pink opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-lenis-pink opacity-50 group-hover:opacity-100 transition-opacity"></div>

                                        {/* Data Label */}
                                        <div className="absolute -right-2 top-4 opacity-10 group-hover:opacity-20 transition-opacity rotate-90 text-[10px] font-mono text-lenis-pink tracking-widest">
                                            LOG_0{3 - index}
                                        </div>

                                        <div className="flex flex-col gap-2 relative z-10">
                                            <span className="font-mono text-lenis-pink text-xs tracking-wider flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-lenis-pink rounded-full"></span>
                                                {exp.year}
                                            </span>

                                            <h3 className="text-2xl font-bold text-white font-orbitron group-hover:text-lenis-pink transition-colors">{exp.role}</h3>
                                            <p className="text-gray-400 font-mono text-sm uppercase tracking-wide mb-4 border-b border-white/5 pb-4">{exp.company}</p>

                                            <p className="text-gray-300 leading-relaxed font-light text-sm mb-6">
                                                {exp.desc}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {exp.tech.map((t, i) => (
                                                    <span key={i} className="px-2 py-1 bg-white/5 border border-white/5 text-[10px] text-gray-400 font-mono uppercase tracking-wider group-hover:border-lenis-pink/30 group-hover:text-lenis-pink transition-colors">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
