import fs from 'node:fs/promises'
import path from 'node:path'
import { isValidIsoDate } from '../src/lib/articles/core.js'
import { parseFrontmatter } from '../src/lib/articles/frontmatter.js'

const CONTENT_DIR = path.resolve('content/articles')

function normalizeTags(tags) {
  if (!tags) return []
  if (Array.isArray(tags)) return tags.filter(Boolean).map(String)
  return String(tags)
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
}

function filenameSlug(filePath) {
  const file = filePath.split(path.sep).pop() || ''
  return file.replace(/\.(md|mdx)$/i, '')
}

function validateMeta(meta, filePath) {
  const errors = []
  if (!meta.title) errors.push('Missing required frontmatter: title')
  if (!meta.date) errors.push('Missing required frontmatter: date')
  if (meta.date && !isValidIsoDate(meta.date)) errors.push(`Invalid date format: ${meta.date} (expected YYYY-MM-DD)`)
  if (meta.updated && !isValidIsoDate(meta.updated))
    errors.push(`Invalid updated format: ${meta.updated} (expected YYYY-MM-DD)`)
  if (meta._rawTags != null && !Array.isArray(meta._rawTags)) errors.push('Frontmatter tags must be an array (or omitted).')

  if (errors.length) {
    return [`${path.relative(process.cwd(), filePath)}:\n- ${errors.join('\n- ')}`]
  }
  return []
}

async function main() {
  let files = []
  try {
    const entries = await fs.readdir(CONTENT_DIR, { withFileTypes: true })
    files = entries
      .filter((e) => e.isFile() && /\.(md|mdx)$/i.test(e.name))
      .map((e) => path.join(CONTENT_DIR, e.name))
  } catch {
    // No content directory yet; treat as ok.
    process.exit(0)
  }

  const errors = []
  const slugs = new Map()

  for (const filePath of files) {
    const raw = await fs.readFile(filePath, 'utf8')
    const { data, content } = parseFrontmatter(raw)

    const slug = (data.slug ? String(data.slug) : filenameSlug(filePath)).trim()
    const meta = {
      title: data.title ? String(data.title) : '',
      slug: slug || filenameSlug(filePath),
      date: data.date ? String(data.date) : '',
      updated: data.updated ? String(data.updated) : undefined,
      excerpt: data.excerpt ? String(data.excerpt) : '',
      tags: normalizeTags(data.tags),
      _rawTags: data.tags,
      draft: Boolean(data.draft),
      coverImage: data.coverImage ? String(data.coverImage) : undefined,
      canonical: data.canonical ? String(data.canonical) : undefined,
      allowHtml: Boolean(data.allowHtml),
      _contentLength: content.length,
    }

    errors.push(...validateMeta(meta, filePath))

    if (slugs.has(meta.slug)) {
      errors.push(
        `Duplicate slug "${meta.slug}":\n- ${path.relative(process.cwd(), slugs.get(meta.slug))}\n- ${path.relative(
          process.cwd(),
          filePath
        )}`
      )
    } else {
      slugs.set(meta.slug, filePath)
    }
  }

  if (errors.length) {
    console.error(`\nArticle validation failed:\n\n${errors.join('\n\n')}\n`)
    process.exit(1)
  }
}

main()
