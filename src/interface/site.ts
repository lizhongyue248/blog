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

export interface ImgPreview {
  open: boolean
  src: string
  alt: string
}

export interface UseImgPreview extends ImgPreview {
  handleClose: () => void
  handleOpen: (src: string, alt: string) => void
  reset: () => void
}

export interface UseURL {
  url: URL
  title: string
}

export interface PageView {
  id: number
  name: string
  title: string
  path: string
  count: number
  favorite: number
  hate: number
}

export interface PagesView {
  [index: string]: PageView
}

export interface Ip {
  name: string
  visit: string
}

export interface ResultNumber {
  number: number
}

export enum ActionType {
  FAVORITE= 'FAVORITE',
  HATE = 'HATE'
}

export interface UseService {
  pageView: (name: string, title: string, path: string) => PageView[]
  pageAction: (name: string, title: string, path: string, type: ActionType) => void
  pageAll: () => PageView[]
  pagesView: () => ResultNumber
  pages: (names: string[]) => PageView[]
  userView: () => ResultNumber
  userIps: () => Ip[]
}
