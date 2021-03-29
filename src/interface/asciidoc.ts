export interface Node {
  html: string
  id: string
  fields: { slug: string, modifiedTime: string, birthTime: string }
  revision: { date: string, number: string }
  author: { fullName: string, email: string }
  document: { title: string }
  pageAttributes: { category: string, description: string, image: string, sort: number | null }
}

export interface PageInfo {
  itemCount: number
  pageCount: number
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface Asciidoc {
  edges: { node: Node }[],
  pageInfo?: PageInfo
}

export interface PageContent {
  document: { title: string }
  fields: { slug: string }
}

export interface PostProps {
  data: { allAsciidoc: Asciidoc }
  pageContext: {
    next?: PageContent
    previous?: PageContent
  }
}
