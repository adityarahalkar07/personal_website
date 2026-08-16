import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Footer.css';

export default function Footer() {
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <footer className="footer" ref={ref}>
      <motion.div
        className="footer__track"
        initial={{ scaleX: 0 }}
        animate={isVisible ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="container">
        <div className="footer__content">
          <div className="footer__left">
            <div className="footer__logo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M2 18h20M2 18l3-6M22 18l-3-6M5 12h14M5 12l2-4M19 12l-2-4M7 8h10M7 8l2-4h6l2 4"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Aditya Rahalkar</span>
            </div>
            <p className="footer__tagline">
              Advancing railroad infrastructure through data-driven research.
            </p>
          </div>

          <div className="footer__links">
            <a href="#about">About</a>
            <a href="#research">Research</a>
            <a href="#publications">Publications</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} Aditya Rahalkar. All rights reserved.
          </p>
          <p className="footer__built">
            Built with precision and purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}
