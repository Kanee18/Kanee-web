'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Color, AdditiveBlending } from 'three';
import { PerspectiveCamera } from '@react-three/drei';
import { useDeviceDetection } from '@/lib/useDeviceDetection';

// --- SHADERS ---

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uColor;
uniform vec3 uBgColor;

varying vec2 vUv;

// Simplex 2D noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
    // Generate noise based largely on UV coordinates but moving with time
    float noiseVal = snoise(vUv * 6.0 + uTime * 0.1);
    
    // Create "isolines" / contour lines
    // We take the fractional part of the noise value scaled up
    float lines = fract(noiseVal * 10.0);
    
    // Sharpen the lines to make them thin
    // Using smoothstep for anti-aliased look but very sharp pulse
    float lineIntensity = smoothstep(0.9, 0.95, lines);
    
    // Fade out edges for a vignette / radar feel
    float dist = distance(vUv, vec2(0.5));
    float alpha = (1.0 - smoothstep(0.3, 0.5, dist)) * 0.8;

    vec3 finalColor = mix(uBgColor, uColor, lineIntensity);
    
    // Add a scanning radar line effect (rotating)
    float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
    float scan = smoothstep(0.0, 0.1, fract((angle / 6.28) - uTime * 0.2));
    
    // Combine
    float combinedAlpha = (lineIntensity + (scan * 0.1)) * alpha;
    
    gl_FragColor = vec4(finalColor, combinedAlpha);
}
`;

function TerrainPlane() {
    const meshRef = useRef<any>(null);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uColor: { value: new Color('#00f0ff') }, // Cyan neon
            uBgColor: { value: new Color('#000000') },
        }),
        []
    );

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[20, 20]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                blending={AdditiveBlending}
            />
        </mesh>
    );
}

// Simple concentric circles for the radar HUD look
function RadarRings() {
    return (
        <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]}>
            {[2, 4, 6, 8].map((radius, i) => (
                <mesh key={i}>
                    <ringGeometry args={[radius, radius + 0.02, 64]} />
                    <meshBasicMaterial color="#00f0ff" opacity={0.1 - i * 0.02} transparent side={2} />
                </mesh>
            ))}
            {/* Crosshairs */}
            <mesh rotation={[0, 0, 0]}>
                <planeGeometry args={[16, 0.02]} />
                <meshBasicMaterial color="#00f0ff" opacity={0.05} transparent />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <planeGeometry args={[16, 0.02]} />
                <meshBasicMaterial color="#00f0ff" opacity={0.05} transparent />
            </mesh>
        </group>
    );
}

// CSS fallback for mobile - simulates radar effect without WebGL
function RadarFallback() {
    return (
        <div className="absolute inset-0 w-full h-full opacity-40">
            {/* Radial gradient background */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at center, rgba(0,240,255,0.15) 0%, transparent 50%)',
                }}
            />
            {/* Concentric circles */}
            <div className="absolute inset-0 flex items-center justify-center">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="absolute rounded-full border border-cyan-500/10"
                        style={{
                            width: `${i * 25}%`,
                            height: `${i * 25}%`,
                        }}
                    />
                ))}
                {/* Crosshairs */}
                <div className="absolute w-full h-px bg-cyan-500/5" />
                <div className="absolute w-px h-full bg-cyan-500/5" />
            </div>
        </div>
    );
}

export function HolographicRadar() {
    const { isMobile, prefersReducedMotion, isReady } = useDeviceDetection();

    // Show CSS fallback on mobile or reduced motion
    if (isReady && (isMobile || prefersReducedMotion)) {
        return <RadarFallback />;
    }

    // During SSR, show nothing
    if (!isReady) {
        return null;
    }

    return (
        <div className="absolute inset-0 w-full h-full opacity-60">
            <Canvas
                camera={{ position: [0, 5, 8], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{
                    powerPreference: 'high-performance',
                    antialias: false,
                    stencil: false,
                }}
            >
                <PerspectiveCamera makeDefault position={[0, 4, 6]} fov={50} />

                <TerrainPlane />
                <RadarRings />
            </Canvas>
        </div>
    );
}

