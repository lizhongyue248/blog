import request from '../util/request'
import { ActionType, Ip, PagesView, PageView, ResultNumber } from '../interface/site'

export const pageView = (name: string, title: string, path: string): Promise<PageView> =>
  request.get<PageView>(`/page/view/${name}`, { params: { title, path } })

export const pageAction = (view: PageView, type: ActionType): Promise<void> =>
  request.get<void>(`/page/action/${view.name}`, { params: { title: view.title, path: view.path, type } })

export const pageAll = (): Promise<PageView[]> =>
  request.get<PageView[]>('/page/all')

export const pagesView = (): Promise<ResultNumber> =>
  request.get<ResultNumber>('/pages/view')

export const pages = (names: string[]): Promise<PagesView> =>
  request.get<PagesView>('/pages', { params: { names } })

export const userView = (ip: string): Promise<ResultNumber> =>
  request.get<ResultNumber>('/user/view', { params: { ip } })

export const userIps = (): Promise<Ip[]> =>
  request.get<Ip[]>('/user/ips')
