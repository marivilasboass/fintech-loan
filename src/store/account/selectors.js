import moment from 'moment'
import math from 'mathjs'
import banks from '~/constants/banks'
import * as R from 'ramda'

import { getResolvedReport } from '~/services/pendencyStatus'

export const getAccount = (state) => state.account

export const getNickname = (state) => getAccount(state).nickname

export const getUsername = (state) => getAccount(state).username

export const getUserType = (state) => getAccount(state).userType

export const getPassword = (state) => getAccount(state).password

export const getEmail = (state) => getAccount(state).email

export const getScore = (state) => getAccount(state).score

export const getPhone = (state) => getAccount(state).phone

export const getBirthDate = (state) => getAccount(state).birthDate

export const getOldEmails = (state) => getAccount(state).oldEmails

export const getLastAnsweredSuitabilityAt = (state) => getAccount(state).lastAnsweredSuitabilityAt

export const getDaysSinceRegistration = (state) => {
  const { createdAt } = getAccount(state)

  if (!createdAt) {
    return 0
  }

  return moment().diff(createdAt, 'days')
}

export const getAddress = (state) => getAccount(state).address || {}

export const getBank = (state) => getAccount(state).bank

export const getFeatureFlags = (state) => getAccount(state).featureFlags

export const getFlags = (state) => getAccount(state).flags

export const getActiveMenuType = (state) => getAccount(state).activeMenuType

export const getLocalIdDocumentPendencies = (state) => {
  const { pendencies, sentIdDocumentAt } = getAccount(state)

  const secondsSinceSendingIdDocument = Math.round((Date.now() - sentIdDocumentAt) / 1000)

  if (secondsSinceSendingIdDocument > 30) {
    return R.pick(['selfie', 'idDocuments'], pendencies)
  }

  return {
    selfie: { status: 'loading' },
    idDocuments: {
      front: { status: 'loading' },
      back: { status: 'loading' }
    }
  }
}

export const getBankName = (state) => {
  const bank = getBank(state)
  return bank && bank.code ? banks[bank.code].name : ''
}

export const getLocalAddressPendency = (state) => {
  const { pendencies, sentAddressAt } = getAccount(state)
  const secondsSinceSendingAddress = Math.round((Date.now() - sentAddressAt) / 1000)

  if (secondsSinceSendingAddress > 30) {
    return R.pick(['address', 'addressProof'], pendencies)
  }

  return {
    address: { status: 'loading' },
    addressProof: { status: 'loading' }
  }
}

export const getPendencies = (state) => {
  const { pendencies, sentIdDocumentAt, sentAddressAt } = getAccount(state)

  if (!sentIdDocumentAt && !sentAddressAt) {
    return pendencies
  }

  // workaround because of delay between S3 -> account service
  return {
    ...pendencies,
    ...getLocalAddressPendency(state),
    ...getLocalIdDocumentPendencies(state)
  }
}

export const getAuth = (state) => getAccount(state).auth

export const getId = (state) => getAccount(state)._id

export const getSmallProfilePicture = (state) => getAccount(state).smallProfilePicture

export const getLargeProfilePicture = (state) => getAccount(state).largeProfilePicture

export const getBalance = (state) => {
  const balanceCents = getAccount(state).balanceCents
  return math.divide(balanceCents, 100)
}

export const getCommittedBalanceCents = (state) => {
  const committedBalanceCents = getAccount(state).committedBalanceCents
  return math.divide(committedBalanceCents, 100)
}

export const getStatus = (state) => getAccount(state).status

export const getProperty = (state, property) => getAccount(state)[property]

export const getLoading = (state) => getAccount(state).loading

export const getError = (state) => getAccount(state).error

export const getBalanceError = (state) => getAccount(state).balanceError

export const getAge = (state) => {
  const birth = getBirthDate(state)

  if (birth) {
    return moment().diff(moment(birth), 'years')
  }

  return getAccount(state).age
}

export const getUserInvestorProfile = (state) => getAccount(state).userInvestorProfile

export const getFirstName = (state) => {
  const nickname = getNickname(state)

  if (nickname && nickname.length > 0) {
    return nickname.split(' ')[0]
  }

  return ''
}

export const getGender = (state) => getAccount(state).gender

export const getOccupation = (state) => getAccount(state).occupation

export const getRemainingPendenciesCount = (state) => {
  const { pendencies } = getAccount(state)
  const { resolved, total } = getResolvedReport(pendencies)

  return total - resolved
}

export const getPendenciesResolvedPercentage = (state) => {
  const { pendencies } = getAccount(state)
  const { resolved, total } = getResolvedReport(pendencies)

  const percentResolved = resolved / total

  return percentResolved
}

export const isSelf = (state, _id) => getId(state) === _id

export const isAddressValid = (state) => {
  const address = getAddress(state)

  return address && address.cep.length === 8 && address.number.length > 0
}

export const isBankValid = (state) => {
  const bank = getBank(state)

  return bank && bank.code && bank.agency && bank.account && bank.earnings
}

export const hasPendingBankChange = (state) => getAccount(state).pendingBankChange

export const getRequestedMoney = (state) => getAccount(state).requestedMoney

export const getMaritalStatus = (state) => getAccount(state).maritalStatus

export const getFinancialService = (state) => getFeatureFlags(state).enableBmp ? 'bmp' : 'parati'

export const getAcceptedBorrowerTermsAt = (state) => getAccount(state).acceptedBorrowerTermsAt

export const getIsPJ = (state) => getAccount(state).personType === 'PJ'

export const getFeeDiscount = (state) => getAccount(state).feeDiscount

export const getTestABFlags = (state) => getAccount(state).testABFlags
