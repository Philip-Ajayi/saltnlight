"use client";

import { useEffect, useRef } from "react";

export default function AmbientBackground() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    const handleMove = (event: MouseEvent) => {
      const x = `${(event.clientX / window.innerWidth) * 100}%`;
      const y = `${(event.clientY / window.innerHeight) * 100}%`;

      element.style.setProperty("--mouse-x", x);
      element.style.setProperty("--mouse-y", y);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" style={{ "--mouse-x": "50%", "--mouse-y": "20%" } as React.CSSProperties}>
      <div className="absolute left-[-15vw] top-[-15vw] h-[50vw] w-[50vw] rounded-full opacity-30 blur-[140px]" style={{ background: "radial-gradient(circle, rgba(45,43,127,.55), transparent 65%)" }} />
      <div className="absolute right-[-15vw] top-[20%] h-[45vw] w-[45vw] rounded-full opacity-20 blur-[140px]" style={{ background: "radial-gradient(circle, rgba(168,85,247,.35), transparent 65%)" }} />
      <div className="absolute h-[30vw] w-[30vw] rounded-full opacity-20 blur-[120px] transition-[left,top] duration-1000" style={{ left: "var(--mouse-x)", top: "var(--mouse-y)", background: "radial-gradient(circle, rgba(45,43,127,.25), transparent 65%)" }} />
    </div>
  );
}
