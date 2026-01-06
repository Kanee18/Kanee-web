'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Color } from 'three';
import { useTexture } from '@react-three/drei';

// --- SHADERS ---

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform sampler2D uTexture;
uniform vec3 uColor;

varying vec2 vUv;

// Random noise function
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 uv = vUv;

    // Glitch effect: periodically offset horizontal slices
    float glitchTrigger = sin(uTime * 5.0) + sin(uTime * 2.0); // Irregular timing
    if (glitchTrigger > 1.5) {
         float slice = floor(uv.y * 10.0);
         if (mod(slice, 2.0) == 0.0) {
             uv.x += 0.02 * sin(uTime * 20.0);
         }
    }

    // Pixelation / Grid effect
    float pixels = 100.0;
    vec2 pixelUv = floor(uv * pixels) / pixels;
    
    // Sample texture with pixelated UVs
    vec4 texColor = texture2D(uTexture, pixelUv);
    
    // Convert to grayscale for tinting
    float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    
    // Apply Hologram Tint (Blue/Cyan)
    vec3 hologramColor = uColor * gray * 1.5; // Boost brightness
    
    // Scanlines
    float scanline = sin(uv.y * 200.0 + uTime * 5.0) * 0.1;
    hologramColor -= scanline;
    
    // Interference / Noise
    float noise = random(uv * uTime) * 0.1;
    hologramColor += noise;
    
    // Vignette / Edge glow fade
    // Relaxed vignette so image fills more space
    float dist = distance(uv, vec2(0.5));
    float vignette = smoothstep(0.8, 0.45, dist); 
    
    // Alpha for transparency
    float alpha = texColor.a * vignette;
    
    // Drop alpha if very dark (cutout effect if image has black bg)
    if (gray < 0.1) alpha *= 0.5;

    gl_FragColor = vec4(hologramColor, alpha);
}
`;

function HologramPlane() {
    const meshRef = useRef<any>(null);
    const texture = useTexture('/assets/profile.png');

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uTexture: { value: texture },
            uColor: { value: new Color('#00f0ff') }, // Cyan neon
        }),
        [texture]
    );

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <planeGeometry args={[4, 4]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
            />
        </mesh>
    );
}

export function HologramProfile() {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
                {/* <OrbitControls enableZoom={false} /> */}
                <HologramPlane />
            </Canvas>
        </div>
    );
}
