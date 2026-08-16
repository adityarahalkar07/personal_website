import { useState, useEffect } from 'react';

const FALLBACK = {
  metrics: { citations: 55, hIndex: 2, i10Index: 1 },
  publications: [
    { title: 'YOLOv8-Based Visual Detection of Road Hazards: Potholes, Sewer Covers, and Manholes', citations: 40, year: '2023' },
    { title: 'Making informed decisions in cutting tool maintenance in milling: A KNN based model agnostic approach', citations: 4, year: '2023' },
    { title: 'Notifying Type-2 Error and Segregating Undefined Conditions in Health Monitoring of Milling Cutter', citations: 1, year: '2025' },
    { title: 'Evaluation of Flange Grease on Revenue Service Tracks Using Laser-Based Systems and Machine Learning', citations: 1, year: '2025' },
    { title: 'Laser-induced fluorescence sensing of flange lubrication: track cart testing', citations: 0, year: '2026' },
  ],
};

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function useScholarData() {
  const [data, setData] = useState(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const res = await fetch('/api/scholar');
        if (!res.ok) throw new Error('API error');
        const json = await res.json();
        if (!cancelled && json.metrics) {
          setData(json);
        }
      } catch {
        // Use fallback data
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, []);

  function getCitations(title) {
    const key = normalize(title).slice(0, 30);
    const match = data.publications.find((p) => {
      const norm = normalize(p.title);
      return norm.includes(key) || key.includes(norm.slice(0, 30));
    });
    return match ? match.citations : null;
  }

  return { metrics: data.metrics, getCitations, loading };
}
