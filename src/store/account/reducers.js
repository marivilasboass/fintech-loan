import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import R from 'ramda'

import accountStatuses from '~/constants/accountStatuses'

import * as accountTypes from './types'

export const initialState = {
  _id: null,
  username: null,
  email: null,
  nickname: null,
  phone: null,
  balanceCents: 0,
  committedBalanceCents: 0,
  userType: null,
  hasIuguAccount: null,
  personType: null,

  smallProfilePicture: null,
  largeProfilePicture: null,
  activeMenuType: 'investor',
  userInvestorProfile: 'lowRisk',

  profilePicture: {
    small: null,
    medium: null,
    large: null
  },

  featureFlags: {
    enableExpectedReturn: false
  },

  testABFlags: {
  },

  flags: {
    hasInvestment: false,
    hasActiveLoan: false,
    hasToUpdatedSuitability: false
  },

  pendencies: {
    idDocuments: {
      front: { status: 'pending' },
      back: { status: 'pending' }
    },
    selfie: { status: 'pending' },
    personalInformation: { status: 'pending' },
    bank: { status: 'pending' },
    address: { status: 'pending' },
    addressProof: { status: 'pending' }
  },

  // workaround because of delay between S3 -> account service
  sentIdDocumentAt: null,
  sentAddressAt: null,

  status: accountStatuses.pendingData,
  createdAt: null,
  acceptedBorrowerTermsAt: null,
  acceptedInvestorTermsAt: null,
  suitabilityAnswers: null,
  acceptedSuitabilityAt: null,

  // From UnitFour
  gender: null,
  mothersName: null,

  // Personal information
  occupation: null,

  address: {
    cep: null,
    city: null,
    complement: null,
    houseNumber: null,
    neighborhood: null,
    state: null,
    street: null
  },
  bank: {
    account: null,
    accountType: 'cc',
    agency: null,
    code: null
  },

  birthDate: null,

  pressedFakeConfirmPendenciesButton: false,

  feeDiscount: 0
}

const reducers = (state = initialState, action) => {
  switch (action.type) {
  case accountTypes.UPDATE:
    return R.mergeDeepRight(state, {
      ...action.accountUpdate,
      loading: false,
      error: false
    })
  case accountTypes.RESET:
    return initialState
  case accountTypes.LOADING:
    return { ...state, loading: true }
  case accountTypes.ERROR:
    return {
      ...state,
      error: action.message,
      loading: false
    }
  case accountTypes.CLEAR_ERROR:
    return { ...state, error: false }
  case 'PUSH_NOTIFICATION':
    return handlePushNotification(state, action.notification)
  case accountTypes.CLEAR_USER_TRANSACTIONS: {
    return {
      ...state,
      noMoreTransactions: false,
      userTransactions: null
    }
  }
  default:
    return state
  }
}

const getRejectedPendencyFromNotification = notification => {
  const rejection = R.path(['variables', 'rejection'], notification)
  return {
    status: 'rejected',
    rejection
  }
}

const handlePushNotification = (state, notification) => {
  switch (notification.type) {
  case 'REGISTER_REJECTED':
    return {
      ...state,
      status: accountStatuses.noLimit
    }
  case 'REGISTER_PENDING_BACKOFFICE':
    return {
      ...state,
      status: accountStatuses.pendingBackOffice
    }
  case 'REGISTER_APPROVED_INVESTOR':
  case 'REGISTER_APPROVED_BORROWER':
    return {
      ...state,
      status: accountStatuses.approved
    }
  case 'PERSONAL_INFORMATION_PENDENCIES_REJECTED':
    return R.mergeDeepRight(state, {
      status: accountStatuses.pendingData,
      pendencies: {
        personalInformation: { ...getRejectedPendencyFromNotification(notification) }
      }
    })
  case 'ID_DOCUMENTS_PENDENCIES_REJECTED':
    return R.mergeDeepRight(state, {
      status: accountStatuses.pendingData,
      pendencies: {
        selfie: { ...getRejectedPendencyFromNotification(notification) },
        idDocuments: {
          front: { ...getRejectedPendencyFromNotification(notification) },
          back: { ...getRejectedPendencyFromNotification(notification) }
        }
      }
    })
  case 'ADDRESS_PENDENCIES_REJECTED':
    return R.mergeDeepRight(state, {
      status: accountStatuses.pendingData,
      pendencies: {
        address: { ...getRejectedPendencyFromNotification(notification) },
        addressProof: { ...getRejectedPendencyFromNotification(notification) }
      }
    })
  case 'BANK_PENDENCIES_REJECTED':
    return R.mergeDeepRight(state, {
      status: accountStatuses.pendingData,
      pendencies: {
        bank: { ...getRejectedPendencyFromNotification(notification) }
      }
    })
  case 'BANK_CHANGE_SUCCESS':
    return {
      ...state,
      pendingBankChange: null
    }
  default:
    return state
  }
}

const whitelist = ['auth', 'shownApprovedAlert']

const config = {
  key: 'account',
  storage,
  whitelist
}

export const accountReducers = persistReducer(config, reducers)
