import fs from 'node:fs/promises'
import path from 'node:path'
import { isValidIsoDate } from '../src/lib/articles/core.js'
import { parseFrontmatter } from '../src/lib/articles/frontmatter.js'

const SITE_URL = 'https://ethanluxton.com'
const CONTENT_DIR = path.resolve('content/articles')
const OUT_FILE = path.resolve('public/sitemap.xml')

function filenameSlug(filePath) {
  const file = filePath.split(path.sep).pop() || ''
  return file.replace(/\.(md|mdx)$/i, '')
}

function isoToLastmod(dateString) {
  if (!isValidIsoDate(dateString)) return null
  return `${dateString}T00:00:00.000Z`
}

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

async function readOnSiteArticles() {
  try {
    const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true })
    const files = entries
      .filter((e) => e.isFile() && /\.(md|mdx)$/i.test(e.name))
      .map((e) => path.join(CONTENT_DIR, e.name))

    const articles = []
    for (const filePath of files) {
      const raw = await fs.readFile(filePath, 'utf8')
      const { data } = parseFrontmatter(raw)
      if (data.draft) continue

      const slug = (data.slug ? String(data.slug) : filenameSlug(filePath)).trim() || filenameSlug(filePath)
      const date = data.date ? String(data.date) : null
      const updated = data.updated ? String(data.updated) : null

      articles.push({
        slug,
        lastmod: isoToLastmod(updated || date || ''),
      })
    }
    return articles
  } catch {
    return []
  }
}

async function main() {
  const staticRoutes = [
    { path: '/', changefreq: 'monthly', priority: '1.0' },
    { path: '/portfolio', changefreq: 'monthly', priority: '0.8' },
    { path: '/articles', changefreq: 'weekly', priority: '0.9' },
  ]

  const articles = await readOnSiteArticles()

  const urls = [
    ...staticRoutes.map((r) => ({
      loc: `${SITE_URL}${r.path}`,
      changefreq: r.changefreq,
      priority: r.priority,
    })),
    ...articles.map((a) => ({
      loc: `${SITE_URL}/articles/${a.slug}`,
      lastmod: a.lastmod,
      changefreq: 'yearly',
      priority: '0.7',
    })),
  ]

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map((u) => {
        const parts = [
          `  <url>`,
          `    <loc>${xmlEscape(u.loc)}</loc>`,
          u.lastmod ? `    <lastmod>${xmlEscape(u.lastmod)}</lastmod>` : null,
          u.changefreq ? `    <changefreq>${u.changefreq}</changefreq>` : null,
          u.priority ? `    <priority>${u.priority}</priority>` : null,
          `  </url>`,
        ].filter(Boolean)
        return parts.join('\n')
      })
      .join('\n') +
    `\n</urlset>\n`

  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true })
  await fs.writeFile(OUT_FILE, xml, 'utf8')
}

main()
