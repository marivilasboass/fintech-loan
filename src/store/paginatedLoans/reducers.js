import R from 'ramda'

import * as paginatedLoansTypes from './types'
import limits from '~/constants/filter'

export const initialState = {
  loans: [],
  page: 0,
  pageSize: 5,
  loading: false,
  endReached: false,
  listView: true,
  hasFiltered: false,
  filters: {
    financedAmountCents: {
      ...limits.loan
    },
    age: {
      ...limits.age
    },
    incomeCents: {
      ...limits.income
    },
    genders: [],
    city: {},
    state: {},
    motives: [],
    bestPayDays: [],
    numberOfInstallments: [],
    scores: []
  },
  currentIndexFlatLoan: 0
}

export const paginatedLoansReducers = (state = initialState, action) => {
  switch (action.type) {
  case paginatedLoansTypes.NEXT_PAGE:
    return {
      ...state,
      page: state.page + 1
    }
  case paginatedLoansTypes.CHANGE_PAGE_SIZE:
    return {
      ...state,
      page: 0,
      pageSize: action.newSize
    }
  case paginatedLoansTypes.END_REACHED: {
    return {
      ...state,
      endReached: true
    }
  }
  case paginatedLoansTypes.UPDATE_FILTERS:
    return {
      ...state,
      hasFiltered: true,
      filters: {
        ...state.filters,
        ...action.filters
      }
    }
  case paginatedLoansTypes.APPEND:
    return {
      ...state,
      loans: R.uniq([...state.loans, ...action.loans]),
      loading: false
    }

  case paginatedLoansTypes.TOGGLE_VIEW:
    return {
      ...state,
      listView: !state.listView
    }
  case paginatedLoansTypes.RESET_PAGINATION:
    return {
      ...state,
      loans: initialState.loans,
      page: initialState.page,
      endReached: initialState.endReached,
      pageSize: initialState.pageSize,
      loading: initialState.loading,
      currentIndexFlatLoan: initialState.currentIndexFlatLoan
    }
  case paginatedLoansTypes.RESET_FILTERS:
    return {
      ...state,
      hasFiltered: false,
      filters: initialState.filters,
      loading: initialState.loading
    }
  case paginatedLoansTypes.LOADING:
    return { ...state, loading: true }
  case paginatedLoansTypes.CLEAR:
    return initialState
  case paginatedLoansTypes.UPDATE_CURRENT_INDEX_FLAT_LOANS:
    return { ...state, currentIndexFlatLoan: action.currentIndexFlatLoan }
  default:
    return state
  }
}
