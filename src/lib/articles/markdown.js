import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import { visit } from 'unist-util-visit'
import GithubSlugger from 'github-slugger'
import { toString as mdastToString } from 'mdast-util-to-string'

function remarkAdmonitions() {
  return (tree) => {
    visit(tree, 'blockquote', (node) => {
      const firstParagraph = node.children?.[0]
      if (!firstParagraph || firstParagraph.type !== 'paragraph') return

      const firstText = firstParagraph.children?.[0]
      if (!firstText || firstText.type !== 'text') return

      const match = firstText.value.match(/^\[!(NOTE|WARNING|TIP)\]\s*/i)
      if (!match) return

      const kind = match[1].toLowerCase()
      firstText.value = firstText.value.replace(match[0], '')

      node.data = node.data || {}
      node.data.hProperties = node.data.hProperties || {}
      node.data.hProperties['data-admonition'] = kind
      node.data.hProperties.className = ['admonition', `admonition-${kind}`]
    })
  }
}

function extractToc(markdown) {
  const slugger = new GithubSlugger()
  const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown)
  const toc = []

  visit(tree, 'heading', (node) => {
    if (node.depth !== 2 && node.depth !== 3) return
    const text = mdastToString(node).trim()
    if (!text) return
    toc.push({ depth: node.depth, id: slugger.slug(text), text })
  })

  return toc
}

function buildSanitizeSchema() {
  const schema = structuredClone(defaultSchema)

  schema.attributes = schema.attributes || {}

  const global = new Set([...(schema.attributes['*'] || [])])
  global.add('className')
  global.add('id')
  global.add('data-admonition')
  schema.attributes['*'] = Array.from(global)

  schema.attributes.a = Array.from(new Set([...(schema.attributes.a || []), 'href', 'title', 'rel', 'target']))
  schema.attributes.img = Array.from(
    new Set([...(schema.attributes.img || []), 'src', 'alt', 'title', 'width', 'height', 'loading', 'decoding'])
  )
  schema.attributes.code = Array.from(new Set([...(schema.attributes.code || []), 'className']))
  schema.attributes.pre = Array.from(new Set([...(schema.attributes.pre || []), 'className']))
  schema.attributes.span = Array.from(new Set([...(schema.attributes.span || []), 'className']))

  schema.protocols = schema.protocols || {}
  schema.protocols.href = ['http', 'https', 'mailto', 'tel']

  return schema
}

function rehypeExternalLinks({ siteUrl }) {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a') return
      const href = node.properties?.href
      if (!href || typeof href !== 'string') return
      if (!/^https?:\/\//i.test(href)) return
      if (siteUrl && href.startsWith(siteUrl)) return

      node.properties = node.properties || {}
      node.properties.target = '_blank'
      node.properties.rel = 'noopener noreferrer'
    })
  }
}

export function estimateReadingTime(markdown) {
  const textTree = unified().use(remarkParse).use(remarkGfm).parse(markdown)
  const text = mdastToString(textTree)
  const words = String(text || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
  const wordsPerMinute = 200
  const minutes = Math.max(1, Math.round(words / wordsPerMinute))
  return {
    readingTimeMinutes: minutes,
    readingTimeText: `${minutes} min read`,
  }
}

export function renderMarkdownArticle({ markdown, allowHtml = false, siteUrl }) {
  const toc = extractToc(markdown)
  const read = estimateReadingTime(markdown)

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkAdmonitions)
    .use(remarkRehype, { allowDangerousHtml: allowHtml })
    .use(allowHtml ? rehypeRaw : () => {})
    .use(rehypeSanitize, buildSanitizeSchema())
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: 'append',
      properties: { className: ['heading-anchor'] },
      content: {
        type: 'element',
        tagName: 'span',
        properties: { 'aria-hidden': 'true' },
        children: [{ type: 'text', value: '#' }],
      },
    })
    .use(rehypeHighlight, { detect: true, ignoreMissing: true })
    .use(rehypeExternalLinks, { siteUrl })
    .use(rehypeStringify)

  const html = processor.processSync(markdown).toString()
  return {
    html,
    toc,
    ...read,
  }
}
