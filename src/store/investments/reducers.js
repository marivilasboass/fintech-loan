import R from 'ramda'

import * as investmentsTypes from './types'

const initialState = {
  error: '',
  filters: {
    payDays: [],
    numberOfInstallments: [],
    scores: [],
    analysisStatus: null,
    paymentStatus: null
  },
  currentIndexFlatInvestments: 0,
  all: {
    page: 0,
    pageSize: 5,
    endReached: false,
    list: {},
    investments: []
  },
  regular: {
    page: 0,
    pageSize: 5,
    endReached: false,
    list: {},
    investments: []
  },
  late: {
    page: 0,
    pageSize: 5,
    endReached: false,
    list: {},
    investments: []
  },
  installments: [],
  selectedInstallment: {}
}

export const investmentsReducers = (state = initialState, action) => {
  switch (action.type) {
  case investmentsTypes.RECEIVE:
    return {
      ...state,
      [action.paymentStatus]: {
        ...state[action.paymentStatus],
        list: { ...state[action.paymentStatus].list, ...action.investmentsList }
      },
      error: '',
      loading: false
    }
  case investmentsTypes.RECEIVE_INSTALLMENTS:
    return {
      ...state,
      loading: false,
      installments: action.installments
    }
  case investmentsTypes.NEXT_PAGE:
    return {
      ...state,
      [action.paymentStatus]: {
        ...state[action.paymentStatus],
        page: state[action.paymentStatus].page + 1
      }
    }
  case investmentsTypes.UPDATE_FILTERS: {
    return {
      ...state,
      filters: {
        ...state.filters,
        ...action.filters
      }
    }
  }
  case investmentsTypes.APPEND: {
    return {
      ...state,
      loading: false,
      [action.paymentStatus]: {
        ...state[action.paymentStatus],
        investments: R.uniq([...state[action.paymentStatus].investments, ...action.investments])
      }
    }
  }
  case investmentsTypes.END_REACHED:
    return {
      ...state,
      loading: false,
      [action.paymentStatus]: {
        ...state[action.paymentStatus],
        endReached: true
      }
    }
  case investmentsTypes.RESET_PAGINATION:
    return {
      ...state,
      [action.paymentStatus]: initialState[action.paymentStatus],
      loading: initialState.loading,
      currentIndexFlatInvestments: initialState.currentIndexFlatInvestments
    }
  case investmentsTypes.RESET_FILTERS:
    return {
      ...state,
      filters: initialState.filters,
      loading: initialState.loading
    }
  case investmentsTypes.SELECT_INSTALLMENT:
    return { ...state, selectedInstallment: action.installment }
  case investmentsTypes.CLEAR_INSTALLMENTS:
    return { ...state, installments: initialState.installments }
  case investmentsTypes.CLEAR_INSTALLMENT:
    return { ...state, selectedInstallment: initialState.selectedInstallment }
  case investmentsTypes.LOADING:
    return { ...state, loading: true }
  case investmentsTypes.UPDATE_CURRENT_INDEX_FLAT_LOANS:
    return { ...state, currentIndexFlatInvestments: action.currentIndexFlatInvestments }
  case investmentsTypes.ERROR:
    return { ...state, error: action.message, loading: false }
  case investmentsTypes.CLEAR:
    return initialState
  default:
    return state
  }
}
