'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ScrambleTextProps {
    text: string;
    startText?: string;
    className?: string;
    duration?: number;
    delay?: number;
    loop?: boolean;
    holdDuration?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function ScrambleText({
    text: endText,
    startText: initialStartText = "",
    className,
    duration = 3000,
    delay = 0,
    loop = false,
    holdDuration = 2000
}: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState(initialStartText || endText);
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);

    // Visibility detection via IntersectionObserver
    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    setIsVisible(entry.isIntersecting);
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        // Don't run animation if not visible or not mounted
        if (!mounted || !isVisible) return;

        let interval: ReturnType<typeof setInterval> | undefined;
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        let isForward = true;

        const runSequence = (delayTime: number) => {
            timeoutId = setTimeout(() => {
                const startTime = Date.now();

                const fromTxt = isForward ? (initialStartText || endText) : endText;
                const toTxt = isForward ? endText : (initialStartText || endText);

                // Increased interval from 50ms to 80ms for better CPU performance
                interval = setInterval(() => {
                    const now = Date.now();
                    const progress = Math.min((now - startTime) / duration, 1);

                    let result = "";

                    if (progress < 0.5) {
                        // Phase 1: degrade fromTxt
                        const phaseProgress = progress * 2; // 0 to 1
                        const keepCount = Math.floor(fromTxt.length * (1 - phaseProgress));
                        result = fromTxt.split('').map((c: string, i: number) => {
                            if (i < keepCount) return c;
                            if (c === ' ') return ' ';
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        }).join('');
                    } else {
                        // Phase 2: resolve toTxt
                        const phaseProgress = (progress - 0.5) * 2; // 0 to 1
                        const revealCount = Math.floor(toTxt.length * phaseProgress);

                        let reconstructed = "";
                        for (let i = 0; i < toTxt.length; i++) {
                            if (toTxt[i] === ' ') {
                                reconstructed += ' ';
                            } else if (i < revealCount) {
                                reconstructed += toTxt[i];
                            } else {
                                reconstructed += CHARS[Math.floor(Math.random() * CHARS.length)];
                            }
                        }
                        result = reconstructed;
                    }

                    setDisplayText(result);

                    if (progress >= 1) {
                        if (interval) clearInterval(interval);
                        if (loop && isVisible) {
                            isForward = !isForward;
                            runSequence(holdDuration);
                        }
                    }
                }, 80); // Increased from 50ms to 80ms

            }, delayTime);
        };

        runSequence(delay);

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
            if (interval) clearInterval(interval);
        };
    }, [endText, initialStartText, duration, delay, loop, holdDuration, mounted, isVisible]);

    // Render original text during SSR to match hydration, but scrambled once mounted
    if (!mounted) {
        return <span className={cn("inline-block", className)}>{initialStartText || endText}</span>;
    }

    return (
        <span ref={containerRef} className={cn("inline-block", className)}>
            {displayText}
        </span>
    );
}

