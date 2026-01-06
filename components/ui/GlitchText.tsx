'use client';

import { cn } from '@/lib/utils';

interface GlitchTextProps {
    text: string;
    className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
    return (
        <span className={cn("glitch-wrapper group glitch-active relative inline-block", className)}>
            <span className="relative z-10">{text}</span>
            <span
                className="glitch-mirror glitch-1 absolute inset-0 -z-10"
                aria-hidden="true"
            >
                {text}
            </span>
            <span
                className="glitch-mirror glitch-2 absolute inset-0 -z-10"
                aria-hidden="true"
            >
                {text}
            </span>
        </span>
    );
}
