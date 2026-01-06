'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export function Starfield() {
    const starsRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (starsRef.current) {
            starsRef.current.rotation.y -= delta * 0.05;
            starsRef.current.rotation.x -= delta * 0.02;
        }
    });

    return (
        <group ref={starsRef}>
            <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={200} size={4} scale={[20, 20, 20]} opacity={0.4} speed={0.5} color="#06b6d4" />
        </group>
    );
}
