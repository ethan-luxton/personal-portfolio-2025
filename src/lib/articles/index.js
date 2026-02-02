import { slugifyTitle, isValidIsoDate } from './core'
import { estimateReadingTime, renderMarkdownArticle } from './markdown'
import { parseFrontmatter } from './frontmatter'

const SITE_URL = 'https://ethanluxton.com'

const rawModules = import.meta.glob('../../../content/articles/*.{md,mdx}', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function filenameSlug(filePath) {
  const file = filePath.split('/').pop() || ''
  return file.replace(/\.(md|mdx)$/i, '')
}

function normalizeTags(tags) {
  if (!tags) return []
  if (Array.isArray(tags)) return tags.filter(Boolean).map(String)
  return String(tags)
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
}

function buildExcerpt({ excerpt, content }) {
  if (excerpt && typeof excerpt === 'string') return excerpt.trim()
  const firstLine = content
    .split('\n')
    .map((l) => l.trim())
    .find((l) => l && !l.startsWith('#') && !l.startsWith('>') && !l.startsWith('```'))
  if (!firstLine) return ''
  return firstLine.length > 180 ? `${firstLine.slice(0, 177)}...` : firstLine
}

function validateMeta(meta) {
  const errors = []
  if (!meta.title) errors.push('Missing required frontmatter: title')
  if (!meta.date) errors.push('Missing required frontmatter: date')
  if (meta.date && !isValidIsoDate(meta.date)) errors.push(`Invalid date format: ${meta.date} (expected YYYY-MM-DD)`)
  if (meta.updated && !isValidIsoDate(meta.updated))
    errors.push(`Invalid updated format: ${meta.updated} (expected YYYY-MM-DD)`)
  return errors
}

const allArticles = Object.entries(rawModules).map(([filePath, raw]) => {
  const { data, content } = parseFrontmatter(raw)
  const slug = (data.slug ? String(data.slug) : filenameSlug(filePath)).trim()
  const read = estimateReadingTime(content)

  const meta = {
    title: data.title ? String(data.title) : '',
    slug: slug || filenameSlug(filePath),
    date: data.date ? String(data.date) : '',
    updated: data.updated ? String(data.updated) : undefined,
    excerpt: buildExcerpt({ excerpt: data.excerpt, content }),
    tags: normalizeTags(data.tags),
    draft: Boolean(data.draft),
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    canonical: data.canonical ? String(data.canonical) : undefined,
    allowHtml: Boolean(data.allowHtml),
    readingTimeMinutes: read.readingTimeMinutes,
    readingTimeText: read.readingTimeText,
    _filePath: filePath,
  }

  const errors = validateMeta(meta)
  if (errors.length && import.meta.env.DEV) {
    console.warn(`[articles] ${meta._filePath}:\n- ${errors.join('\n- ')}`)
  }

  return {
    meta,
    content,
  }
})

const bySlug = new Map()
for (const article of allArticles) {
  const key = article.meta.slug
  if (!bySlug.has(key)) bySlug.set(key, article)
}

const renderedCache = new Map()

function isPublished(meta) {
  if (!meta?.draft) return true
  return !import.meta.env.PROD
}

export function getAllOnSiteArticles() {
  return allArticles
    .map((a) => a.meta)
    .filter(isPublished)
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getOnSiteArticleBySlug(slug) {
  const entry = bySlug.get(slug)
  if (!entry) return null
  if (!isPublished(entry.meta)) return null

  if (!renderedCache.has(entry.meta.slug)) {
    renderedCache.set(
      entry.meta.slug,
      renderMarkdownArticle({
        markdown: entry.content,
        allowHtml: entry.meta.allowHtml,
        siteUrl: SITE_URL,
      })
    )
  }
  const rendered = renderedCache.get(entry.meta.slug)

  return {
    ...entry.meta,
    canonicalUrl: entry.meta.canonical || `${SITE_URL}/articles/${entry.meta.slug}`,
    ...rendered,
  }
}

export function getOnSiteArticleNeighbors(slug) {
  const published = getAllOnSiteArticles()
  const index = published.findIndex((a) => a.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: published[index + 1] || null,
    next: published[index - 1] || null,
  }
}

export function createSlugFromTitle(title) {
  return slugifyTitle(title)
}
