import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './About.css';

export default function About() {
  const sectionRef = useRef(null);
  const [titleRef, titleVisible] = useScrollAnimation(0.2);
  const [contentRef, contentVisible] = useScrollAnimation(0.2);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.4], ['0%', '100%']);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about__track-line">
        <motion.div className="about__track-fill" style={{ width: lineWidth }} />
      </div>

      <div className="container">
        <div className="about__grid">
          <div className="about__left">
            <motion.div
              ref={titleRef}
              initial={{ opacity: 0, x: -40 }}
              animate={titleVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="about__label">About</span>
              <h2 className="about__title">
                About Me
              </h2>
            </motion.div>
          </div>

          <motion.div
            className="about__right"
            ref={contentRef}
            initial={{ opacity: 0, x: 40 }}
            animate={contentVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="about__text">
              I am a PhD student in Mechanical Engineering at Virginia Tech, working as a
              Graduate Research Assistant at the Center for Vehicle Systems and Safety (CVeSS).
              My research focuses on leveraging artificial intelligence and machine learning to
              advance railroad safety and predictive maintenance. In collaboration with the
              U.S. Department of Transportation and the Federal Railroad Administration, I work
              on research projects aimed at improving the safety and efficiency of the nation's
              rail infrastructure.
            </p>
            <p className="about__text">
              America's railroads generate vast amounts of maintenance and sensor data, much
              of it complex and unorganized. My work bridges data science and domain engineering
              to make sense of this data. I develop interactive visualizations, analytical tools,
              and user interfaces that transform raw sensor readings into clear, actionable
              insights, empowering maintenance engineers and decision-makers to schedule repairs
              proactively, prevent derailments, and reduce operational costs.
            </p>

            <div className="about__interests">
              <h3 className="about__interests-title">Research Interests</h3>
              <div className="about__tags">
                {[
                  'Predictive Maintenance',
                  'Machine Learning',
                  'Data Visualization',
                  'Railroad Safety',
                  'Sensor Systems',
                  'Computer Vision',
                  'IoT',
                  'Condition Monitoring',
                ].map((tag) => (
                  <span className="about__tag" key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
