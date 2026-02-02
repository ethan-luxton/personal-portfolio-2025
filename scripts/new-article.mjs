import fs from 'node:fs/promises'
import path from 'node:path'
import { slugifyTitle } from '../src/lib/articles/core.js'

const CONTENT_DIR = path.resolve('content/articles')

function parseArgs(argv) {
  const args = { title: null }
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i]
    if (token === '--title') args.title = argv[i + 1]
  }
  return args
}

function todayIso() {
  const now = new Date()
  const year = now.getUTCFullYear()
  const month = String(now.getUTCMonth() + 1).padStart(2, '0')
  const day = String(now.getUTCDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

async function main() {
  const { title } = parseArgs(process.argv.slice(2))
  if (!title) {
    console.error('Usage: npm run new:article -- --title "My Title"')
    process.exit(1)
  }

  const slug = slugifyTitle(title)
  if (!slug) {
    console.error('Could not generate a slug from that title.')
    process.exit(1)
  }

  await fs.mkdir(CONTENT_DIR, { recursive: true })

  const filePath = path.join(CONTENT_DIR, `${slug}.md`)
  try {
    await fs.access(filePath)
    console.error(`File already exists: ${path.relative(process.cwd(), filePath)}`)
    process.exit(1)
  } catch {
    // ok
  }

  const frontmatter = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `date: "${todayIso()}"`,
    'excerpt: ""',
    'tags: []',
    'draft: true',
    '---',
    '',
  ].join('\n')

  const body = [
    '# ' + title,
    '',
    'Write your article here.',
    '',
    '## Section',
    '',
    'Add content, code blocks, and more.',
    '',
  ].join('\n')

  await fs.writeFile(filePath, `${frontmatter}${body}`, 'utf8')

  console.log(`Created ${path.relative(process.cwd(), filePath)}`)
}

main()
