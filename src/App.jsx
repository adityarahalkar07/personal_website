import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Research from './components/Research';
import Publications from './components/Publications';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParallaxDivider from './components/ParallaxDivider';
import './App.css';

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const start = Date.now();
    const animate = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased * 100);
      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 400);
      }
    };
    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <motion.div
      className="loading"
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="loading__content">
        <div className="loading__track">
          <svg width="120" height="60" viewBox="0 0 120 60" fill="none" className="loading__track-svg">
            <line x1="30" y1="10" x2="30" y2="50" stroke="rgba(74,122,232,0.3)" strokeWidth="2"/>
            <line x1="90" y1="10" x2="90" y2="50" stroke="rgba(74,122,232,0.3)" strokeWidth="2"/>
            {[0, 1, 2, 3, 4].map(i => (
              <motion.line
                key={i}
                x1="25" y1={15 + i * 8}
                x2="95" y2={15 + i * 8}
                stroke="rgba(74,122,232,0.5)"
                strokeWidth="2"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ delay: i * 0.15, duration: 0.4 }}
              />
            ))}
          </svg>
        </div>

        <div className="loading__bar-container">
          <motion.div
            className="loading__bar"
            style={{ width: `${progress}%` }}
          />
          <div
            className="loading__train"
            style={{ left: `${progress}%` }}
          />
        </div>

        <span className="loading__text">{Math.round(progress)}%</span>
      </div>
    </motion.div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="noise-overlay" />

          <Navbar />
          <Hero />
          <About />
          <ParallaxDivider text="Research" />
          <Research />
          <ParallaxDivider text="Publications" variant="dark" />
          <Publications />
          <ParallaxDivider text="Education" />
          <Education />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </>
  );
}

export default App;
