import { ReactElement, ReactNode } from 'react'
import { Node } from './asciidoc'

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
}

export interface CategoryProps {
  data: {
    allAsciidoc: {
      category: string[]
      group: {nodes: Node[], totalCount: number}[]
    }
  }
}
