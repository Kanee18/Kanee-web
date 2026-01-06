'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function WaveLine({ z, color, speed, offset }: { z: number; color: string; speed: number; offset: number }) {
    const lineRef = useRef<THREE.Line>(null);

    // Number of points per line
    const count = 100;
    const width = 20;

    // Create initial geometry
    const geometry = useMemo(() => {
        const points = [];
        for (let i = 0; i < count; i++) {
            const x = (i / count) * width - (width / 2);
            points.push(new THREE.Vector3(x, 0, 0));
        }
        return new THREE.BufferGeometry().setFromPoints(points);
    }, []);

    useFrame((state) => {
        if (lineRef.current) {
            const positions = lineRef.current.geometry.attributes.position.array as Float32Array;
            const time = state.clock.getElapsedTime() * speed + offset;

            for (let i = 0; i < count; i++) {
                const x = (i / count) * width - (width / 2);
                // Wave math: sin wave that moves over time
                const y = Math.sin(x * 0.5 + time) * 0.5 + Math.sin(x * 1.5 + time * 0.5) * 0.2;

                // Update Y position (index * 3 + 1 is the y coordinate)
                positions[i * 3 + 1] = y;
            }
            lineRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        // @ts-ignore
        <line ref={lineRef as any} geometry={geometry} position={[0, -2, z]} rotation={[Math.PI / 8, 0, 0]}>
            <lineBasicMaterial color={color} transparent opacity={0.2} linewidth={1} />
        </line>
    );
}

export function WaveLines() {
    const lines = useMemo(() => {
        const l = [];
        const colors = ['#ffffff', '#a1a1aa', '#71717a']; // Greyscale / White
        for (let i = 0; i < 15; i++) {
            l.push({
                z: -5 + (i * 0.5),
                color: colors[i % colors.length],
                speed: 0.2 + (Math.random() * 0.1),
                offset: i * 0.5
            });
        }
        return l;
    }, []);

    return (
        <group rotation={[0, 0, Math.PI / 12]}> {/* Slight tilt */}
            {lines.map((props, i) => (
                <WaveLine key={i} {...props} />
            ))}
        </group>
    );
}
