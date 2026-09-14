"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial, Sparkles, TorusKnot } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function MountainGeometry() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.045;
    const targetX = state.pointer.y * 0.04;
    const targetY = state.pointer.x * 0.08;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetX, 0.025);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetY * -0.15, 0.025);
  });
  return (
    <group ref={group} rotation={[0.12, 0, 0]}>
      <mesh scale={[2.4, 3.2, 1.5]} position={[0, -0.45, 0]}><coneGeometry args={[1, 2.4, 7, 4]} /><meshStandardMaterial color="#11051d" roughness={0.28} metalness={0.72} emissive="#26033f" emissiveIntensity={0.25} /></mesh>
      <mesh scale={[1.25, 1.65, 0.8]} position={[-1.35, -0.7, 0.55]} rotation={[0, 0, -0.25]}><coneGeometry args={[1, 2.1, 6, 3]} /><meshStandardMaterial color="#07020e" roughness={0.2} metalness={0.8} emissive="#18032a" emissiveIntensity={0.22} /></mesh>
      <mesh scale={[1.45, 1.9, 0.9]} position={[1.25, -0.6, -0.4]} rotation={[0, 0, 0.2]}><coneGeometry args={[1, 2, 7, 3]} /><meshStandardMaterial color="#0c0418" roughness={0.25} metalness={0.75} emissive="#32004f" emissiveIntensity={0.2} /></mesh>
      <mesh position={[0, 0.7, 0]} scale={0.72}><icosahedronGeometry args={[1, 1]} /><MeshTransmissionMaterial backside samples={2} resolution={256} thickness={0.5} roughness={0.25} transmission={0.35} ior={1.45} chromaticAberration={0.025} anisotropy={0.1} color="#460583" /></mesh>
      <Float speed={0.4} rotationIntensity={0.1} floatIntensity={0.12}><TorusKnot args={[0.9, 0.018, 96, 8, 2, 3]} position={[0, 0.35, -0.5]} rotation={[Math.PI / 2, 0, 0]}><meshBasicMaterial color="#f5d061" transparent opacity={0.42} /></TorusKnot></Float>
    </group>
  );
}
function Scene() {
  return <><ambientLight intensity={0.16} /><directionalLight position={[5, 5, 4]} intensity={2} color="#f5d061" /><pointLight position={[-4, 2, 2]} intensity={12} distance={10} color="#c703e4" /><pointLight position={[4, -2, -3]} intensity={8} distance={8} color="#460583" /><MountainGeometry /><Sparkles count={90} scale={[10, 6, 7]} size={1} speed={0.12} opacity={0.3} color="#f5d061" /><Environment preset="night" /></>;
}
export function HeroScene() {
  return <div className="absolute inset-0"><Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.2, 7], fov: 42, near: 0.1, far: 50 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}><Suspense fallback={null}><Scene /></Suspense></Canvas></div>;
}
