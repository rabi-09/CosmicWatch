import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

const StarField = (props) => {
    const ref = useRef();

    // Generating random points properly
    const sphere = useMemo(() => {
        const temp = new Float32Array(8000 * 3);
        for (let i = 0; i < 8000; i++) {
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 1.2 + Math.random() * 0.8;

            const x = (Math.random() - 0.5) * 2;
            const y = (Math.random() - 0.5) * 2;
            const z = (Math.random() - 0.5) * 2;
            // Normalize and scale
            const d = Math.sqrt(x * x + y * y + z * z);
            temp[i * 3] = (x / d) * (15 + Math.random() * 20); // Spread out more
            temp[i * 3 + 1] = (y / d) * (15 + Math.random() * 20);
            temp[i * 3 + 2] = (z / d) * (15 + Math.random() * 20);
        }
        return temp;
    }, []);

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 15;
        ref.current.rotation.y -= delta / 20;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.06}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const BackgroundStars = () => {
    return (
        <div className="fixed inset-0 z-0 w-full h-full pointer-events-none mix-blend-screen opacity-100">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <StarField />
            </Canvas>
        </div>
    );
};

export default BackgroundStars;
