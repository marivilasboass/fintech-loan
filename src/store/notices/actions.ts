import { NoticesAction, Notice } from './types'

export const update = (noticesUpdate: Partial<Notice>) => ({
  type: NoticesAction.UPDATE,
  noticesUpdate
})

export const append = (notices: Partial<Notice>[], status: string) => ({
  type: NoticesAction.APPEND,
  notices,
  status
})

export const remove = (_id: string, status: string) => ({
  type: NoticesAction.REMOVE,
  _id,
  status
})

export const view = (_id: string, viewedAt: Date, status) => ({
  type: NoticesAction.VIEW,
  _id,
  viewedAt,
  status
})

export const viewAll = (viewedAt: Date, status) => ({
  type: NoticesAction.VIEW_ALL,
  viewedAt,
  status
})

export const nextPage = (status) => ({
  type: NoticesAction.NEXT_PAGE,
  status
})

export const endReached = (status) => ({
  type: NoticesAction.END_REACHED,
  status
})

export const loading = (value: boolean = true) => ({
  type: NoticesAction.LOADING,
  value
})

export const resetting = (status: string) => ({
  type: NoticesAction.RESETTING,
  status
})

export const setBanner = (banner) => ({
  type: NoticesAction.SET_BANNER,
  banner
})

export const removeBanner = () => ({
  type: NoticesAction.REMOVE_BANNER
})
