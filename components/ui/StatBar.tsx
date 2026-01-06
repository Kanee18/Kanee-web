import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface StatBarProps {
    label: string;
    value: number; // 0 to 100
    delay?: number;
}

export function StatBar({ label, value, delay = 0 }: StatBarProps) {
    const barRef = useRef<HTMLDivElement>(null);
    const fillRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = barRef.current;
        if (!el || !fillRef.current) return;

        gsap.fromTo(fillRef.current,
            { width: "0%" },
            {
                width: `${value}%`,
                duration: 1.5,
                ease: "power2.out",
                delay: delay,
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                }
            }
        );
    }, [value, delay]);

    return (
        <div ref={barRef} className="width-full">
            <div className="flex justify-between items-end mb-1">
                <span className="text-lenis-pink/80 font-mono text-sm tracking-wider uppercase">{label}</span>
                <span className="text-white/60 font-mono text-xs">{value}%</span>
            </div>
            <div className="h-2 w-full bg-lenis-pink/10 border border-lenis-pink/30 relative overflow-hidden">
                {/* Background Grid Pattern in bar */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_50%,rgba(0,240,255,1)_50%)] bg-[length:4px_100%]" />

                {/* Fill */}
                <div ref={fillRef} className="h-full bg-lenis-pink relative">
                    <div className="absolute top-0 right-0 w-1 h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                </div>
            </div>
        </div>
    );
}
