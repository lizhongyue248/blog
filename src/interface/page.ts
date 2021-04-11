import { CSSProperties, ReactElement, ReactNode } from 'react'
import { Node } from './asciidoc'

export interface PostMeta {
  title: string,
  description: string,
  category: string,
  image: string
}

export interface BannerProps {
  title: string
  other?: ReactElement
  banner: string
}

export interface LayoutProps {
  children: NonNullable<ReactNode>
  title?: string
  other?: ReactElement
  actions?: ReactElement[]
  banner?: string
  postMeta?: PostMeta
}

export interface CategoryProps {
  data: {
    allAsciidoc: {
      category: string[]
      group: {nodes: Node[], totalCount: number}[]
    }
  }
}

export interface BackgroundProps {
  color?: string
  classesName?: string
  style?: CSSProperties
}

export interface PostContentProps {
  node: Node
  comment?: boolean
  children?: ReactElement[]
}
