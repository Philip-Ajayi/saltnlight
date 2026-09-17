"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function FloatingVoicesGeometry() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.05;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      state.pointer.y * 0.1,
      0.03
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      state.pointer.x * 0.05,
      0.03
    );
  });

  return (
    <group ref={groupRef}>
      {/* Central Prism Ring */}
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[0, 0, 0]} rotation={[0.4, 0.2, 0]}>
          <octahedronGeometry args={[1.8, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            resolution={512}
            thickness={0.6}
            roughness={0.15}
            transmission={0.45}
            ior={1.5}
            chromaticAberration={0.04}
            color="#c703e4"
          />
        </mesh>
      </Float>

      {/* Orbiting Gold Polyhedrons */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={0.8}>
        <mesh position={[-2.8, 1.2, -1]} scale={0.55}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#f5d061"
            metalness={0.9}
            roughness={0.15}
            emissive="#e2b842"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.5}>
        <mesh position={[2.6, -1.1, -0.5]} scale={0.65}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#460583"
            metalness={0.85}
            roughness={0.2}
            emissive="#460583"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function VoicesHeroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[4, 5, 3]} intensity={2.5} color="#f5d061" />
          <pointLight position={[-4, -3, -2]} intensity={8} color="#c703e4" />
          <FloatingVoicesGeometry />
          <Sparkles count={60} scale={[8, 6, 6]} size={1.2} speed={0.15} opacity={0.35} color="#f5d061" />
        </Suspense>
      </Canvas>
    </div>
  );
}