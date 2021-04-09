import { PostMeta } from './page'

export interface SiteData {
  nodes: {
    keyword: string,
    description: string,
    image: string,
    name: string,
    avatar: string,
    titleTemplate: string,
    motto: string
  }[]
}

export interface SeoProps {
  post?: PostMeta
}

export interface SiteMeta {
  description: string
  siteUrl: string
}

export interface SeoData {
  allDataJson: SiteData
  site: { siteMetadata: SiteMeta }
}
