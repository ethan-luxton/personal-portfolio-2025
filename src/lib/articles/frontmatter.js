import YAML from 'yaml'

export function parseFrontmatter(raw) {
  const input = String(raw || '')
  if (!input.startsWith('---')) {
    return { data: {}, content: input }
  }

  const match = input.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/)
  if (!match) {
    return { data: {}, content: input }
  }

  const yamlText = match[1]
  const rest = input.slice(match[0].length)

  let data = {}
  try {
    const parsed = YAML.parse(yamlText)
    if (parsed && typeof parsed === 'object') data = parsed
  } catch {
    data = {}
  }

  return { data, content: rest }
}

