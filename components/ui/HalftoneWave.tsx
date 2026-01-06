'use client';

import { motion } from 'framer-motion';

export default function HalftoneWave() {
    return (
        <div
            className="fixed top-0 left-0 w-[40vw] h-[50vh] z-0 pointer-events-none mix-blend-screen select-none"
            style={{
                maskImage: 'radial-gradient(ellipse at top left, black 0%, black 20%, transparent 60%)',
                WebkitMaskImage: 'radial-gradient(ellipse at top left, black 0%, black 20%, transparent 60%)',
            }}
        >
            <motion.div
                className="w-full h-full opacity-70"
                style={{
                    backgroundImage: 'radial-gradient(circle, #ffafb6 2px, transparent 2.5px)',
                    backgroundSize: '24px 24px',
                }}
                animate={{
                    y: [0, -24],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Wave Distortion Overlay */}
            <motion.div
                className="absolute inset-0 z-10 bg-black mix-blend-multiply"
                style={{
                    maskImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'wave\' width=\'100\' height=\'100\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M0 50 Q 25 25, 50 50 T 100 50\' fill=\'none\' stroke=\'white\' stroke-width=\'50\' opacity=\'0.5\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23wave)\'/%3E%3C/svg%3E")',
                    WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'wave\' width=\'100\' height=\'100\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M0 50 Q 25 25, 50 50 T 100 50\' fill=\'none\' stroke=\'white\' stroke-width=\'50\' opacity=\'0.5\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23wave)\'/%3E%3C/svg%3E")',
                }}
                animate={{
                    maskPosition: ['0px 0px', '200px 0px'],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </div>
    );
}
