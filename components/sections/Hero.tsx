'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownLeft, Github, FileText } from 'lucide-react';
import { useLoading } from '@/components/providers/LoadingProvider';
import { ScrambleText } from '@/components/ui/ScrambleText';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleContainerRef = useRef<HTMLHeadingElement>(null);
    const { isLoading } = useLoading();
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
        if (isLoading) return; // Wait until loading is done (progress 100%)

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            timelineRef.current = tl;

            const windowWidth = window.innerWidth;

            // Animate B: From Center -> Left
            tl.from(".letter-b", {
                x: (windowWidth * 0.15),
                opacity: 1,
                scale: 1.5,
                textShadow: "0 0 50px rgba(255,175,182,0.8)",
                duration: 1.5,
                ease: "power4.inOut"
            })

                // Animate A: From Center -> Right
                .from(".letter-a-end", {
                    x: -(windowWidth * 0.15),
                    opacity: 1,
                    scale: 1.5,
                    textShadow: "0 0 50px rgba(255,175,182,0.8)",
                    duration: 1.5,
                    ease: "power4.inOut"
                }, "<") // Sync with B

                // Introduction of Middle Text
                .fromTo(".middle-text",
                    { width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 },
                    { width: "auto", opacity: 1, duration: 1.2, ease: "power2.out" },
                    "-=0.8"
                )

                // Status Badge Entrance
                .fromTo(".status-badge",
                    { y: -50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" },
                    "-=1.0"
                )

                // Reveal the rest of the UI
                .from(".hero-element", {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                }, "-=0.5");

        }, containerRef);

        return () => ctx.revert();
    }, [isLoading]);

    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            setTime(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section ref={containerRef} id="hero" className="relative h-screen w-full flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 z-10 overflow-hidden">


            {/* Main Title Area */}
            <div className="flex-1 flex flex-col justify-center items-center relative">
                {/* Status Badge - Centered */}
                <div className="status-badge mb-8 flex items-center gap-3 bg-lenis-pink px-4 py-2 rounded-sm transform hover:scale-105 transition-transform duration-300 cursor-default shadow-[0_0_20px_rgba(255,175,182,0.3)]">
                    {/* Tri-force Icon */}
                    <div className="relative w-6 h-5">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-black"></div>
                        <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-black"></div>
                        <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-black"></div>
                    </div>

                    <span className="text-black font-bold font-orbitron tracking-wider text-sm md:text-base uppercase">
                        Commission Closed
                    </span>

                    {/* Arrow Icon */}
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                        <path d="M1 9L5 5L1 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>

                <h1 ref={titleContainerRef} className="flex items-center justify-center text-[12vw] leading-none font-bold font-antonio text-lenis-pink tracking-tighter mix-blend-difference z-50 select-none">
                    <span className="letter-b inline-block origin-center">B</span>
                    <span className="middle-text overflow-hidden whitespace-nowrap inline-block text-white origin-center">HAGASKAR</span>
                    <span className="letter-a-end inline-block origin-center">A</span>
                </h1>

                <div className="w-full flex justify-end mt-4 pr-[5vw] hero-element">
                    <span className="text-white/80 font-syncopate text-xl md:text-3xl tracking-[0.2em] uppercase font-light">
                        <ScrambleText startText="FULL STACK DEV" text="ILLUSTRATION" duration={4000} delay={500} loop={true} />
                    </span>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-end border-t border-white/10 pt-8 hero-element backdrop-blur-sm bg-black/20">
                {/* Scroll Indicator */}
                <div className="hidden md:flex flex-col gap-2">
                    <div className="flex items-center gap-6">
                        <span className="font-syncopate text-xs text-lenis-pink uppercase tracking-widest whitespace-nowrap">
                            Scroll to explore
                        </span>
                        <span className="font-mono text-xs text-gray-500 uppercase tracking-wider">
                            X: USERS &gt;&gt; <span className="text-lenis-pink/80">{time}</span>
                        </span>
                    </div>
                    <div className="h-16 w-[1px] bg-lenis-pink/50 ml-2 animate-pulse"></div>
                </div>

                {/* Description */}
                <div className="flex items-start gap-4">
                    <div className="flex flex-col gap-2">
                        <p className="text-gray-400 text-sm md:text-base max-w-sm font-inter leading-relaxed">
                            Building digital experiences that merge functionality with distinctive aesthetics. Based in Indonesia.
                        </p>
                        <span className="text-xs text-gray-600 font-mono">© 2026 KANEE.DEV</span>
                    </div>
                    <div className="flex flex-col gap-1 mt-1">
                        <a href="/api-product" className="text-lenis-pink hover:text-white transition-colors font-bold cursor-pointer underline decoration-lenis-pink/30 hover:decoration-white whitespace-nowrap text-sm">API product</a>
                        <a href="/app-product" className="text-lenis-pink hover:text-white transition-colors font-bold cursor-pointer underline decoration-lenis-pink/30 hover:decoration-white whitespace-nowrap text-sm">App product</a>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 justify-end">
                    <a href="https://github.com/Kanee18?tab=repositories" className="group flex items-center justify-center gap-2 bg-lenis-pink text-black px-6 py-4 font-bold font-syncopate text-sm hover:bg-white transition-colors duration-300">
                        <Github className="w-4 h-4" />
                        PROJECTS
                        <ArrowDownLeft className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                    </a>
                    <a href="https://ko-fi.com/kanee" className="group flex items-center justify-center gap-2 border border-lenis-pink text-lenis-pink px-6 py-4 font-bold font-syncopate text-sm hover:bg-lenis-pink hover:text-black transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-square-heart" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                            <path d="M8 3.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132" />
                        </svg>
                        SUPPORT ME ON KO-FI
                        <ArrowDownLeft className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
}
