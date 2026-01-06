'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '@/components/providers/LoadingProvider';

export default function Preloader() {
    const { isLoading, setIsLoading } = useLoading();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsLoading(false), 500); // Trigger transition
                    return 100;
                }
                return prev + Math.random() * 10;
            });
        }, 100);

        return () => clearInterval(timer);
    }, [setIsLoading]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black"
                >
                    {/* Progress Bar */}
                    <div className="absolute bottom-20 w-64 h-1 bg-gray-900 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-lenis-pink shadow-[0_0_10px_#ffafb6]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="absolute bottom-12 mt-2 text-lenis-pink/50 font-mono text-xs tracking-[0.2em]">
                        SYSTEM INITIALIZED... {Math.round(progress)}%
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
