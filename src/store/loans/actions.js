import * as loansTypes from './types'

export const update = loanUpdate => ({
  type: loansTypes.UPDATE,
  loanUpdate
})

export const updateProfilePicture = (index, profilePicture) => ({
  type: loansTypes.UPDATE_PROFILE_PICTURE,
  index,
  profilePicture
})

export const receive = loans => ({
  type: loansTypes.RECEIVE,
  loans
})

export const remove = _id => ({
  type: loansTypes.REMOVE,
  _id
})

export const loading = () => ({
  type: loansTypes.LOADING
})

export const updateFilters = (filters) => ({
  type: loansTypes.UPDATE_FILTERS,
  filters
})

export const resetFilters = () => ({
  type: loansTypes.RESET_FILTERS
})

export const error = message => ({
  type: loansTypes.ERROR,
  message
})
