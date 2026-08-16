const OPENALEX_AUTHOR_ID = 'A5093123183';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=3600');

  try {
    const [authorRes, worksRes] = await Promise.all([
      fetch(`https://api.openalex.org/authors/${OPENALEX_AUTHOR_ID}?select=id,display_name,cited_by_count,works_count,summary_stats`, {
        headers: { 'User-Agent': 'mailto:adityarahalkar@vt.edu' },
      }),
      fetch(`https://api.openalex.org/works?filter=authorships.author.id:${OPENALEX_AUTHOR_ID}&select=title,publication_year,cited_by_count,type,primary_location&sort=publication_year:desc&per_page=50`, {
        headers: { 'User-Agent': 'mailto:adityarahalkar@vt.edu' },
      }),
    ]);

    if (!authorRes.ok || !worksRes.ok) {
      throw new Error(`OpenAlex error: author=${authorRes.status} works=${worksRes.status}`);
    }

    const author = await authorRes.json();
    const works = await worksRes.json();

    const metrics = {
      citations: author.cited_by_count || 0,
      hIndex: author.summary_stats?.h_index || 0,
      i10Index: author.summary_stats?.i10_index || 0,
    };

    const publications = (works.results || []).map((w) => ({
      title: w.title || '',
      year: String(w.publication_year || ''),
      citations: w.cited_by_count || 0,
      venue: w.primary_location?.source?.display_name || '',
    }));

    res.status(200).json({ metrics, publications, fetchedAt: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch scholar data', message: error.message });
  }
}
