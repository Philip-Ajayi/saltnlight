"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function BeaconCrystal() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.15;
      ringRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        {/* Central Refractive Prism */}
        <mesh ref={meshRef} scale={1.8}>
          <octahedronGeometry args={[1, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            resolution={256}
            thickness={0.8}
            roughness={0.15}
            transmission={0.85}
            ior={1.6}
            chromaticAberration={0.08}
            anisotropy={0.2}
            color="#f5d061"
          />
        </mesh>

        {/* Orbital Halo */}
        <group ref={ringRef}>
          <mesh rotation={[Math.PI / 3, 0, 0]}>
            <torusGeometry args={[2.2, 0.015, 16, 100]} />
            <meshBasicMaterial color="#c703e4" transparent opacity={0.5} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
            <torusGeometry args={[2.6, 0.01, 16, 100]} />
            <meshBasicMaterial color="#f5d061" transparent opacity={0.35} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[4, 6, 4]} intensity={2.5} color="#f5d061" />
      <pointLight position={[-4, -3, 2]} intensity={15} distance={10} color="#c703e4" />
      <pointLight position={[3, 4, -2]} intensity={10} distance={10} color="#460583" />
      <BeaconCrystal />
      <Sparkles count={60} scale={[8, 8, 8]} size={1.5} speed={0.2} opacity={0.4} color="#f5d061" />
    </>
  );
}

export function ContactHeroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}