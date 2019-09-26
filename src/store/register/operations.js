import Sentry from 'sentry-expo'

import { track } from '~/services/analytics'
import { setAuth } from '~/services/api'

import { accountOperations } from '../account'

import * as registerActions from './actions'
import * as registerSelectors from './selectors'

export const update = registerActions.update

export const register = (location) =>
  async (dispatch, getState, { api }) => {
    const accountToRegister = registerSelectors.getRegister(getState())

    const { nickname, username, email, password, phone, userType } = accountToRegister

    const isBorrower = userType === 'borrower'

    try {
      if (!location) {
        throw new Error('NO_LOCATION')
      }

      const registerData = {
        nickname,
        username,
        password,
        email,
        phone,
        userType,
        location
      }

      await api.post('new-auth/public/signUp', registerData, { noAuth: true })
      const { data: signInResponse } = await api.post('new-auth/public/signIn', { username, password }, { noAuth: true })

      const auth = setAuth(signInResponse.data)

      await dispatch(accountOperations.update({
        auth,
        shownApprovedAlert: false,
        borrowerRedirect: isBorrower
      }))

      const account = await dispatch(accountOperations.fetchAccount())

      track('Registered')
      if (isBorrower) {
        track('RegisteredBorrower')
      } else {
        track('RegisteredInvestor')
      }

      dispatch(accountOperations.afterLogin())

      return account
    } catch (err) {
      const { response } = err

      if (err.message === 'NO_LOCATION') {
        throw err
      }

      if (response.status === 400 && response.data) {
        const { code } = response.data
        if (isBorrower && (code === 'REGISTRATION_DATA_NOT_FOUND' || code === 'MISSING_CPF_REQUIRED_DATA')) {
          throw new Error('REGISTRATION_DATA_NOT_FOUND_BORROWER')
        }
        throw new Error(code)
      }

      Sentry.captureException(err)
      throw new Error('SYSTEM_ERROR')
    }
  }

export const checkIfAccountExists = () =>
  async (dispatch, getState, { api }) => {
    const { email, username, phone } = registerSelectors.getRegister(getState())

    try {
      const body = { email, cpf: username, phone }
      await api.post('account/public/pf/exists', body, { noAuth: true })
      return false
    } catch (err) {
      if (err.response && err.response.status === 404) {
        return true
      }

      throw err
    }
  }

export const sendEmailToResetPassword = (cpf) =>
  async (dispatch, getState, { api }) => {
    dispatch(registerActions.loading())

    const username = cpf.replace('.', '').replace('.', '').replace('-', '')

    const { data } = await api.post('account/public/pf/password/requestReset', { username }, { noAuth: true })

    return data
  }

export const generatePhoneCode = () =>
  async (dispatch, getState, { api }) => {
    const phone = registerSelectors.getPhone(getState())
    try {
      await api.post('account/public/pf/phone/generateCode', { phone }, { noAuth: true })
    } catch (err) {
      const { response } = err

      if (response && response.data && (response.status === 400 || response.status === 404)) {
        const { code } = response.data
        throw new Error(code)
      }

      Sentry.captureException(err)
      throw new Error('SYSTEM_ERROR')
    }
  }

export const validatePhoneCode = () =>
  async (dispatch, getState, { api }) => {
    const code = parseInt(registerSelectors.getCode(getState()))
    const phone = registerSelectors.getPhone(getState())
    try {
      await api.post('account/public/pf/phone/validateCode', { code, phone }, { noAuth: true })
    } catch (err) {
      const { response } = err

      if ((response.status === 400 && response.data) || response.status === 404) {
        const { code } = response.data
        throw new Error(code)
      }

      Sentry.captureException(err)
      throw new Error('SYSTEM_ERROR')
    }
  }
