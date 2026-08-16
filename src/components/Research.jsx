import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Research.css';

const researchAreas = [
  {
    id: '01',
    title: 'Railroad Safety & Predictive Maintenance',
    description:
      'Leveraging AI and machine learning to predict equipment failures, prevent derailments, and optimize maintenance scheduling across the U.S. rail network.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M2 28h28M6 28V16l10-12 10 12v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 28v-6h6v6M10 18h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="16" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Laser-Based Sensing Systems',
    description:
      'Developing laser-induced fluorescence sensing for real-time detection and assessment of track conditions, including flange grease presence and lubrication health.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 16h6M22 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 16l6-8 6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="16" cy="20" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 24v4M12 26l-2 2M20 26l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Data Visualization & Decision Tools',
    description:
      'Building interactive dashboards and user interfaces that transform complex, unorganized railroad sensor data into clear and actionable visual insights.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 12h24M12 12v16" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 20l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="8" cy="20" r="2" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: '04',
    title: 'Condition Monitoring & Analytics',
    description:
      'Applying statistical methods, deep learning, and signal processing to monitor equipment health and classify tool and track conditions in real time.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 8v8l6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 16h2M22 16h2M16 8v2M16 22v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function Research() {
  const sectionRef = useRef(null);
  const [headerRef, headerVisible] = useScrollAnimation(0.2);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section className="research" id="research" ref={sectionRef}>
      <motion.div className="research__bg-pattern" style={{ y: bgY }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            className="research__bg-rail"
            key={i}
            style={{
              left: `${(i / 12) * 100}%`,
              opacity: 0.03 + (i % 3) * 0.01,
            }}
          />
        ))}
        {/* Neural network / track junction nodes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            className="research__bg-node"
            key={`node-${i}`}
            style={{
              left: `${15 + (i % 4) * 22}%`,
              top: `${20 + Math.floor(i / 4) * 40}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </motion.div>

      <div className="container">
        <motion.div
          className="research__header"
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="research__subtitle">
            Combining mechanical engineering, data science, and sensor technologies
            to build safer and smarter railroad infrastructure across the United States.
          </p>
        </motion.div>

        <div className="research__grid">
          {researchAreas.map((area, index) => (
            <ResearchCard key={area.id} area={area} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ResearchCard({ area, index }) {
  const [ref, isVisible] = useScrollAnimation(0.15);

  return (
    <motion.div
      className="research__card"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="research__card-header">
        <div className="research__card-icon">{area.icon}</div>
        <span className="research__card-number">{area.id}</span>
      </div>
      <h3 className="research__card-title">{area.title}</h3>
      <p className="research__card-desc">{area.description}</p>
      <div className="research__card-line" />
    </motion.div>
  );
}
