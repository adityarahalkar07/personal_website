import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import './ParallaxDivider.css';

export default function ParallaxDivider({ text = 'On the Right Track', variant = 'default' }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ['-20%', '10%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['10%', '-20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div className={`divider divider--${variant}`} ref={ref}>
      <motion.div className="divider__content" style={{ opacity }}>
        <motion.div className="divider__track-row" style={{ x: x1 }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div className="divider__sleeper" key={i} />
          ))}
        </motion.div>

        <div className="divider__text-wrapper">
          <motion.span className="divider__text" style={{ x: x2 }}>
            {text}
          </motion.span>
        </div>

        <motion.div className="divider__track-row" style={{ x: x1 }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div className="divider__sleeper" key={i} />
          ))}
        </motion.div>
      </motion.div>

      {/* Rails with data flow dots */}
      <div className="divider__rails">
        <div className="divider__rail">
          <div className="divider__data-dot divider__data-dot--1" />
          <div className="divider__data-dot divider__data-dot--2" />
          <div className="divider__data-dot divider__data-dot--3" />
        </div>
        <div className="divider__rail">
          <div className="divider__data-dot divider__data-dot--4" />
          <div className="divider__data-dot divider__data-dot--5" />
        </div>
      </div>
    </div>
  );
}
