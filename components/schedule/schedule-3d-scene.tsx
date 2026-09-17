"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function TimeRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      state.pointer.y * 0.1,
      0.03
    );
  });

  return (
    <group ref={groupRef}>
      {/* Outer Golden Chrono Ring */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.2, 0.015, 32, 120]} />
        <meshStandardMaterial
          color="#f5d061"
          metalness={0.9}
          roughness={0.1}
          emissive="#e2b842"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Inner Electric Violet Ring */}
      <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[2.5, 0.012, 32, 100]} />
        <meshStandardMaterial
          color="#c703e4"
          metalness={0.8}
          roughness={0.2}
          emissive="#460583"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Floating Center Crystal Construct */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh scale={0.85}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#0c0418"
            metalness={0.9}
            roughness={0.15}
            emissive="#11051d"
            wireframe
          />
        </mesh>
      </Float>
    </group>
  );
}

export function Schedule3DScene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} color="#f5d061" intensity={8} />
          <pointLight position={[-5, -5, -3]} color="#c703e4" intensity={10} />
          <TimeRings />
          <Sparkles
            count={60}
            scale={[8, 8, 8]}
            size={1.2}
            speed={0.2}
            opacity={0.35}
            color="#f5d061"
          />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}