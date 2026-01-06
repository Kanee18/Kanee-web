'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function ElectronOrbit({ radius, speed, color, offset, rotation }: { radius: number, speed: number, color: string, offset: number, rotation: [number, number, number] }) {
    const electronRef = useRef<THREE.Mesh>(null);
    const trailRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (electronRef.current) {
            const time = state.clock.getElapsedTime() * speed + offset;
            electronRef.current.position.x = Math.cos(time) * radius;
            electronRef.current.position.z = Math.sin(time) * radius;
        }
    });

    // Calculate orbit points for the visual line
    const points = useMemo(() => {
        const pts = [];
        for (let i = 0; i <= 64; i++) {
            const angle = (i / 64) * Math.PI * 2;
            pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
        }
        return pts;
    }, [radius]);

    return (
        <group rotation={rotation}>
            {/* Orbit Path */}
            <Line points={points} color={color} opacity={0.3} transparent lineWidth={1} />

            {/* Electron Particle */}
            <Sphere ref={electronRef} args={[0.08, 16, 16]}>
                <meshBasicMaterial color={color} toneMapped={false} />
                <pointLight intensity={1.5} distance={3} color={color} />
            </Sphere>
        </group>
    );
}

export function SciFiScene() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Slow overall rotation for the whole atom
            groupRef.current.rotation.y += delta * 0.1;
            groupRef.current.rotation.z += delta * 0.05;
        }
    });

    return (
        <group ref={groupRef} scale={[1.5, 1.5, 1.5]}>
            {/* Nucleus - Glowing Core */}
            <Sphere args={[0.6, 32, 32]}>
                <meshStandardMaterial
                    color="#ffafb6"
                    emissive="#ffafb6"
                    emissiveIntensity={3}
                    toneMapped={false}
                    roughness={0}
                    metalness={1}
                />
                <pointLight intensity={4} distance={5} color="#ffafb6" decay={2} />
            </Sphere>

            {/* Inner fast orbit */}
            <ElectronOrbit radius={2} speed={1.5} color="#ff8fab" offset={0} rotation={[Math.PI / 3, Math.PI / 4, 0]} />

            {/* Middle orbit */}
            <ElectronOrbit radius={2} speed={1.2} color="#ffafb6" offset={2} rotation={[-Math.PI / 3, 0, Math.PI / 6]} />

            {/* Outer orbit */}
            <ElectronOrbit radius={2} speed={1.8} color="#ffffff" offset={4} rotation={[0, Math.PI / 2, Math.PI / 3]} />

            {/* Extra orbit for complexity */}
            <ElectronOrbit radius={2} speed={1.4} color="#fb7185" offset={1} rotation={[Math.PI / 2, 0, 0]} />
        </group>
    )
}
