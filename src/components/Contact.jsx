import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Contact.css';

export default function Contact() {
  const [headerRef, headerVisible] = useScrollAnimation(0.2);
  const [contentRef, contentVisible] = useScrollAnimation(0.2);

  return (
    <section className="contact" id="contact">
      <div className="container">
        <motion.div
          className="contact__header"
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="contact__label">Get in Touch</span>
          <h2 className="contact__title">
            Let's Connect
          </h2>
          <p className="contact__subtitle">
            Interested in collaboration, research opportunities, or discussing
            railroad infrastructure and data science? I'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          className="contact__grid"
          ref={contentRef}
          initial={{ opacity: 0, y: 30 }}
          animate={contentVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="mailto:adityarahalkar@vt.edu" className="contact__card">
            <div className="contact__card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="contact__card-title">Email</h3>
            <p className="contact__card-text">adityarahalkar@vt.edu</p>
          </a>

          <a href="https://www.linkedin.com/in/adityarahalkar07/" target="_blank" rel="noopener noreferrer" className="contact__card">
            <div className="contact__card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="contact__card-title">LinkedIn</h3>
            <p className="contact__card-text">Connect on LinkedIn</p>
          </a>

          <a href="/Aditya_Rahalkar_CV.pdf" target="_blank" rel="noopener noreferrer" className="contact__card">
            <div className="contact__card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="contact__card-title">Resume</h3>
            <p className="contact__card-text">View Full CV</p>
          </a>

          <a href="https://scholar.google.com/citations?user=IRW8EdcAAAAJ" target="_blank" rel="noopener noreferrer" className="contact__card">
            <div className="contact__card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 14c3.314 0 6-1.343 6-3s-2.686-3-6-3-6 1.343-6 3 2.686 3 6 3z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6 11v4c0 1.657 2.686 3 6 3s6-1.343 6-3v-4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M6 7v4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M18 7v4" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <h3 className="contact__card-title">Google Scholar</h3>
            <p className="contact__card-text">73 Citations · h-index: 2</p>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
