import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import headshot from '../assets/aditya_headshot.png';
import './Hero.css';

function TrackCanvas() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < 60; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseOffset: Math.random() * Math.PI * 2,
          color: Math.random() > 0.6 ? (Math.random() > 0.5 ? 'blue' : 'red') : 'steel',
        });
      }
    };
    initParticles();

    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      frame++;

      const mouseOffsetX = (mouseRef.current.x - 0.5) * 40;
      const mouseOffsetY = (mouseRef.current.y - 0.5) * 20;
      const vpX = width * 0.5 + mouseOffsetX;
      const vpY = height * 0.35 + mouseOffsetY;

      // Perspective grid lines (rail ties converging to vanishing point)
      ctx.lineWidth = 1;
      for (let i = -8; i <= 8; i++) {
        const spread = i * 120;
        ctx.strokeStyle = `rgba(74, 85, 104, ${0.08 + Math.abs(i) * 0.008})`;
        ctx.beginPath();
        ctx.moveTo(vpX, vpY);
        ctx.lineTo(vpX + spread, height + 100);
        ctx.stroke();
      }

      // Horizontal crossties with depth perspective
      for (let i = 0; i < 25; i++) {
        const t = i / 25;
        const y = vpY + (height - vpY) * Math.pow(t, 1.5);
        const spreadAtY = (y - vpY) / (height - vpY) * 350;
        const alpha = 0.06 + t * 0.12;
        ctx.strokeStyle = `rgba(74, 85, 104, ${alpha})`;
        ctx.lineWidth = 1 + t * 3;
        ctx.beginPath();
        ctx.moveTo(vpX - spreadAtY, y);
        ctx.lineTo(vpX + spreadAtY, y);
        ctx.stroke();
      }

      // Main rails — two prominent blue steel lines
      const railOffset = 45;
      ctx.lineWidth = 2.5;
      for (let side = -1; side <= 1; side += 2) {
        const grad = ctx.createLinearGradient(vpX, vpY, vpX + side * railOffset, height);
        grad.addColorStop(0, 'rgba(74, 122, 232, 0.5)');
        grad.addColorStop(1, 'rgba(74, 122, 232, 0.15)');
        ctx.strokeStyle = grad;
        ctx.beginPath();
        for (let t = 0; t <= 1; t += 0.01) {
          const y = vpY + (height + 100 - vpY) * t;
          const x = vpX + side * railOffset * t;
          if (t === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Signal light at vanishing point — blue glow with red accent
      const glowPulse = Math.sin(frame * 0.015) * 0.3 + 0.7;
      const gradient = ctx.createRadialGradient(vpX, vpY, 0, vpX, vpY, 140);
      gradient.addColorStop(0, `rgba(74, 122, 232, ${0.2 * glowPulse})`);
      gradient.addColorStop(0.3, `rgba(74, 122, 232, ${0.08 * glowPulse})`);
      gradient.addColorStop(0.6, `rgba(204, 51, 51, ${0.04 * glowPulse})`);
      gradient.addColorStop(1, 'rgba(74, 122, 232, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(vpX, vpY, 140, 0, Math.PI * 2);
      ctx.fill();

      // Small signal light dot at vanishing point
      const signalPulse = Math.sin(frame * 0.03) * 0.5 + 0.5;
      ctx.beginPath();
      ctx.arc(vpX, vpY, 3, 0, Math.PI * 2);
      ctx.fillStyle = signalPulse > 0.5
        ? `rgba(74, 122, 232, ${0.6 + signalPulse * 0.4})`
        : `rgba(204, 51, 51, ${0.6 + (1 - signalPulse) * 0.4})`;
      ctx.fill();

      // Particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulse = Math.sin(frame * p.pulseSpeed + p.pulseOffset) * 0.3 + 0.7;
        const alpha = p.opacity * pulse;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (p.color === 'blue') {
          ctx.fillStyle = `rgba(74, 122, 232, ${alpha})`;
        } else if (p.color === 'red') {
          ctx.fillStyle = `rgba(204, 51, 51, ${alpha * 0.8})`;
        } else {
          ctx.fillStyle = `rgba(74, 85, 104, ${alpha})`;
        }
        ctx.fill();
      });

      // Connecting lines between nearby particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.06;
            ctx.strokeStyle = `rgba(74, 122, 232, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero__canvas" />;
}

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section className="hero" ref={containerRef}>
      <motion.div className="hero__canvas-wrapper" style={{ opacity: canvasOpacity }}>
        <TrackCanvas />
      </motion.div>

      <div className="hero__gradient-overlay" />

      <motion.div className="hero__content" style={{ opacity, scale }}>
        <motion.div
          className="hero__intro"
          style={{ y: contentY }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="hero__badge-dot" />
            PhD Researcher · Virginia Tech
          </motion.div>

          <h1 className="hero__name">
            Aditya
            <br />
            <span className="hero__name-accent">Rahalkar</span>
          </h1>

          <p className="hero__role">Railroad Safety & AI/ML Researcher</p>

          <p className="hero__subtitle">
            Applying machine learning and data analytics to prevent
            derailments and advance predictive maintenance for
            America's railroad infrastructure.
          </p>

          <div className="hero__cta-group">
            <a href="#research" className="hero__cta hero__cta--primary">
              Explore Research
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="/Aditya_Rahalkar_CV.pdf" target="_blank" rel="noopener noreferrer" className="hero__cta hero__cta--secondary">
              View Resume
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero__photo-wrapper"
          style={{ y: photoY }}
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero__photo-frame">
            <img
              src={headshot}
              alt="Aditya Rahalkar"
              className="hero__photo"
            />
            <div className="hero__photo-glow" />
          </div>
          <div className="hero__photo-offset" />
        </motion.div>
      </motion.div>

    </section>
  );
}
