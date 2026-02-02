import fs from 'node:fs/promises'
import path from 'node:path'
import { parseFrontmatter } from '../src/lib/articles/frontmatter.js'

const SITE_URL = 'https://ethanluxton.com'
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/articles/placeholder.svg`

const DIST_DIR = path.resolve('dist')
const CONTENT_DIR = path.resolve('content/articles')

function absoluteUrl(url) {
  if (!url) return null
  if (/^https?:\/\//i.test(url)) return url
  if (url.startsWith('/')) return `${SITE_URL}${url}`
  return null
}

function ensureLeadingSlash(p) {
  if (!p.startsWith('/')) return `/${p}`
  return p
}

function canonicalForPath(routePath) {
  const p = routePath === '/' ? '/' : routePath.replace(/\/+$/, '')
  return `${SITE_URL}${p}`
}

function stripExistingSeoHead(html) {
  // Remove tags we will replace so we don't duplicate them.
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, '')
    .replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>\s*/gi, '')
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>\s*/gi, '')
}

function injectSeoHead(html, tags) {
  const match = html.match(/<head[^>]*>/i)
  if (!match) return html
  const idx = match.index + match[0].length
  return `${html.slice(0, idx)}\n${tags}\n${html.slice(idx)}`
}

function buildSeoTags({ title, description, canonicalUrl, ogType, ogImage }) {
  const safeTitle = String(title || '').trim()
  const safeDesc = String(description || '').trim()
  const safeCanon = String(canonicalUrl || '').trim()
  const safeOg = ogImage ? String(ogImage).trim() : null

  const twitterCard = safeOg ? 'summary_large_image' : 'summary'

  return [
    `    <title>${escapeHtml(safeTitle)}</title>`,
    safeDesc ? `    <meta name="description" content="${escapeHtml(safeDesc)}" />` : null,
    safeCanon ? `    <link rel="canonical" href="${escapeHtml(safeCanon)}" />` : null,
    `    <meta property="og:type" content="${escapeHtml(ogType || 'website')}" />`,
    `    <meta property="og:title" content="${escapeHtml(safeTitle)}" />`,
    safeDesc ? `    <meta property="og:description" content="${escapeHtml(safeDesc)}" />` : null,
    safeCanon ? `    <meta property="og:url" content="${escapeHtml(safeCanon)}" />` : null,
    safeOg ? `    <meta property="og:image" content="${escapeHtml(safeOg)}" />` : null,
    `    <meta name="twitter:card" content="${escapeHtml(twitterCard)}" />`,
    `    <meta name="twitter:title" content="${escapeHtml(safeTitle)}" />`,
    safeDesc ? `    <meta name="twitter:description" content="${escapeHtml(safeDesc)}" />` : null,
    safeOg ? `    <meta name="twitter:image" content="${escapeHtml(safeOg)}" />` : null,
  ]
    .filter(Boolean)
    .join('\n')
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

async function safeRead(filePath) {
  try {
    return await fs.readFile(filePath, 'utf8')
  } catch {
    return null
  }
}

async function listOnSiteArticles() {
  try {
    const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true })
    const files = entries
      .filter((e) => e.isFile() && /\.(md|mdx)$/i.test(e.name))
      .map((e) => path.join(CONTENT_DIR, e.name))

    const articles = []
    for (const filePath of files) {
      const raw = await fs.readFile(filePath, 'utf8')
      const { data, content } = parseFrontmatter(raw)
      if (data?.draft) continue

      const fileSlug = path.basename(filePath).replace(/\.(md|mdx)$/i, '')
      const slug = (data?.slug ? String(data.slug) : fileSlug).trim() || fileSlug
      const title = data?.title ? String(data.title) : slug
      const excerpt =
        (data?.excerpt ? String(data.excerpt) : '') ||
        content
          .split('\n')
          .map((l) => l.trim())
          .find((l) => l && !l.startsWith('#') && !l.startsWith('>') && !l.startsWith('```')) ||
        ''

      articles.push({
        slug,
        title,
        excerpt: excerpt.length > 180 ? `${excerpt.slice(0, 177)}...` : excerpt,
        coverImage: data?.coverImage ? String(data.coverImage) : null,
      })
    }

    return articles
  } catch {
    return []
  }
}

async function writeRouteHtml({ template, routePath, seo }) {
  const outputDir =
    routePath === '/' ? DIST_DIR : path.join(DIST_DIR, ensureLeadingSlash(routePath).replace(/^\//, ''))
  const outputFile = path.join(outputDir, 'index.html')

  await fs.mkdir(outputDir, { recursive: true })

  const cleaned = stripExistingSeoHead(template)
  const withSeo = injectSeoHead(cleaned, seo)
  await fs.writeFile(outputFile, withSeo, 'utf8')
}

async function main() {
  const template = await safeRead(path.join(DIST_DIR, 'index.html'))
  if (!template) return

  const basePages = [
    {
      path: '/',
      title: 'Ethan Luxton | FPQP®',
      description: 'Portfolio of Ethan Luxton, FPQP® — Wealth Management, Software Engineering, Cybersecurity, and Thought Leadership.',
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
    },
    {
      path: '/portfolio',
      title: 'Portfolio · Ethan Luxton',
      description: 'Featured projects, technical skills, and open-source contributions by Ethan Luxton.',
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
    },
    {
      path: '/articles',
      title: 'Articles · Ethan Luxton',
      description: 'On-site writing and external publications by Ethan Luxton.',
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
    },
  ]

  for (const page of basePages) {
    const canonicalUrl = canonicalForPath(page.path)
    const seo = buildSeoTags({
      title: page.title,
      description: page.description,
      canonicalUrl,
      ogType: page.ogType,
      ogImage: absoluteUrl(page.ogImage),
    })
    await writeRouteHtml({ template, routePath: page.path, seo })
  }

  const articles = await listOnSiteArticles()
  for (const article of articles) {
    const routePath = `/articles/${article.slug}`
    const canonicalUrl = canonicalForPath(routePath)
    const seo = buildSeoTags({
      title: `${article.title} · Ethan Luxton`,
      description: article.excerpt,
      canonicalUrl,
      ogType: 'article',
      ogImage: absoluteUrl(article.coverImage) || DEFAULT_OG_IMAGE,
    })
    await writeRouteHtml({ template, routePath, seo })
  }
}

main()
