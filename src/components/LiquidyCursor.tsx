"use client";

import React, { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  maxAge: number;
  size: number;
  wiggleOffset: number;
}

export default function LiquidyCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, lastX: -1000, lastY: -1000, speed: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const m = mouseRef.current;
      m.x = e.clientX;
      m.y = e.clientY;

      if (m.lastX !== -1000) {
        const dx = m.x - m.lastX;
        const dy = m.y - m.lastY;
        m.speed = Math.sqrt(dx * dx + dy * dy);

        // Spawn trail points when mouse moves
        const steps = Math.min(6, Math.floor(m.speed / 3) + 1);
        for (let i = 0; i < steps; i++) {
          const t = i / steps;
          const interpX = m.lastX + dx * t;
          const interpY = m.lastY + dy * t;

          pointsRef.current.push({
            x: interpX,
            y: interpY,
            vx: (Math.random() - 0.5) * (m.speed * 0.01) + (Math.random() - 0.5) * 0.1,
            vy: (Math.random() - 0.5) * (m.speed * 0.01) + (Math.random() - 0.5) * 0.1,
            age: 0,
            maxAge: 12 + Math.random() * 6,
            size: 3 + Math.random() * 3, // organic smaller liquid size
            wiggleOffset: Math.random() * Math.PI * 2,
          });
        }
      } else {
        m.lastX = m.x;
        m.lastY = m.y;
      }

      m.lastX = m.x;
      m.lastY = m.y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const render = (time: number) => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Determine track color based on theme class
      const isDark = document.documentElement.classList.contains("dark");
      const color = isDark ? "255, 255, 255" : "28, 28, 26";

      const timeSec = time / 1000;
      let pts = pointsRef.current;

      // Update points physics
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.age++;
        // Liquidy drift: add drag and slight gravity/float wiggling
        p.x += p.vx + Math.sin(timeSec * 10 + p.wiggleOffset) * 0.1;
        p.y += p.vy + Math.cos(timeSec * 10 + p.wiggleOffset) * 0.1;
        p.vx *= 0.93; // friction
        p.vy *= 0.93;
        p.size *= 0.95; // shrink over time
      }

      // Filter out old points
      pointsRef.current = pts.filter((p) => p.age < p.maxAge && p.size > 0.5);
      pts = pointsRef.current;

      if (pts.length > 1) {
        // Draw the quirky "sketchy" ink trail
        // Draw multiple passes with small random offsets (shaky hand-drawn ink look)
        const passes = 3;
        for (let pass = 0; pass < passes; pass++) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${color}, ${0.15 - pass * 0.03})`;
          ctx.lineWidth = pass === 0 ? 3 : 1;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          // Calculate offset for this sketchy pass
          const ox = (Math.random() - 0.5) * 1;
          const oy = (Math.random() - 0.5) * 1;

          ctx.moveTo(pts[0].x + ox, pts[0].y + oy);
          for (let i = 1; i < pts.length - 1; i++) {
            const xc = (pts[i].x + pts[i + 1].x) / 2;
            const yc = (pts[i].y + pts[i + 1].y) / 2;
            ctx.quadraticCurveTo(
              pts[i].x + ox + Math.sin(i * 1.5 + timeSec * 12) * 0.15,
              pts[i].y + oy + Math.cos(i * 1.5 + timeSec * 12) * 0.15,
              xc + ox,
              yc + oy
            );
          }
          ctx.stroke();
        }

        // Draw liquidy blobs/splatters at connection nodes
        for (let i = 0; i < pts.length; i += 2) {
          const p = pts[i];
          const opacity = (1 - p.age / p.maxAge) * 0.35;
          ctx.fillStyle = `rgba(${color}, ${opacity})`;

          // Draw wobbly liquid blob
          ctx.beginPath();
          const wobble = 1 + Math.sin(timeSec * 14 + p.wiggleOffset) * 0.15;
          ctx.arc(p.x, p.y, p.size * wobble, 0, Math.PI * 2);
          ctx.fill();

          // Draw quirky sketchy outer rings
          ctx.strokeStyle = `rgba(${color}, ${opacity * 0.4})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(
            p.x + (Math.random() - 0.5) * 1.5,
            p.y + (Math.random() - 0.5) * 1.5,
            p.size * wobble * 1.1 + (Math.random() - 0.5) * 1,
            0,
            Math.PI * 2
          );
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[99999] bg-transparent"
    />
  );
}
