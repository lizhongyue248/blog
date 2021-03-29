import { ReactElement, ReactNode } from 'react'
import { Node } from './asciidoc'

export interface BannerProps {
  title: string
}

export interface LayoutProps {
  children: NonNullable<ReactNode>
  title?: string
  actions?: ReactElement[]
}

export interface CategoryProps {
  data: {
    allAsciidoc: {
      category: string[]
      group: {nodes: Node[], totalCount: number}[]
    }
  }
}
