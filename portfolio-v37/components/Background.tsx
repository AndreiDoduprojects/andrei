'use client';

import { useEffect, useState } from 'react';

export default function Background() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  // Generate light dots only on client to avoid hydration mismatch
  const [lightDots] = useState(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3.5}s`,
    }))
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Smooth interpolation for cursor glow
  useEffect(() => {
    let animationFrameId: number;

    const updateCursorPos = () => {
      setCursorPos((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.1,
        y: prev.y + (targetPos.y - prev.y) * 0.1,
      }));
      animationFrameId = requestAnimationFrame(updateCursorPos);
    };

    animationFrameId = requestAnimationFrame(updateCursorPos);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetPos]);

  return (
    <div className="background-container">
      {/* Layer 2: Floating Gradient Orbs */}
      <div className="gradient-orb orb-blue" />
      <div className="gradient-orb orb-gold" />

      {/* Layer 4: Pulsing Blue Lights - Only render on client */}
      {isClient && lightDots.map((dot) => (
        <div
          key={dot.id}
          className="light-dot"
          style={{
            left: dot.left,
            top: dot.top,
            animationDelay: dot.animationDelay,
          }}
        />
      ))}

      {/* Layer 5: Interactive Cursor Glow */}
      <div
        className="cursor-glow"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
        }}
      />
    </div>
  );
}
