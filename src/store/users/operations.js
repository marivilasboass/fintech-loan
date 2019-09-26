
import Sentry from 'sentry-expo'
import { normalize } from 'normalizr'

import { asyncGetCachedImageURI } from '~/services/cache'

import * as usersActions from './actions'
import { userSchema } from './schema'
import { accountSelectors } from '../account'

export const fetchUser = (userId) =>
  async (dispatch, getState, { api }) => {
    try {
      const { data: response } = await api.get(`account/account/${userId}`)
      const { entities } = normalize(response.data, userSchema)

      dispatch(receive(entities.user))
    } catch (err) {
      Sentry.captureException(err)
    }
  }

export const receive = (users = {}) =>
  async (dispatch) => {
    dispatch(usersActions.receive(users))

    Object.values(users).map(user => {
      dispatch(fetchUserImages(user))
    })
  }

export const fetchUserImages = (user) =>
  async (dispatch, getState) => {
    const { profilePicture, tempProfilePicture, _id } = user
    const isSelf = accountSelectors.isSelf(getState(), _id)

    if (!profilePicture && !tempProfilePicture) {
      return
    }

    const picture = (isSelf && tempProfilePicture) || profilePicture
    if (picture.small) {
      const smallProfilePicture = await asyncGetCachedImageURI(picture.small)
      dispatch(usersActions.update(user._id, { smallProfilePicture }))
    }

    if (picture.large) {
      const largeProfilePicture = await asyncGetCachedImageURI(picture.large)
      dispatch(usersActions.update(user._id, { largeProfilePicture }))
    }
  }
