'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlitchText } from '@/components/ui/GlitchText';
import { StatBar } from '@/components/ui/StatBar';
import dynamic from 'next/dynamic';

const HologramProfile = dynamic(() => import('@/components/canvas/HologramProfile').then(mod => mod.HologramProfile), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-white/5 animate-pulse" />
});

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const hologramRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        // Animate Content Slide In
        gsap.fromTo(contentRef.current,
            { x: -50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: el,
                    start: "top 70%",
                }
            }
        );

        // Animate Hologram pop up (Fade Only)
        gsap.fromTo(hologramRef.current,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1.0,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 70%",
                }
            }
        );

    }, []);

    return (
        <section id="about" className="relative min-h-screen flex items-center justify-center py-24 px-6 bg-black overflow-hidden" ref={sectionRef}>

            {/* Background Typography - Massive Depth Element */}
            <div className="absolute top-[10%] right-[-5%] z-0 pointer-events-none opacity-[0.03] select-none">
                <span className="text-[20vw] font-black font-orbitron leading-none text-white">02</span>
            </div>
            <div className="absolute bottom-[5%] left-[-2%] z-0 pointer-events-none opacity-[0.02] select-none">
                <span className="text-[15vw] font-black font-orbitron leading-none text-lenis-pink">PROFILE</span>
            </div>

            {/* Grid Overlay Pattern */}
            <div className="absolute inset-0 z-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}
            />

            <div className="relative z-10 max-w-7xl w-full grid lg:grid-cols-12 gap-16 items-center">

                {/* LEFT COLUMN: Data Dossier (The Text) */}
                <div ref={contentRef} className="lg:col-span-7">
                    {/* Header */}
                    <div className="mb-10">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="w-12 h-[2px] bg-lenis-pink"></div>
                            <span className="text-lenis-pink font-mono text-sm tracking-[0.2em]">CLASSIFIED // CLEARED</span>
                        </div>
                        <h2 className="text-3xl md:text-7xl font-orbitron font-bold text-white mb-2">
                            <GlitchText text="OPERATOR" />
                        </h2>
                        <h3 className="text-2xl md:text-3xl font-light font-syncopate text-white/50 tracking-widest">DOSSIER</h3>
                    </div>

                    {/* Glass Panel */}
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 rounded-sm">

                        {/* Decorative Corners */}
                        <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-lenis-pink/50"></div>
                        <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-lenis-pink/50"></div>

                        {/* Text Content */}
                        <div className="text-gray-300 space-y-6 text-lg font-light leading-relaxed mb-10">
                            <p>
                                <span className="text-lenis-pink font-bold">ID:</span> KANEE.DEV <br />
                                <span className="text-lenis-pink font-bold">CLASS:</span> FULL-STACK SPECIALIST
                            </p>
                            <p>
                                Visionary developer and UI/UX designer dedicated to crafting immersive digital experiences.
                                Blending <span className="text-white font-medium">high-performance code</span> with <span className="text-white font-medium">cinematic aesthetics</span>,
                                I build interfaces that feel functional, futuristic, and alive.
                            </p>
                            <p>
                                I'm an anime-style digital artist specializing in character illustration—designing
                                captivating original characters (OCs), fan art, and concepts with distinctive anime-inspired flair.
                                My illustrations often feature glowing effects, dramatic lighting, and emotional depth to make the
                                characters feel alive and relatable.
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                            <StatBar label="Creativity" value={98} delay={0.5} />
                            <StatBar label="Logic" value={95} delay={0.7} />
                            <StatBar label="Caffeine" value={100} delay={0.9} />
                            <StatBar label="Efficiency" value={92} delay={1.1} />
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Hologram Frame (Reverted) */}
                <div ref={hologramRef} className="lg:col-span-5 flex flex-col items-center justify-center">

                    {/* The Framed Container */}
                    <div className="relative w-72 h-72 md:w-96 md:h-96 z-10 animate-float-slow">
                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-lenis-pink/10 blur-3xl rounded-full"></div>

                        {/* Frame Border */}
                        <div className="relative w-full h-full border-2 border-lenis-pink/30 bg-black/50 overflow-hidden rounded-sm">
                            {/* Hologram Canvas */}
                            <HologramProfile />

                            {/* Corner accents */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-lenis-pink"></div>
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-lenis-pink"></div>

                            {/* Overlay Scanline */}
                            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] z-50 opacity-30" />
                        </div>
                    </div>

                    {/* Google Cloud Certifications Button */}
                    {/* Google Cloud Certifications Button (Solid Pink Style) */}
                    <a
                        href="https://www.skills.google/public_profiles/9abf40ca-63b4-4c66-b258-561935d463df"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 relative inline-flex items-center gap-3 px-8 py-4 bg-lenis-pink hover:bg-white text-black transition-colors duration-300 rounded-sm group"
                    >
                        {/* Icon (Simple G Logo) */}
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.1-1.133 8.16-3.293 2.093-2.107 2.733-5.093 2.733-7.56 0-.747-.067-1.48-.187-2.227h-10.707z" />
                        </svg>

                        <span className="font-mono text-sm uppercase font-bold tracking-wider">
                            BADGES AND CERTIFICATIONS
                        </span>

                        {/* Arrow Icon */}
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
