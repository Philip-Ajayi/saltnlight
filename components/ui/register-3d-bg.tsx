"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function RotatingCrystals() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.03;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[-3.5, 2, -2]} scale={1.2}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#460583"
            roughness={0.2}
            metalness={0.8}
            emissive="#c703e4"
            emissiveIntensity={0.35}
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.4}>
        <mesh position={[3.8, -1.5, -1]} scale={1.5}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#f5d061"
            roughness={0.15}
            metalness={0.9}
            emissive="#e2b842"
            emissiveIntensity={0.25}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[2.5, 3, -3]} scale={0.9}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#0c0418"
            roughness={0.1}
            metalness={0.95}
            emissive="#460583"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function Register3DBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 opacity-60">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 6, 4]} intensity={1.8} color="#f5d061" />
        <pointLight position={[-4, -3, 2]} intensity={8} color="#c703e4" />
        <Suspense fallback={null}>
          <RotatingCrystals />
          <Sparkles count={60} scale={[12, 12, 10]} size={1.2} speed={0.15} color="#f5d061" />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}