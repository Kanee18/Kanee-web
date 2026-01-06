'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { WaveLines } from './WaveLines';
import { useDeviceDetection } from '@/lib/useDeviceDetection';

export default function ThreeBackground() {
    const { isMobile, prefersReducedMotion, isReady } = useDeviceDetection();

    // Skip rendering on mobile or if user prefers reduced motion
    // Also skip during SSR (isReady = false)
    if (!isReady || isMobile || prefersReducedMotion) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{
                    antialias: false, // Disable AA for performance
                    alpha: true,
                    powerPreference: 'high-performance',
                    stencil: false,
                    depth: false,
                }}
                dpr={[1, 1.5]} // Cap pixel ratio
                frameloop="always"
            >
                <Suspense fallback={null}>
                    <color attach="background" args={['#050505']} />

                    {/* Minimal Lighting (optional as lines are basic material) */}
                    <ambientLight intensity={0.5} />

                    <WaveLines />
                </Suspense>
            </Canvas>
        </div>
    );
}
