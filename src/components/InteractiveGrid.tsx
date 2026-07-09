"use client";

import React, { useEffect, useRef } from "react";

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const gridSpacing = 48; // Spacing spacing
    const radius = 220; // Soft circular radius

    // Handle screen resize using bounding client rects
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resizeCanvas();

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    } else {
      resizeObserver.observe(canvas);
    }

    // Track mouse coordinates
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Render loop
    const render = (time: number) => {
      const width = canvas.width;
      const height = canvas.height;
      const timeSec = time / 1000;

      // Smooth mouse interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Determine colors based on dark mode status
      const isDark = document.documentElement.classList.contains("dark");
      const baseColor = isDark ? "255, 255, 255" : "0, 0, 0";

      // Subtle parallax shift (2px max shift relative to screen center)
      const centerX = width / 2;
      const centerY = height / 2;
      const parallaxX = -(mouse.x - centerX) * 0.002;
      const parallaxY = -(mouse.y - centerY) * 0.002;

      const offsetX = parallaxX;
      const offsetY = parallaxY;

      // 1. Draw base grid lines - extremely faint (0.5% - 0.8% opacity)
      ctx.strokeStyle = `rgba(${baseColor}, 0.006)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = (offsetX % gridSpacing); x < width; x += gridSpacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = (offsetY % gridSpacing); y < height; y += gridSpacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Draw flashlight-illuminated grid line segments
      // We only compute and overlay highlight segments for lines inside the radius
      const startCol = Math.floor((mouse.x - radius - offsetX) / gridSpacing);
      const endCol = Math.ceil((mouse.x + radius - offsetX) / gridSpacing);
      const startRow = Math.floor((mouse.y - radius - offsetY) / gridSpacing);
      const endRow = Math.ceil((mouse.y + radius - offsetY) / gridSpacing);

      for (let col = startCol; col <= endCol; col++) {
        for (let row = startRow; row <= endRow; row++) {
          const x = col * gridSpacing + offsetX;
          const y = row * gridSpacing + offsetY;

          // Draw horizontal connection to the right neighbor
          const rightX = x + gridSpacing;
          if (rightX < width) {
            // Find distance of segment midpoint to cursor
            const midX = x + gridSpacing / 2;
            const dx = midX - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < radius) {
              const factor = (radius - dist) / radius;
              const glowOpacity = Math.pow(factor, 3) * 0.022; // very subtle increase
              ctx.strokeStyle = `rgba(${baseColor}, ${0.006 + glowOpacity})`;
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(rightX, y);
              ctx.stroke();
            }
          }

          // Draw vertical connection to the bottom neighbor
          const downY = y + gridSpacing;
          if (downY < height) {
            // Find distance of segment midpoint to cursor
            const midY = y + gridSpacing / 2;
            const dx = x - mouse.x;
            const dy = midY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < radius) {
              const factor = (radius - dist) / radius;
              const glowOpacity = Math.pow(factor, 3) * 0.022;
              ctx.strokeStyle = `rgba(${baseColor}, ${0.006 + glowOpacity})`;
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(x, downY);
              ctx.stroke();
            }
          }
        }
      }

      // 3. Draw nodes (dots at intersections)
      // Nodes are also drawn with base state and flashlight glow
      const startVisibleCol = Math.floor(-offsetX / gridSpacing);
      const endVisibleCol = Math.ceil((width - offsetX) / gridSpacing);
      const startVisibleRow = Math.floor(-offsetY / gridSpacing);
      const endVisibleRow = Math.ceil((height - offsetY) / gridSpacing);

      for (let col = startVisibleCol; col <= endVisibleCol; col++) {
        for (let row = startVisibleRow; row <= endVisibleRow; row++) {
          const x = col * gridSpacing + offsetX;
          const y = row * gridSpacing + offsetY;

          // Distance of node to cursor
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Base node properties
          let size = 1.0;
          let opacity = isDark ? 0.012 : 0.008; // extremely faint default

          // Subtle individual breathing offset
          const breathePhase = col * 7.7 + row * 11.3;
          const breathe = Math.sin(timeSec * 0.5 + breathePhase) * 0.003;
          opacity += breathe;

          let factor = 0;
          if (dist < radius) {
            factor = (radius - dist) / radius;
            const glowOpacity = Math.pow(factor, 3) * 0.12; // soft bloom opacity increase
            opacity += glowOpacity;
            size += Math.pow(factor, 3) * 0.6; // scale slightly up to 1.6px
          }

          // Draw the intersection node
          ctx.fillStyle = `rgba(${baseColor}, ${opacity})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();

          // Soft radial bloom under the cursor
          if (factor > 0.15) {
            const bloomRadius = size * 3.5 * factor;
            const bloomGrad = ctx.createRadialGradient(x, y, 0, x, y, bloomRadius);
            bloomGrad.addColorStop(0, `rgba(${baseColor}, ${factor * 0.07})`);
            bloomGrad.addColorStop(1, `rgba(${baseColor}, 0)`);
            ctx.fillStyle = bloomGrad;
            ctx.beginPath();
            ctx.arc(x, y, bloomRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-1 bg-transparent border-none outline-none shadow-none"
    />
  );
}
