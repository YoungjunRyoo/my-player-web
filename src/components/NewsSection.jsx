import "../css/NewsSection.css";
import { useEffect, useState, useMemo } from "react";
import { getMlbNews } from "../services/newsApi";

function toMirror(url) {
  if (!url) return "";
  return `https://r.jina.ai/${url.replace(/^https?:\/\//, "")}`;
}

function NewsSection({ teamSlug, limit = 6 }) {
  const [items, setItems] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const news = await getMlbNews({ teamSlug, limit });
        if (isMounted) setItems(news);
      } catch (e) {
        console.error(e);
        if (isMounted) setErr("Could not load news right now.");
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [teamSlug, limit]);

  const sectionTitle = useMemo(
    () => (teamSlug ? `Latest ${teamSlug.toUpperCase()} News` : "Latest MLB News"),
    [teamSlug]
  );

  if (err) {
    return (
      <section className="news-section">
        <div className="news-header">
          <h2>{sectionTitle}</h2>
        </div>
        <p>{err}</p>
      </section>
    );
  }

  if (!items) {
    return (
      <section className="news-section">
        <div className="news-header">
          <h2>{sectionTitle}</h2>
        </div>
        <p>Loading news…</p>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="news-section">
        <div className="news-header">
          <h2>{sectionTitle}</h2>
        </div>
        <p>No news yet.</p>
      </section>
    );
  }

  return (
    <section className="news-section">
      <div className="news-header">
        <h2>{sectionTitle}</h2>
      </div>
      <ul className="news-grid">
        {items.map((n, i) => (
          <li key={i} className="news-card">
            <a
              className="news-title"
              href={toMirror(n.link)}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
            >
              {n.title}
            </a>
            <div className="news-meta">
              <span>{new Date(n.pubDate).toLocaleDateString()}</span>
              <span>•</span>
              <span>{n.author}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default NewsSection;
