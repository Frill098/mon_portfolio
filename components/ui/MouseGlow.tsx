"use client";

import { useEffect, useState } from "react";

export function MouseGlow() {
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    // Detect dark mode via the class on <html> set by next-themes
    const getDark = () => document.documentElement.classList.contains("dark");

    const buildBackground = (x: number, y: number) => {
      const dark = getDark();
      return dark
        ? `radial-gradient(600px at ${x}px ${y}px, rgba(139, 92, 246, 0.08), transparent 80%)`
        : `radial-gradient(500px at ${x}px ${y}px, rgba(167, 139, 250, 0.06), transparent 80%)`;
    };

    const onMouseMove = (e: MouseEvent) => {
      setStyle({
        background: buildBackground(e.clientX, e.clientY),
        transition: "background 0.1s ease",
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={style}
    />
  );
}
