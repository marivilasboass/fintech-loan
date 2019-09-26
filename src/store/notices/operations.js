import { normalize } from 'normalizr'
import Sentry from 'sentry-expo'
import { Notifications } from 'expo'

import * as noticesActions from './actions'
import * as noticesSelectors from './selectors'
import { noticesSchema } from './schema'

const pageSize = 10

export const fetchNoticesByStatus = (status, reset) =>
  async (dispatch, getState, { api }) => {
    const loading = noticesSelectors.getLoading(getState())
    const endReached = noticesSelectors.getEndReached(getState(), status)

    if (!reset && (endReached || loading)) {
      return
    }

    dispatch(noticesActions.loading(true))

    if (reset) {
      dispatch(noticesActions.resetting(status))
    }

    try {
      const page = noticesSelectors.getPage(getState(), status)
      const skip = pageSize * page
      const body = {
        skip,
        limit: pageSize,
        status
      }
      const { data: response } = await api.post(`notification/notices`, body)
      dispatch(noticesActions.nextPage(status))

      const { data: notices } = response
      if (notices) {
        if (notices.length !== pageSize) {
          dispatch(noticesActions.endReached(status))
        }

        if (notices.length > 0) {
          const { entities } = normalize(notices, noticesSchema)
          dispatch(noticesActions.append(entities.notice, status))
        }
      }

      const noticesCount = noticesSelectors.getQtyNoticesNotRead(getState())
      Notifications.setBadgeNumberAsync(noticesCount)
    } catch (err) {
      Sentry.captureException(err)
    }

    dispatch(noticesActions.loading(false))
  }

export const fetchNoticesCount = () =>
  async (dispatch, getState, { api }) => {
    try {
      const { data: { data: count } } = await api.get(`notification/notices/count`)
      dispatch(noticesActions.update({ count }))
    } catch (err) {
      Sentry.captureException(err)
    }
  }

export const fetchBanner = () =>
  async (dispatch, getState, { api }) => {
    try {
      const { data: response } = await api.post(`notification/userBanners`)
      const { data: banner } = response
      if (!banner) {
        dispatch(noticesActions.removeBanner())
        return
      }
      dispatch(noticesActions.setBanner(banner))
    } catch (err) {
      Sentry.captureException(err)
    }
  }

export const registerView = (_id, status) =>
  async (dispatch, getState, { api }) => {
    const allNoticesRead = noticesSelectors.getAllNoticesRead(getState())
    if (allNoticesRead) {
      return
    }
    const viewedAt = new Date()
    dispatch(noticesActions.view(_id, viewedAt, status))

    const noticesCount = noticesSelectors.getQtyNoticesNotRead(getState())
    Notifications.setBadgeNumberAsync(noticesCount)

    try {
      await api.put(`notification/view/${_id}`)
    } catch (err) {
      Sentry.captureException(err)
    }
  }

export const markAllAsRead = (notices) =>
  async (dispatch, getState, { api }) => {
    dispatch(noticesActions.update({ allNoticesRead: true, count: { notRead: 0 } }))
    const noticesCount = noticesSelectors.getQtyNoticesNotRead(getState())
    Notifications.setBadgeNumberAsync(noticesCount)

    try {
      await api.post(`notification/setAllNoticesViewed`)
    } catch (err) {
      Sentry.captureException(err)
    }
  }

export const sendBannerPressedEvent = (_id) =>
  async (dispatch, getState, { api }) => {
    try {
      await api.post(`notification/banner/${_id}/setPressedAt`)
    } catch (err) {
      Sentry.captureException(err)
    }
  }
