// src/api/newsApi.js

const RSS2JSON = "https://api.rss2json.com/v1/api.json?rss_url=";

// League feed: https://www.mlb.com/feeds/news/rss.xml
// Team feed (e.g. Yankees): https://www.mlb.com/yankees/feeds/news/rss.xml
function buildFeedUrl({ teamSlug } = {}) {
  const rss = teamSlug
    ? `https://www.mlb.com/${teamSlug}/feeds/news/rss.xml`
    : `https://www.mlb.com/feeds/news/rss.xml`;
  return `${RSS2JSON}${encodeURIComponent(rss)}`;
}

function forceHttps(url) {
  return typeof url === "string" ? url.replace(/^http:\/\//i, "https://") : null;
}

function decodeEntities(s) {
  if (!s) return s;
  try {
    const ta = document.createElement("textarea");
    ta.innerHTML = s;
    return ta.value;
  } catch {
    return s;
  }
}

function sanitizeLink(raw) {
  if (!raw) return "";
  let url = decodeEntities(String(raw).trim());
  url = forceHttps(url);

  // Strip common tracking params that sometimes cause redirects/403s
  try {
    const u = new URL(url);
    const strip = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "cmp",
      "cmpid",
      "partner",
      "src",
      "iclid",
      "gclid",
      "fbclid",
    ];
    strip.forEach((k) => u.searchParams.delete(k));
    return u.toString();
  } catch {
    return url; // if it's not a valid URL, return best-effort string
  }
}

export async function getMlbNews({ teamSlug, limit = 9 } = {}) {
  const url = buildFeedUrl({ teamSlug });
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch MLB news");
  const data = await res.json();

  const items = (data.items || []).map((it) => ({
    title: it.title,
    link: sanitizeLink(it.link || it.guid), // prefer cleaned link
    pubDate: it.pubDate, // ISO-like string
    author: it.author || data.feed?.author || "MLB.com",
  }));

  return items.slice(0, limit);
}
