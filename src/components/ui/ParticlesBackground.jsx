


import React, { useEffect, useRef } from 'react';

export default function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const colors = [
      'rgba(6, 182, 212, ',
      'rgba(139, 92, 246, ',
      'rgba(16, 185, 129, ',
    ];

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const resizeCanvas = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const particleCount = Math.min(
      Math.max(Math.floor(window.innerWidth / 25), 30),
      60
    );

    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,

        radius: Math.random() * 1.5 + 0.8,

        colorPrefix:
          colors[Math.floor(Math.random() * colors.length)],

        alpha: Math.random() * 0.35 + 0.1,

        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      });
    }

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        // Move particle
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap particles around screen
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;

        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        // Mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;

        const distanceSquared = dx * dx + dy * dy;
        const interactionRadius = 150;
        const interactionRadiusSquared =
          interactionRadius * interactionRadius;

        let drawAlpha = particle.alpha;

        if (distanceSquared < interactionRadiusSquared) {
          const distance = Math.sqrt(distanceSquared);

          drawAlpha = Math.min(
            0.8,
            particle.alpha +
              (1 - distance / interactionRadius) * 0.5
          );
        }

        // Draw particle
        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `${particle.colorPrefix}${drawAlpha})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = index + 1; j < particles.length; j++) {
          const particle2 = particles[j];

          const pdx = particle.x - particle2.x;
          const pdy = particle.y - particle2.y;

          const distanceSquared =
            pdx * pdx + pdy * pdy;

          const connectionRadius = 120;
          const connectionRadiusSquared =
            connectionRadius * connectionRadius;

          if (distanceSquared < connectionRadiusSquared) {
            const distance = Math.sqrt(distanceSquared);

            const lineAlpha =
              (1 - distance / connectionRadius) * 0.12;

            ctx.beginPath();

            ctx.moveTo(
              particle.x,
              particle.y
            );

            ctx.lineTo(
              particle2.x,
              particle2.y
            );

            ctx.strokeStyle = `rgba(6, 182, 212, ${lineAlpha})`;
            ctx.lineWidth = 0.6;

            ctx.stroke();
          }
        }
      });

      animationFrameId =
        requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener(
        'resize',
        resizeCanvas
      );

      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        opacity: 0.75,
      }}
    />
  );
}
