"use client";

import dynamic from "next/dynamic";

const Schedule3DScene = dynamic(
  () =>
    import("@/components/schedule/schedule-3d-scene").then(
      (mod) => mod.Schedule3DScene
    ),
  { ssr: false }
);

export function Schedule3DWrapper() {
  return <Schedule3DScene />;
}