'use client';

import { ReactNode, useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect mobile for disabling smooth scroll
        const checkMobile = () => {
            const mobileKeywords = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i;
            const isMobileUA = mobileKeywords.test(navigator.userAgent.toLowerCase());
            const isSmallScreen = window.innerWidth <= 768;
            const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            return (isMobileUA || isSmallScreen) && hasTouch;
        };

        setIsMobile(checkMobile());

        // Listen for resize
        const handleResize = () => setIsMobile(checkMobile());
        window.addEventListener('resize', handleResize, { passive: true });

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Skip Lenis on mobile for better touch performance
        if (isMobile) {
            // Just update ScrollTrigger on native scroll
            const handleScroll = () => ScrollTrigger.update();
            window.addEventListener('scroll', handleScroll, { passive: true });
            return () => window.removeEventListener('scroll', handleScroll);
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 1.5, // Optimize touch sensitivity
        });

        lenis.on('scroll', ScrollTrigger.update);

        // Define ticker function as named function for proper cleanup
        const tickerFn = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(tickerFn);
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(tickerFn);
        };
    }, [isMobile]);

    return <>{children}</>;
}

