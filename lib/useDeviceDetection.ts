'use client';

import { useState, useEffect } from 'react';

interface DeviceDetection {
    isMobile: boolean;
    isLowPowerDevice: boolean;
    prefersReducedMotion: boolean;
    isReady: boolean;
}

const defaultState: DeviceDetection = {
    isMobile: false,
    isLowPowerDevice: false,
    prefersReducedMotion: false,
    isReady: false,
};

export function useDeviceDetection(): DeviceDetection {
    const [state, setState] = useState<DeviceDetection>(defaultState);

    useEffect(() => {
        // Detect mobile via user agent and screen size
        const checkMobile = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            const mobileKeywords = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i;
            const isMobileUA = mobileKeywords.test(userAgent);

            // Also check screen size as backup
            const isSmallScreen = window.innerWidth <= 768;

            // Check for touch capability
            const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

            return (isMobileUA || isSmallScreen) && hasTouch;
        };

        // Detect low power device (rough heuristic)
        const checkLowPower = () => {
            // Check hardware concurrency (CPU cores)
            const cores = navigator.hardwareConcurrency || 4;
            const isLowCores = cores <= 4;

            // Check device memory if available
            const memory = (navigator as any).deviceMemory || 8;
            const isLowMemory = memory <= 4;

            // Check if it's a mobile device (usually lower power)
            const isMobile = checkMobile();

            return isMobile || (isLowCores && isLowMemory);
        };

        // Detect prefers-reduced-motion
        const checkReducedMotion = () => {
            return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        };

        setState({
            isMobile: checkMobile(),
            isLowPowerDevice: checkLowPower(),
            prefersReducedMotion: checkReducedMotion(),
            isReady: true,
        });

        // Listen for reduced motion changes
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handleMotionChange = (e: MediaQueryListEvent) => {
            setState(prev => ({ ...prev, prefersReducedMotion: e.matches }));
        };

        motionQuery.addEventListener('change', handleMotionChange);

        // Listen for resize (in case of orientation change)
        const handleResize = () => {
            setState(prev => ({
                ...prev,
                isMobile: checkMobile(),
                isLowPowerDevice: checkLowPower(),
            }));
        };

        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            motionQuery.removeEventListener('change', handleMotionChange);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return state;
}

// Hook for SSR-safe initial render (returns false until client-side detection)
export function useIsMobile(): boolean {
    const { isMobile, isReady } = useDeviceDetection();
    return isReady ? isMobile : false;
}

// Hook specifically for animation decisions
export function useShouldReduceAnimations(): boolean {
    const { isMobile, prefersReducedMotion, isReady } = useDeviceDetection();
    return isReady ? (isMobile || prefersReducedMotion) : false;
}
