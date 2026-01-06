'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlitchText } from '@/components/ui/GlitchText';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    {
        year: "2024 - PRESENT",
        role: "Senior Full-Stack Developer",
        company: "TECH CORP",
        desc: "Leading the development of next-gen web applications using React Server Components and AI integration."
    },
    {
        year: "2022 - 2024",
        role: "UI/UX Engineer",
        company: "CREATIVE AGENCY",
        desc: " Designed and implemented award-winning websites with a focus on micro-interactions and 3D web experiences."
    },
    {
        year: "2020 - 2022",
        role: "Frontend Developer",
        company: "STARTUP INC",
        desc: "Developed responsive React applications and established the core design system."
    }
];

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Line animation
            gsap.fromTo(lineRef.current,
                { height: 0 },
                {
                    height: "100%",
                    duration: 1.5,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                        end: "bottom 80%",
                        scrub: true
                    }
                }
            );

            // Items animation
            gsap.utils.toArray(".exp-item").forEach((el: any, i) => {
                gsap.from(el, {
                    x: i % 2 === 0 ? -50 : 50,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 80%",
                    }
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="experience" className="py-24 bg-[#050505] relative overflow-hidden" ref={containerRef}>
            <div className="container mx-auto px-6 max-w-4xl">
                <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-20 text-center">
                    <GlitchText text="CAREER_LOGS" />
                    <span className="block text-sm text-lenis-pink font-mono mt-2 tracking-widest">EXPERIENCE TIMELINE</span>
                </h2>

                <div className="relative">
                    {/* Timeline Center Line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 md:-translate-x-1/2">
                        <div ref={lineRef} className="w-full bg-lenis-pink shadow-[0_0_10px_#ffafb6]"></div>
                    </div>

                    <div className="space-y-16">
                        {experiences.map((exp, index) => (
                            <div key={index} className={`exp-item relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-start md:items-center pl-12 md:pl-0`}>

                                {/* Dot */}
                                <div className="absolute left-2 md:left-1/2 top-0 md:top-1/2 w-4 h-4 bg-black border-2 border-lenis-pink rounded-full z-10 -translate-x-1/2 md:-translate-y-1/2 shadow-[0_0_10px_#ffafb6]" />

                                {/* Content */}
                                <div className="md:w-1/2 md:px-12">
                                    <div className="p-6 bg-white/5 border border-white/10 hover:border-lenis-pink/30 transition-colors">
                                        <span className="text-lenis-pink font-mono text-sm">{exp.year}</span>
                                        <h3 className="text-xl font-bold text-white mt-1 font-orbitron">{exp.role}</h3>
                                        <p className="text-gray-400 text-sm mt-1 mb-3">{exp.company}</p>
                                        <p className="text-gray-300 leading-relaxed text-sm">{exp.desc}</p>
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
