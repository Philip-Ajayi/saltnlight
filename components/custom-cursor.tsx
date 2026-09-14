"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setVisible(true);
    const move = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  if (!visible) return null;
  return <div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[200] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 md:block" style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)` }} />;
}
