import { ReactElement, ReactNode } from 'react'

export interface BannerProps {
  title: string
}

export interface LayoutProps {
  children: NonNullable<ReactNode>
  title?: string
  actions?: ReactElement[]
}
