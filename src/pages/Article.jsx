import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { formatDateLong } from '../lib/articles/core'
import { getOnSiteArticleBySlug, getOnSiteArticleNeighbors } from '../lib/articles'

function absoluteUrl(url) {
  if (!url) return null
  if (/^https?:\/\//i.test(url)) return url
  if (url.startsWith('/')) return `https://ethanluxton.com${url}`
  return null
}

function Article() {
  const { slug } = useParams()

  const article = useMemo(() => getOnSiteArticleBySlug(slug), [slug])
  const neighbors = useMemo(() => getOnSiteArticleNeighbors(slug), [slug])

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-extrabold text-gradient">404</h1>
        <p className="mt-4 text-dark-text-secondary">Article not found</p>
        <Link
          to="/articles"
          className="mt-6 inline-flex items-center px-6 py-3 rounded-md bg-primary text-white hover:bg-primary-600 transition-colors"
        >
          Back to Articles
        </Link>
      </div>
    )
  }

  const published = formatDateLong(article.date)
  const updated = article.updated ? formatDateLong(article.updated) : null

  const ogImage = absoluteUrl(article.coverImage) || 'https://ethanluxton.com/images/articles/placeholder.svg'
  const browserTimeZone =
  (typeof Intl !== "undefined" &&
      Intl.DateTimeFormat &&
      Intl.DateTimeFormat().resolvedOptions &&
      Intl.DateTimeFormat().resolvedOptions().timeZone) ||
    undefined;

  // If article.date is "YYYY-MM-DD", this treats it as a local date (midnight in the browser TZ)
  // and serializes to ISO (UTC) for schema.org datePublished/dateModified.
  const toIsoFromLocalDate = (yyyyMmDd) => {
    if (!yyyyMmDd) return undefined;
    const [y, m, d] = yyyyMmDd.split("-").map((n) => Number(n));
    if (![y, m, d].every(Number.isFinite)) return undefined;

    const localMidnight = new Date(y, m - 1, d, 0, 0, 0, 0);
    return localMidnight.toISOString();
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: toIsoFromLocalDate(article.date),
    dateModified: toIsoFromLocalDate(article.updated || article.date),

    // Extra: expose the browser/OS timezone you detected
    // (schema.org doesn't have a canonical top-level "timeZone" for BlogPosting,
    // so we include it as an additionalProperty)
    ...(browserTimeZone
      ? {
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "browserTimeZone",
              value: browserTimeZone,
            },
          ],
        }
      : {}),

    author: {
      "@type": "Person",
      name: "Ethan Luxton",
      url: "https://ethanluxton.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.canonicalUrl,
    },
    ...(ogImage ? { image: [ogImage] } : {}),
  };

  return (
    <div className="w-full text-white/90 py-10 px-4">
      <Helmet>
        <title>{article.title} · Ethan Luxton</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={article.canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:url" content={article.canonicalUrl} />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link to="/articles" className="text-primary hover:text-primary-300 transition-colors">
            ← Back to Articles
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <div>
            <header className="mb-8">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gradient">{article.title}</h1>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/70">
                <span>{published}</span>
                <span>{article.readingTimeText}</span>
                {updated ? <span>Updated {updated}</span> : null}
              </div>
              {article.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </header>

            {article.coverImage ? (
              <div className="mb-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ) : null}

            <article className="prose prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: article.html }} />
            </article>

            {(neighbors.prev || neighbors.next) && (
              <nav className="mt-12 grid gap-4 sm:grid-cols-2">
                {neighbors.next ? (
                  <Link to={`/articles/${neighbors.next.slug}`} className="glass-card p-5 hover-card">
                    <div className="text-xs text-white/60">Next</div>
                    <div className="mt-1 font-semibold text-white">{neighbors.next.title}</div>
                  </Link>
                ) : (
                  <div />
                )}
                {neighbors.prev ? (
                  <Link to={`/articles/${neighbors.prev.slug}`} className="glass-card p-5 hover-card text-right">
                    <div className="text-xs text-white/60">Previous</div>
                    <div className="mt-1 font-semibold text-white">{neighbors.prev.title}</div>
                  </Link>
                ) : null}
              </nav>
            )}
          </div>

          {article.toc?.length ? (
            <aside className="hidden lg:block">
              <div className="sticky top-24 glass-card p-6">
                <div className="text-sm font-semibold text-white mb-3">On this page</div>
                <ul className="space-y-2 text-sm text-white/70">
                  {article.toc.map((item) => (
                    <li key={`${item.depth}-${item.id}`} className={item.depth === 3 ? 'pl-3' : ''}>
                      <a href={`#${item.id}`} className="hover:text-white transition-colors">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Article
