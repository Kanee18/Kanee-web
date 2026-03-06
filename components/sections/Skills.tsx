'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlitchText } from '@/components/ui/GlitchText';

gsap.registerPlugin(ScrollTrigger);

/* ─── card data ─── */
const skillCards = [
    {
        title: 'FRONTEND',
        subtitle: 'UI / INTERFACE',
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
        color: '#ffafb6',
        rotate: -4,
    },
    {
        title: 'BACKEND',
        subtitle: 'SERVER / API',
        skills: ['Node.js', 'Express', 'Python', 'REST API'],
        color: '#fb7185',
        rotate: 3,
    },
    {
        title: '3D / CREATIVE',
        subtitle: 'VISUAL ENGINE',
        skills: ['Three.js', 'R3F', 'GSAP', 'Framer Motion'],
        color: '#c084fc',
        rotate: -2,
    },
    {
        title: 'DATABASE',
        subtitle: 'DATA LAYER',
        skills: ['PostgreSQL', 'MongoDB', 'Prisma', 'Redis'],
        color: '#67e8f9',
        rotate: 5,
    },
    {
        title: 'DEVOPS',
        subtitle: 'DEPLOYMENT',
        skills: ['Docker', 'Vercel', 'GitHub Actions', 'Linux'],
        color: '#86efac',
        rotate: -3,
    },
    {
        title: 'DESIGN',
        subtitle: 'UI/UX CRAFT',
        skills: ['Figma', 'Photoshop', 'Illustrator', 'Blender'],
        color: '#fbbf24',
        rotate: 4,
    },
    {
        title: 'TOOLS',
        subtitle: 'WORKFLOW',
        skills: ['Git', 'VS Code', 'Postman', 'Notion'],
        color: '#f472b6',
        rotate: -5,
    },
];

/* duplicate for seamless infinite scroll */
const allCards = [...skillCards, ...skillCards];

export default function Skills() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const stripRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    /* entrance + infinite scroll animation */
    useEffect(() => {
        const ctx = gsap.context(() => {
            /* trigger visibility */
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top 80%',
                onEnter: () => setIsVisible(true),
            });

            /* cards entrance — fly up with stagger */
            gsap.fromTo(
                '.tilt-card',
                { opacity: 0, y: 120, scale: 0.85 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.9,
                    stagger: 0.06,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                }
            );

            /* infinite marquee — scroll the strip to the left */
            if (stripRef.current) {
                const totalWidth = stripRef.current.scrollWidth / 2; // half because its duplicated
                gsap.to(stripRef.current, {
                    x: -totalWidth,
                    duration: 40,
                    ease: 'none',
                    repeat: -1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="skills"
            ref={sectionRef}
            className="relative w-full bg-[#050505] overflow-hidden select-none"
            style={{ minHeight: '100vh' }}
        >
            {/* Crosshair marks — matching reference aesthetic */}
            {[
                'top-6 left-6',
                'top-6 right-6',
                'bottom-6 left-6',
                'bottom-6 right-6',
            ].map((pos, i) => (
                <svg key={i} className={`absolute ${pos} w-4 h-4 text-white/15 z-30`} viewBox="0 0 16 16">
                    <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="0.5" />
                    <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="0.5" />
                </svg>
            ))}

            {/* ── Top title — like "EXPLORE KJP FAMILY PRODUCTS" ── */}
            <div className="absolute top-36 left-0 right-0 z-30 text-center px-6">
                <h2 className="text-3xl md:text-7xl font-orbitron font-bold text-white tracking-wider mb-3">
                    <GlitchText text="TECHNICAL_DATA" />
                </h2>
                <p className="text-xs md:text-sm font-mono text-white/40 max-w-xl mx-auto leading-relaxed tracking-wide">
                    Core technologies and tools powering creative digital experiences — always evolving, always improving.
                </p>
            </div>

            {/* ── Card Strip ── */}
            <div className="absolute inset-0 flex items-center pt-40">

                {/* Spotlight glow — on top of cards with glow effect */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4 w-[1000px] h-[600px] rounded-full pointer-events-none z-10" style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 30%, rgba(255,255,255,0.008) 50%, transparent 70%)', filter: 'blur(160px)', mixBlendMode: 'screen' }} />
                <div
                    ref={stripRef}
                    className="flex items-center gap-6 md:gap-10 pl-8"
                    style={{ willChange: 'transform' }}
                >
                    {allCards.map((card, index) => (
                        <div
                            key={`${card.title}-${index}`}
                            className="tilt-card flex-shrink-0"
                            style={{
                                width: '300px',
                                height: '420px',
                                transform: `rotate(${card.rotate}deg)`,
                                transition: 'transform 0.4s ease',
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLDivElement).style.transform = 'rotate(0deg) scale(1.04)';
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLDivElement).style.transform = `rotate(${card.rotate}deg) scale(1)`;
                            }}
                        >
                            <div
                                className="w-full h-full relative overflow-hidden rounded-lg group/c"
                                style={{
                                    background: 'linear-gradient(160deg, #111 0%, #0a0a0a 50%, #0d0d0d 100%)',
                                    border: '1px solid rgba(255,255,255,0.07)',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 1px rgba(255,255,255,0.1)',
                                }}
                            >
                                {/* Top accent line */}
                                <div
                                    className="absolute top-0 inset-x-0 h-[2px] opacity-50 group-hover/c:opacity-100 transition-opacity duration-300"
                                    style={{ background: `linear-gradient(90deg, transparent 5%, ${card.color}, transparent 95%)` }}
                                />

                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col justify-between p-6">
                                    <div>
                                        <div
                                            className="text-[9px] font-mono tracking-[0.35em] mb-1 opacity-40"
                                            style={{ color: card.color }}
                                        >
                                            {card.subtitle}
                                        </div>
                                        <h3 className="text-xl font-orbitron font-bold text-white mb-4 leading-tight">
                                            {card.title}
                                        </h3>
                                        <div className="w-full h-px mb-5 opacity-10" style={{ backgroundColor: card.color }} />
                                        <ul className="space-y-3.5">
                                            {card.skills.map((skill, si) => (
                                                <li key={skill} className="flex items-center gap-3 text-sm font-mono text-white/65 group-hover/c:text-white/90 transition-colors">
                                                    <span
                                                        className="w-1.5 h-1.5 rounded-full shrink-0"
                                                        style={{ backgroundColor: card.color, boxShadow: `0 0 6px ${card.color}50` }}
                                                    />
                                                    <span className="text-[10px] opacity-30 tabular-nums" style={{ color: card.color }}>0{si + 1}</span>
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Bottom */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-[8px] font-mono tracking-[0.2em] opacity-20" style={{ color: card.color }}>MODULE_ACTIVE</span>
                                        <span className="flex items-center gap-1">
                                            <span className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: card.color }} />
                                            <span className="text-[8px] font-mono opacity-20" style={{ color: card.color }}>ONLINE</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Corner brackets */}
                                <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l opacity-15" style={{ borderColor: card.color }} />
                                <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r opacity-15" style={{ borderColor: card.color }} />

                                {/* Hover glow */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover/c:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: `radial-gradient(ellipse at 50% 30%, ${card.color}0a 0%, transparent 60%)` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>



            {/* ── Edge vignettes ── */}
            <div className="absolute inset-y-0 left-0 w-[15%] bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-[15%] bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-[10%] bg-gradient-to-b from-[#050505] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-20 pointer-events-none" />
        </section>
    );
}
