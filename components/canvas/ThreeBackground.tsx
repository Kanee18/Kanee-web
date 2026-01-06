import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { WaveLines } from './WaveLines';

export default function ThreeBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    <color attach="background" args={['#050505']} />

                    {/* Minimal Lighting (optional as lines are basic material) */}
                    <ambientLight intensity={0.5} />

                    <WaveLines />

                    {/* Removed OrbitControls for a static, elegant view like the reference */}
                </Suspense>
            </Canvas>
        </div>
    );
}
