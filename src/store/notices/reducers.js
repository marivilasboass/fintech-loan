import R from 'ramda'

import { NoticesAction } from './types'

export const initialState = {
  total: {
    notices: {},
    page: 0,
    endReached: false
  },
  unread: {
    notices: {},
    page: 0,
    endReached: false
  },
  allNoticesRead: false,
  banner: {},
  count: {
    notRead: 0,
    read: 0,
    total: 0
  }
}

export const noticesReducers = (state = initialState, action) => {
  switch (action.type) {
  case NoticesAction.UPDATE:
    return R.mergeDeepRight(state, {
      ...action.noticesUpdate,
      loading: false,
      resetting: false
    })
  case NoticesAction.REMOVE:
    return {
      ...state,
      [action.status]: {
        ...state[action.status],
        notices: R.dissoc(action._id, state[action.status].notices)
      }
    }
  case NoticesAction.APPEND:
    return {
      ...state,
      loading: false,
      resetting: false,
      [action.status]: {
        ...state[action.status],
        notices: { ...state[action.status].notices, ...action.notices }
      }
    }
  case NoticesAction.REMOVE_BANNER:
    return {
      ...state,
      banner: {}
    }
  case NoticesAction.VIEW:
    return {
      ...state,
      count: {
        ...state.count,
        notRead: state.count.notRead - 1
      },
      [action.status]: {
        ...state[action.status],
        notices: R.assocPath([action._id, 'viewedAt'], action.viewedAt, state[action.status].notices)
      }
    }
  case NoticesAction.NEXT_PAGE:
    return {
      ...state,
      [action.status]: {
        ...state[action.status],
        page: state[action.status].page + 1
      }
    }
  case NoticesAction.END_REACHED:
    return {
      ...state,
      loading: false,
      [action.status]: {
        ...state[action.status],
        endReached: true
      }
    }
  case NoticesAction.LOADING:
    return {
      ...state,
      loading: action.value
    }
  case NoticesAction.RESETTING: {
    return {
      ...state,
      [action.status]: {
        ...initialState[action.status]
      },
      resetting: true,
      allNoticesRead: false
    }
  }
  case NoticesAction.SET_BANNER:
    return {
      ...state,
      banner: action.banner
    }
  case 'PUSH_NOTIFICATION':
    return handlePushNotification(state, action.notification)
  default:
    return state
  }
}

const handlePushNotification = (state, notification) => {
  switch (notification.type) {
  default:
    if (notification.noticeId) {
      return {
        ...state,
        notices: {
          [notification.noticeId]: {
            ...makeNoticeFromPushNotification(notification)
          },
          ...state.notices
        }
      }
    }
    return state
  }
}

const makeNoticeFromPushNotification = (notification) => {
  const { noticeId, title, message, link, category, highlightColor } = notification

  return {
    _id: noticeId,
    title,
    link,
    category,
    highlightColor,
    description: message,
    createdAt: new Date()
  }
}
