import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Publications.css';

const publications = [
  {
    type: 'journal',
    title: 'Laser-induced fluorescence sensing of flange lubrication: track cart testing',
    authors: 'A Rahalkar, SMH Mirzaei, Y Chen, C Holton, M Ahmadian',
    venue: 'International Journal of Rail Transportation, 1–17',
    year: '2026',
    citations: null,
  },
  {
    type: 'journal',
    title: 'Making informed decisions in cutting tool maintenance in milling: a KNN-based model agnostic approach',
    authors: 'RM Wahul, A Rahalkar, O Khare, RN Soman, A Patange',
    venue: 'Eksploatacja i Niezawodność – Maintenance and Reliability 28(3)',
    year: '2026',
    citations: null,
  },
  {
    type: 'journal',
    title: 'Evaluation of Flange Grease on Revenue Service Tracks Using Laser-Based Systems and Machine Learning',
    authors: 'A Rahalkar, SM Mirzaei, Y Chen, C Holton, M Ahmadian',
    venue: 'Infrastructures 10(4), 80 — MDPI',
    year: '2025',
    citations: 1,
  },
  {
    type: 'journal',
    title: 'Notifying type-2 error and segregating undefined conditions in health monitoring of milling cutter: A statistical and deep learning approach',
    authors: 'A Sanju, AD Patange, AM Rahalkar, R Soman',
    venue: 'Journal of Vibration Engineering & Technologies 13(1), 35',
    year: '2025',
    citations: 2,
  },
  {
    type: 'conference',
    title: 'YOLOv8-based visual detection of road hazards: potholes, sewer covers, and manholes',
    authors: 'OM Khare, S Gandhi, A Rahalkar, S Mane',
    venue: '2023 IEEE Pune Section International Conference (PuneCon), 1–6',
    year: '2023',
    citations: 65,
  },
  {
    type: 'conference',
    title: 'Laser-based Systems for Onboard Detection of Flange Grease on Revenue Service Tracks',
    authors: 'A Rahalkar, SMH Mirzaei, Y Chen, C Holton, M Ahmadian',
    venue: 'AREMA Annual Conference 2025 Proceedings',
    year: '2025',
    citations: null,
    paperUrl: '/papers/AREMA_2025_Paper.pdf',
    slidesUrl: '/presentations/AREMA_2025_Lubricity_Rev2_LR.pptx',
  },
  {
    type: 'presentation',
    title: "Where's the Grease? Turning Rail Data into Easy Visuals for Better Maintenance",
    authors: 'Aditya Rahalkar, Mehdi Ahmadian et al.',
    venue: 'Big Data Conference 2025',
    year: '2025',
    citations: null,
  },
];

const totalCitations = 73;
const hIndex = 2;
const i10Index = 1;

const filterLabels = {
  all: 'All',
  journal: 'Journal Articles',
  conference: 'Conference Papers',
  presentation: 'Presentations',
};

export default function Publications() {
  const sectionRef = useRef(null);
  const [headerRef, headerVisible] = useScrollAnimation(0.2);
  const [filter, setFilter] = useState('all');

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const lineProgress = useTransform(scrollYProgress, [0.1, 0.5], ['0%', '100%']);

  const filtered =
    filter === 'all'
      ? publications
      : publications.filter((p) => p.type === filter);

  return (
    <section className="publications" id="publications" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="publications__metrics"
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="publications__metric">
            <span className="publications__metric-number">{totalCitations}</span>
            <span className="publications__metric-label">Citations</span>
          </div>
          <div className="publications__metric">
            <span className="publications__metric-number">{publications.length}</span>
            <span className="publications__metric-label">Publications</span>
          </div>
          <div className="publications__metric">
            <span className="publications__metric-number">{hIndex}</span>
            <span className="publications__metric-label">h-index</span>
          </div>
          <div className="publications__metric">
            <span className="publications__metric-number">{i10Index}</span>
            <span className="publications__metric-label">i10-index</span>
          </div>
        </motion.div>

        <motion.div
          className="publications__filters"
          initial={{ opacity: 0, y: 20 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {Object.entries(filterLabels).map(([key, label]) => (
            <button
              key={key}
              className={`publications__filter ${filter === key ? 'publications__filter--active' : ''}`}
              onClick={() => setFilter(key)}
            >
              {label}
              <span className="publications__filter-count">
                {key === 'all'
                  ? publications.length
                  : publications.filter((p) => p.type === key).length}
              </span>
            </button>
          ))}
        </motion.div>

        <div className="publications__timeline">
          <div className="publications__track">
            <div className="publications__track-rail publications__track-rail--left" />
            <div className="publications__track-rail publications__track-rail--right" />
            <div className="publications__track-ties" />
            <motion.div
              className="publications__track-glow"
              style={{ height: lineProgress }}
            />
          </div>

          {filtered.map((pub, index) => (
            <PublicationItem
              key={`${pub.title}-${pub.type}-${index}`}
              pub={pub}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PublicationItem({ pub, index }) {
  const [ref, isVisible] = useScrollAnimation(0.15);

  const typeColors = {
    journal: { bg: 'rgba(74, 122, 232, 0.1)', color: 'var(--color-accent)' },
    conference: { bg: 'rgba(45, 138, 78, 0.1)', color: 'var(--color-signal-green)' },
    presentation: { bg: 'rgba(204, 51, 51, 0.1)', color: 'var(--color-red)' },
  };

  const tc = typeColors[pub.type];

  return (
    <motion.div
      className={`publications__item ${index % 2 === 0 ? 'publications__item--left' : 'publications__item--right'}`}
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="publications__item-signal">
        <div className="publications__item-signal-light" style={{ background: tc.color, boxShadow: `0 0 8px ${tc.color}` }} />
      </div>
      <div className="publications__item-card">
        <div className="publications__item-meta">
          <span
            className="publications__item-badge"
            style={{ background: tc.bg, color: tc.color }}
          >
            {pub.type === 'journal' ? 'Journal Article' : pub.type === 'conference' ? 'Conference Paper' : 'Presentation'}
          </span>
          <span className="publications__item-year">{pub.year}</span>
        </div>
        <h3 className="publications__item-title">{pub.title}</h3>
        <p className="publications__item-authors">{pub.authors}</p>
        <p className="publications__item-venue">{pub.venue}</p>
        <div className="publications__item-footer">
          {pub.citations !== null && pub.citations > 0 && (
            <span className="publications__item-citations">
              Cited by {pub.citations}
            </span>
          )}
          {pub.paperUrl && (
            <a
              href={pub.paperUrl}
              className="publications__item-paper"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M14 2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M6 6h4M6 9h4M6 12h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              View Paper
            </a>
          )}
          {pub.slidesUrl && (
            <a
              href={pub.slidesUrl}
              className="publications__item-slides"
              download
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v9M4 7l4 4 4-4M2 12v2h12v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download Slides
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
