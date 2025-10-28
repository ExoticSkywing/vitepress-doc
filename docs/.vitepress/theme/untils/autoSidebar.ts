import fs from 'fs'
import path from 'path'

interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
}

/**
 * 自动生成侧边栏配置
 * @param dirPath 目录路径（相对于 docs 目录）
 * @param basePath URL 基础路径
 * @param collapsed 是否默认折叠
 */
export function generateSidebarFromDir(
  dirPath: string,
  basePath: string = '',
  collapsed: boolean = true
): SidebarItem[] {
  const fullPath = path.join(process.cwd(), 'docs', dirPath)
  
  if (!fs.existsSync(fullPath)) {
    return []
  }

  const items: SidebarItem[] = []
  const files = fs.readdirSync(fullPath, { withFileTypes: true })

  // 排序：文件夹在前，文件在后
  files.sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1
    if (!a.isDirectory() && b.isDirectory()) return 1
    return a.name.localeCompare(b.name)
  })

  for (const file of files) {
    // 跳过隐藏文件和 node_modules
    if (file.name.startsWith('.') || file.name === 'node_modules') {
      continue
    }

    const filePath = path.join(fullPath, file.name)
    const urlPath = `${basePath}/${file.name}`

    if (file.isDirectory()) {
      // 检查是否有 index.md
      const indexPath = path.join(filePath, 'index.md')
      const hasIndex = fs.existsSync(indexPath)

      // 递归获取子项
      const subItems = generateSidebarFromDir(
        path.join(dirPath, file.name),
        urlPath,
        collapsed
      )

      // 读取文件夹名作为标题（可以从 index.md 的 frontmatter 读取）
      const text = formatDirName(file.name)

      items.push({
        text,
        link: hasIndex ? `${urlPath}/` : undefined,
        items: subItems.length > 0 ? subItems : undefined,
        collapsed
      })
    } else if (file.name.endsWith('.md') && file.name !== 'index.md') {
      // 从文件名生成标题
      const text = formatFileName(file.name)
      const link = urlPath.replace(/\.md$/, '')

      items.push({
        text,
        link
      })
    }
  }

  return items
}

/**
 * 格式化目录名
 */
function formatDirName(name: string): string {
  // 去除数字前缀（如 "10.后端" -> "后端"）
  return name.replace(/^\d+\./, '')
}

/**
 * 格式化文件名
 */
function formatFileName(name: string): string {
  // 去除 .md 后缀和数字前缀
  return name.replace(/\.md$/, '').replace(/^\d+\./, '')
}

/**
 * 从 Markdown 文件读取标题
 */
export function getTitleFromMd(filePath: string): string | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    
    // 先尝试从 frontmatter 读取 title
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
    if (frontmatterMatch) {
      const titleMatch = frontmatterMatch[1].match(/title:\s*(.+)/)
      if (titleMatch) {
        return titleMatch[1].trim()
      }
    }
    
    // 否则读取第一个 # 标题
    const h1Match = content.match(/^#\s+(.+)$/m)
    if (h1Match) {
      return h1Match[1].trim()
    }
    
    return null
  } catch {
    return null
  }
}


