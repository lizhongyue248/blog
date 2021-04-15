export interface Node {
  html: string
  id: string
  fields: { slug: string, modifiedTime: string, birthTime: string, year: number }
  revision: { date: string, number: string }
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
  data: { asciidoc: Node }
  pageContext: {
    next?: PageContent
    previous?: PageContent
  }
}

export interface PostListProps {
  data: { allAsciidoc: Asciidoc }
  pageContext: {
    next?: PageContent
    previous?: PageContent
  }
}
