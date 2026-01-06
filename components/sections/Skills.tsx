'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlitchText } from '@/components/ui/GlitchText';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [viewed, setViewed] = useState(false);
    const [cpuLoad, setCpuLoad] = useState(12); // Initial stable value

    useEffect(() => {
        setCpuLoad(Math.floor(Math.random() * 30 + 10)); // Randomize on client mount

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 60%",
                onEnter: () => setViewed(true),
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const skills = [
        { name: "React", level: 90, x: 15, y: 40 },
        { name: "Next.js", level: 85, x: 28, y: 25 },
        { name: "TypeScript", level: 88, x: 42, y: 55 },
        { name: "Three.js", level: 75, x: 55, y: 35 },
        { name: "GSAP", level: 80, x: 68, y: 60 },
        { name: "Node.js", level: 82, x: 82, y: 30 },
        { name: "PostgreSQL", level: 78, x: 92, y: 45 },
    ];

    // SVG Path Generation for Waves
    const generateWavePath = (amplitude: number, frequency: number, phase: number, yOffset: number) => {
        const startY = yOffset + Math.sin((0 * frequency + phase) * Math.PI / 180) * amplitude;
        let path = `M 0 ${startY}`;
        for (let x = 1; x <= 100; x++) {
            const y = yOffset + Math.sin((x * frequency + phase) * Math.PI / 180) * amplitude;
            path += ` L ${x} ${y}`;
        }
        return path;
    };

    return (
        <section id="skills" className="py-24 bg-[#050505] min-h-[90vh] flex flex-col justify-center relative overflow-hidden" ref={containerRef}>

            {/* Background Details */}
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-lenis-pink/20 to-transparent"></div>
            <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-lenis-pink/20 to-transparent"></div>

            <div className="container mx-auto px-6 relative z-10 h-full flex flex-col">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-6xl font-orbitron font-bold text-white text-left">
                        <GlitchText text="TECHNICAL_DATA" />
                    </h2>
                    <div className="flex items-center gap-4 mt-2">
                        <div className="h-[1px] w-24 bg-lenis-pink"></div>
                        <span className="text-sm text-lenis-pink font-mono tracking-widest animate-pulse">SYSTEM DIAGNOSTICS // ONLINE</span>
                    </div>
                </div>

                {/* Cyber-Monitor Container */}
                <div className="relative w-full h-[60vh] bg-[#0a0a0a]/80 backdrop-blur-md rounded-sm overflow-hidden border border-white/5 group">

                    {/* Monitor Glow */}
                    <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] z-10 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.05)_0%,_transparent_70%)] z-0"></div>

                    {/* Grid Background */}
                    <div className="absolute inset-0 z-0 opacity-10"
                        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                    </div>

                    {/* Scanline Animation */}
                    <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/30 blur-[2px] z-20 animate-scanline"></div>

                    {/* Frame Brackets */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 z-30"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50 z-30"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50 z-30"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 z-30"></div>

                    {/* UI Tech Labels */}
                    <div className="absolute top-4 right-4 z-30 text-[10px] font-mono text-cyan-500/70 tracking-widest">
                        CPU_LOAD: {cpuLoad}% <br />
                        MEM_ALLOC: OPTIMAL
                    </div>
                    <div className="absolute bottom-4 left-6 z-30 text-[10px] font-mono text-cyan-500/50 tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-500 rounded-full animate-ping"></span>
                        LIVE_FEED
                    </div>


                    {/* Dummy Histogram (Background) */}
                    <div className="absolute inset-0 z-0 flex items-end justify-between px-2 pointer-events-none opacity-10">
                        {[...Array(40)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: "5%" }}
                                animate={viewed ? { height: `${Math.random() * 60 + 5}%` } : { height: "5%" }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: Math.random() * 2, ease: "easeInOut" }}
                                className="w-1 bg-cyan-500/30"
                            />
                        ))}
                    </div>

                    {/* THE WAVES */}
                    <svg className="absolute inset-0 w-full h-full z-10 preserve-3d" viewBox="0 0 100 100" preserveAspectRatio="none">

                        {/* Wave 1 - Cyan Main */}
                        <motion.path
                            d={generateWavePath(20, 5, 0, 50)}
                            fill="none"
                            stroke="#06b6d4"
                            strokeWidth="0.4"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={viewed ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        {/* Glow for Wave 1 */}
                        <motion.path
                            d={generateWavePath(20, 5, 0, 50)}
                            fill="none"
                            stroke="#06b6d4"
                            strokeWidth="1.5"
                            strokeOpacity="0.2"
                            className="blur-[2px]"
                            initial={{ pathLength: 0 }}
                            animate={viewed ? { pathLength: 1 } : { pathLength: 0 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />

                        {/* Wave 2 - Secondary (Orange) */}
                        <motion.path
                            d={generateWavePath(25, 4, 120, 60)}
                            fill="none"
                            stroke="#ff9f43"
                            strokeWidth="0.3"
                            opacity="0.8"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={viewed ? { pathLength: 1, opacity: 0.8 } : { pathLength: 0, opacity: 0 }}
                            transition={{ duration: 2.2, delay: 0.2, ease: "easeInOut" }}
                        />

                        {/* Wave 3 - Tertiary (Purple) */}
                        <motion.path
                            d={generateWavePath(15, 7, 200, 40)}
                            fill="none"
                            stroke="#8b5cf6"
                            strokeWidth="0.2"
                            opacity="0.6"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={viewed ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 }}
                            transition={{ duration: 2.5, delay: 0.4, ease: "easeInOut" }}
                        />
                    </svg>

                    {/* Data Points / Flags */}
                    {skills.map((skill, index) => {
                        // 0: Cyan, 1: Orange, 2: Purple
                        const waveType = index % 3;
                        let waveY = 0;
                        let colorHex = "";

                        if (waveType === 0) { // Cyan
                            waveY = 50 + Math.sin((skill.x * 5 + 0) * Math.PI / 180) * 20;
                            colorHex = "#06b6d4";
                        } else if (waveType === 1) { // Orange
                            waveY = 60 + Math.sin((skill.x * 4 + 120) * Math.PI / 180) * 25;
                            colorHex = "#ff9f43";
                        } else { // Purple
                            waveY = 40 + Math.sin((skill.x * 7 + 200) * Math.PI / 180) * 15;
                            colorHex = "#8b5cf6";
                        }

                        return (
                            <motion.div
                                key={index}
                                className="absolute z-20 w-0 h-0"
                                style={{ left: `${skill.x}%`, top: `${waveY}%` }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={viewed ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                                transition={{ duration: 0.5, delay: 1.5 + (index * 0.1), type: "spring" }}
                            >
                                {/* Glowing Dot */}
                                <div
                                    className="w-3 h-3 rounded-full absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_currentColor] z-10"
                                    style={{ backgroundColor: colorHex, color: colorHex }} // for shadow inheritance
                                >
                                    <div className="absolute inset-0 rounded-full animate-ping opacity-75" style={{ backgroundColor: colorHex }}></div>
                                </div>

                                {/* Vertical Leader Line */}
                                <div className="absolute bottom-0 left-0 w-[1px] h-16 bg-gradient-to-t from-transparent to-white/30 -translate-x-1/2 origin-bottom" />

                                {/* Tag Box */}
                                <div
                                    className="absolute bottom-16 left-0 -translate-x-1/2 mb-2 px-3 py-2 rounded-sm border backdrop-blur-md flex flex-col items-center min-w-[80px] cursor-default hover:scale-110 transition-transform hover:z-50 bg-black/60 shadow-lg"
                                    style={{ borderColor: `${colorHex}50` }}
                                >
                                    <span className="text-[10px] font-mono leading-none tracking-tighter opacity-70 mb-1" style={{ color: colorHex }}>
                                        SYNC_{skill.level}%
                                    </span>
                                    <span className="text-sm font-bold font-orbitron leading-none text-white">{skill.name}</span>
                                </div>
                            </motion.div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}
