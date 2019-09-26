export enum NoticesAction {
  UPDATE = 'notices/UPDATE',
  APPEND_ONE = 'notices/APPEND_ONE',
  REMOVE = 'notices/REMOVE',
  VIEW = 'notices/VIEW',
  NEXT_PAGE = 'notices/NEXT_PAGE',
  END_REACHED = 'notices/END_REACHED',
  LOADING = 'notices/LOADING',
  SET_BANNER = 'notice/SET_BANNER',
  REMOVE_BANNER = 'notice/REMOVE_BANNER',
  APPEND = 'notice/APPEND',
  VIEW_ALL = 'notice/VIEW_ALL',
  RESETTING = 'notice/RESETTING'
}

export interface Notice {
  category: 'transaction' | 'loan' | 'collection' | 'account',
  createdAt: Date,
  description: string,
  highlightColor: string,
  link: string,
  updatedAt: string,
  userId: string,
  _id: string,
  viewedAt: Date,
  title: string,
  variables: {
    requestedAmount: string,
    nickname: string,
    firstName: string
  }
}