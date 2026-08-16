import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Education.css';

const education = [
  {
    degree: 'Ph.D. in Mechanical Engineering',
    institution: 'Virginia Tech',
    location: 'Blacksburg, Virginia',
    period: 'Aug 2024 – Present',
    current: true,
  },
  {
    degree: 'B.Tech in Mechanical Engineering',
    institution: 'College of Engineering, Pune',
    location: 'Pune, India',
    period: 'Aug 2020 – May 2024',
    current: false,
  },
];

export default function Education() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const trackProgress = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%']);

  return (
    <section className="education" id="education" ref={sectionRef}>
      <div className="container">
        <div className="education__track">
          <div className="education__track-rails">
            <div className="education__track-rail education__track-rail--left" />
            <div className="education__track-rail education__track-rail--right" />
            <div className="education__track-ties" />
            <motion.div
              className="education__track-glow"
              style={{ height: trackProgress }}
            />
          </div>

          {education.map((edu, index) => (
            <EducationCard key={index} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationCard({ edu, index }) {
  const [ref, isVisible] = useScrollAnimation(0.15);

  return (
    <motion.div
      className="education__card-wrapper"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="education__signal">
        <div className={`education__signal-light ${edu.current ? 'education__signal-light--active' : ''}`} />
      </div>

      <div className="education__card">
        <div className="education__card-top">
          <div>
            <h3 className="education__card-degree">{edu.degree}</h3>
            <p className="education__card-institution">{edu.institution}</p>
            <p className="education__card-location">{edu.location}</p>
          </div>
          <span className="education__card-period">
            {edu.current && <span className="education__card-current">Current</span>}
            {edu.period}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
