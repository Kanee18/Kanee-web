'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export function Planet() {
    const planetRef = useRef<THREE.Mesh>(null);
    const atmosphereRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const { clock } = state;
        if (planetRef.current) {
            planetRef.current.rotation.y = clock.getElapsedTime() * 0.1;
        }
        if (atmosphereRef.current) {
            // Pulse effect or separate rotation
            atmosphereRef.current.rotation.y = clock.getElapsedTime() * 0.12;
            atmosphereRef.current.rotation.z = clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <group position={[0, 0, 0]}>
            {/* Core Planet */}
            <Sphere ref={planetRef} args={[2.5, 64, 64]}>
                <MeshDistortMaterial
                    color="#000000"
                    emissive="#06b6d4"
                    emissiveIntensity={0.2}
                    roughness={0.6}
                    metalness={0.8}
                    distort={0.3}
                    speed={1.5}
                />
            </Sphere>

            {/* Atmosphere Glow */}
            <Sphere ref={atmosphereRef} args={[2.8, 64, 64]}>
                <meshBasicMaterial
                    color="#3b82f6"
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </Sphere>

            {/* Outer Glow Ring */}
            <Sphere args={[3.2, 64, 64]}>
                <meshBasicMaterial
                    color="#06b6d4"
                    transparent
                    opacity={0.05}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </Sphere>
        </group>
    );
}
