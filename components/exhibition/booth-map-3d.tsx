"use client";

import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { BOOTHS, type Booth } from "@/lib/exhibition-data";

interface Booth3DProps {
  booth: Booth;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (booth: Booth) => void;
  onHover: (booth: Booth | null) => void;
}

function BoothBox({ booth, isSelected, isHovered, onSelect, onHover }: Booth3DProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Dimensions based on tier
  const width = booth.tier === "Anchor" ? 3.6 : booth.tier === "Premium" ? 2.8 : 1.8;
  const depth = booth.tier === "Anchor" ? 3.6 : booth.tier === "Premium" ? 2.0 : 1.8;
  const height = booth.tier === "Anchor" ? 2.2 : booth.tier === "Premium" ? 1.8 : 1.4;

  // Determine accent color
  let statusColor = "#3f3f46"; // default zinc
  if (booth.status === "available") statusColor = "#f5d061"; // Gold
  if (booth.status === "reserved") statusColor = "#a855f7"; // Purple
  if (booth.status === "occupied") statusColor = "#3b82f6"; // Blue
  if (isSelected) statusColor = "#c703e4"; // Electric Violet

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetScaleY = isHovered || isSelected ? 1.08 : 1.0;
    meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScaleY, delta * 8);
  });

  return (
    <group position={booth.position}>
      {/* Booth Base / Platform */}
      <mesh
        ref={meshRef}
        position={[0, height / 2, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(booth);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(booth);
        }}
        onPointerOut={() => onHover(null)}
      >
        <boxGeometry args={[width, height, depth]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          resolution={128}
          thickness={0.4}
          roughness={booth.status === "available" ? 0.2 : 0.6}
          transmission={0.45}
          ior={1.2}
          color={statusColor}
        />
      </mesh>

      {/* Outer Glowing Wireframe Accent */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width + 0.05, height + 0.05, depth + 0.05]} />
        <meshBasicMaterial
          color={isSelected ? "#c703e4" : isHovered ? "#f5d061" : statusColor}
          wireframe
          transparent
          opacity={isSelected ? 0.9 : isHovered ? 0.6 : 0.2}
        />
      </mesh>

      {/* Floating 3D Label Code */}
      <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
        <Text
          position={[0, height + 0.5, 0]}
          fontSize={0.45}
          color={isSelected ? "#ffffff" : isHovered ? "#f5d061" : "#a1a1aa"}
          font="/fonts/syne-bold.woff" // Graceful fallback to default three.js font if missing
          anchorX="center"
          anchorY="middle"
        >
          {booth.code}
        </Text>
      </Float>
    </group>
  );
}

function FloorGrid() {
  return (
    <group position={[0, -0.01, 0]}>
      <gridHelper args={[24, 24, "#460583", "#11051d"]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#050308" roughness={0.9} />
      </mesh>
    </group>
  );
}

interface BoothMap3DProps {
  selectedBooth: Booth | null;
  onSelectBooth: (booth: Booth) => void;
}

export function BoothMap3D({ selectedBooth, onSelectBooth }: BoothMap3DProps) {
  const [hoveredBooth, setHoveredBooth] = useState<Booth | null>(null);

  return (
    <div className="relative h-[580px] w-full overflow-hidden border border-white/[.08] bg-[#050308]">
      {/* Interactive Controls Overlay */}
      <div className="pointer-events-none absolute left-5 top-5 z-10 flex flex-col gap-2">
        <span className="eyebrow text-[#f5d061]">3D Interactive Floorplan</span>
        <p className="text-xs text-zinc-400">Click a booth to inspect availability and specifications.</p>
      </div>

      {/* Legend */}
      <div className="absolute bottom-5 left-5 z-10 flex flex-wrap items-center gap-4 border border-white/10 bg-[#07020e]/80 p-3 backdrop-blur-md text-[11px] uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#f5d061]" />
          <span className="text-zinc-300">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#a855f7]" />
          <span className="text-zinc-300">Reserved</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#3b82f6]" />
          <span className="text-zinc-300">Occupied</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#c703e4]" />
          <span className="text-zinc-300">Selected</span>
        </div>
      </div>

      {/* Active Hover / Inspection Tooltip */}
      {hoveredBooth && (
        <div className="pointer-events-none absolute right-5 top-5 z-20 max-w-xs border border-[#c703e4]/40 bg-[#07020e]/95 p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-bold text-white">{hoveredBooth.code}</span>
            <span className="text-[10px] uppercase font-semibold text-[#f5d061]">{hoveredBooth.tier}</span>
          </div>
          <p className="mt-1 text-xs text-zinc-400">{hoveredBooth.description}</p>
          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2 text-xs">
            <span className="text-zinc-500">Price:</span>
            <span className="font-bold text-[#f5d061]">{hoveredBooth.price}</span>
          </div>
        </div>
      )}

      <Canvas camera={{ position: [0, 9, 12], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 15, 10]} intensity={1.8} color="#f5d061" />
        <pointLight position={[-10, 8, -10]} intensity={12} color="#c703e4" />
        
        <Suspense fallback={null}>
          <FloorGrid />
          {BOOTHS.map((booth) => (
            <BoothBox
              key={booth.id}
              booth={booth}
              isSelected={selectedBooth?.id === booth.id}
              isHovered={hoveredBooth?.id === booth.id}
              onSelect={onSelectBooth}
              onHover={setHoveredBooth}
            />
          ))}
        </Suspense>

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.5}
          maxDistance={20}
          minDistance={6}
        />
      </Canvas>
    </div>
  );
}