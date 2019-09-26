import R from 'ramda'
import * as dashboardTypes from './types'

export const initialState = {
  loading: false,
  error: false,
  dashboardActiveConfig: 'Esperado',
  statusActiveConfig: 'General',
  totalReturned: {
    totalReturnedPercents: 0,
    totalReturnedPercentsWithDefaultRate: 0,
    cdiComparedMonthlyProfitPercent: 0,
    cdiComparedMonthlyProfitPercentWithDefaultRate: 0
  },
  installmentsReceived: {
    interestCents: 0,
    interestPercent: 0,
    investedCents: 0,
    investedPercent: 0
  },
  lateLoans: {
    firstRange: {
      total: 0,
      totalCents: 0,
      totalPercentsComparedWithOthers: 0
    },
    lastRange: {
      total: 0,
      totalCents: 0,
      totalPercentsComparedWithOthers: 0
    },
    secondRange: {
      total: 0,
      totalCents: 0,
      totalPercentsComparedWithOthers: 0
    },
    thirtyRange: {
      total: 0,
      totalCents: 0,
      totalPercentsComparedWithOthers: 0
    },
    totalLateLoans: 0,
    totalLateLoansCents: 0
  },
  lineGraphicValues: [
    {
      cdiComparedMonthlyProfitPercent: 0,
      cdiComparedMonthlyProfitPercentWithDefaultRate: 0,
      monthlyProfitPercent: 0,
      monthlyProfitPercentWithDefaultRate: 0,
      referenceDate: '2019-03'
    },
    {
      cdiComparedMonthlyProfitPercent: 0,
      cdiComparedMonthlyProfitPercentWithDefaultRate: 0,
      monthlyProfitPercent: 0,
      monthlyProfitPercentWithDefaultRate: 0,
      referenceDate: '2019-02'
    }
  ],
  totalDefaulters: {
    lateLoans: 0,
    totalInvestmentsLateCents: 0,
    lateLoansPercent: 0
  },
  totalEffected: {
    total: 0,
    totalFinancedAmountCents: 0
  },
  totalLoansApprovedPerScore: {
    A: {
      total: 0,
      totalPercent: 0
    },
    B: {
      total: 0,
      totalPercent: 0
    },
    C: {
      total: 0,
      totalPercent: 0
    },
    D: {
      total: 0,
      totalPercent: 0
    },
    E: {
      total: 0,
      totalPercent: 0
    },
    F: {
      total: 0,
      totalPercent: 0
    }
  },
  totalPending: {
    total: 0,
    totalFinancedAmountCents: 0
  },
  totalPlanned: {
    totalCents: 0,
    totalWithDefaultRateCents: 0
  },
  totalReceived: {
    loansPlannedToReceived: 0,
    loansReceived: 0,
    normalPercentCompared: 0,
    plannedToReceivedNormalPercentCompared: 0,
    plannedToReceivedWithDefaultRatePercentCompared: 0,
    totalCents: 0,
    totalToReceivedCents: 0,
    withDefaultRatePercentCompared: 0,
    totalToReceivedWithLateFinesCents: 0
  },
  totalReceivedOnCurrentMonth: {
    loansPlannedToReceived: 0,
    loansReceived: 0,
    totalCents: 0,
    totalToReceivedCents: 0
  },
  totalRecovered: {
    investmentRecoveredCents: 0,
    investmentRecoveredPercent: 0,
    loansRecovered: 0
  }
}

export const dashboardReducers = (state = initialState, action) => {
  switch (action.type) {
  case dashboardTypes.UPDATE:
    return R.mergeDeepRight(state, {
      ...action.dashboardUpdate,
      loading: false,
      error: false
    })
  case dashboardTypes.RESET:
    return initialState
  case dashboardTypes.LOADING:
    return { ...state, loading: true }
  case dashboardTypes.ERROR:
    return {
      ...state,
      error: action.message,
      loading: false
    }
  case dashboardTypes.CLEAR_ERROR:
    return { ...state, error: false }
  default:
    return state
  }
}
