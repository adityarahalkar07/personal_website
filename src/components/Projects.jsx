import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Projects.css';

const projects = [
  {
    id: 1,
    title: '[Project Title One]',
    subtitle: 'Predictive Analytics',
    description:
      '[Detailed description of your first major project. Include the problem statement, methodology, tools/technologies used, and key outcomes or results.]',
    tags: ['Machine Learning', 'Python', 'Data Analytics'],
    image: null,
    year: '2023–Present',
  },
  {
    id: 2,
    title: '[Project Title Two]',
    subtitle: 'Infrastructure Monitoring',
    description:
      '[Detailed description of your second project. What was the challenge, how did you approach it, and what impact did it have on railroad maintenance?]',
    tags: ['Signal Processing', 'IoT', 'Real-time Analysis'],
    image: null,
    year: '2022–2023',
  },
  {
    id: 3,
    title: '[Project Title Three]',
    subtitle: 'Decision Support System',
    description:
      '[Description of another project — perhaps a decision support system, optimization model, or data pipeline you built for railroad applications.]',
    tags: ['Optimization', 'GIS', 'Database Design'],
    image: null,
    year: '2021–2022',
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const [headerRef, headerVisible] = useScrollAnimation(0.2);

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <div className="container container--wide">
        <motion.div
          className="projects__header"
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="projects__label">Projects</span>
          <h2 className="projects__title">
            Research in Motion
          </h2>
          <p className="projects__subtitle">
            [Overview of your project portfolio — the types of problems you solve
            and the tools you use to solve them.]
          </p>
        </motion.div>

        <div className="projects__list">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [ref, isVisible] = useScrollAnimation(0.1);
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`projects__card ${isEven ? '' : 'projects__card--reversed'}`}
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        className="projects__card-visual"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        style={{
          '--mouse-x': `${mousePos.x}%`,
          '--mouse-y': `${mousePos.y}%`,
        }}
      >
        <div className="projects__card-visual-inner">
          {/* Railroad-themed decorative pattern */}
          <div className="projects__card-pattern">
            <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" preserveAspectRatio="xMidYMid slice">
              {/* Track pattern */}
              {Array.from({ length: 20 }).map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1="140"
                  y1={i * 18 + 10}
                  x2="260"
                  y2={i * 18 + 10}
                  stroke="rgba(200,165,78,0.1)"
                  strokeWidth="2"
                />
              ))}
              <line x1="160" y1="0" x2="160" y2="300" stroke="rgba(200,165,78,0.2)" strokeWidth="2" />
              <line x1="240" y1="0" x2="240" y2="300" stroke="rgba(200,165,78,0.2)" strokeWidth="2" />
              {/* Decorative circles */}
              <circle cx="200" cy="150" r="40" stroke="rgba(200,165,78,0.15)" strokeWidth="1" fill="none" />
              <circle cx="200" cy="150" r="60" stroke="rgba(200,165,78,0.08)" strokeWidth="1" fill="none" />
              <circle cx="200" cy="150" r="80" stroke="rgba(200,165,78,0.04)" strokeWidth="1" fill="none" />
              {/* Project number */}
              <text x="200" y="160" textAnchor="middle" fill="rgba(200,165,78,0.3)" fontSize="48" fontWeight="700" fontFamily="var(--font-display)">
                {String(project.id).padStart(2, '0')}
              </text>
            </svg>
          </div>
        </div>
        <div className="projects__card-glow" />
      </div>

      <div className="projects__card-content">
        <div className="projects__card-meta">
          <span className="projects__card-number">Project {String(project.id).padStart(2, '0')}</span>
          <span className="projects__card-year">{project.year}</span>
        </div>
        <span className="projects__card-subtitle">{project.subtitle}</span>
        <h3 className="projects__card-title">{project.title}</h3>
        <p className="projects__card-desc">{project.description}</p>
        <div className="projects__card-tags">
          {project.tags.map((tag) => (
            <span className="projects__card-tag" key={tag}>{tag}</span>
          ))}
        </div>
        <a href="#" className="projects__card-link">
          View Details
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </motion.div>
  );
}
