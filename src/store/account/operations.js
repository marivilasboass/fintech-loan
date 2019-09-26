import Sentry from 'sentry-expo'
import { isValid as isValidCpf } from '@fnando/cpf/dist/node'
import { isValid as isValidCnpj } from '@fnando/cnpj/dist/node'
import { normalize } from 'normalizr'
import qs from 'qs'
import { Constants } from 'expo'
import { Platform } from 'react-native'
import config from '~/../config'
import { registerPushNotificationToken } from '~/services/pushNotification'
import { setAuth, destroyAuth } from '~/services/api'
import { asyncGetCachedImageURI } from '~/services/cache'
import * as analytics from '~/services/analytics'
import { attemptToGetLocation } from '~/services/location'
import * as R from 'ramda'
import { noticesOperations } from '../notices'
import { paginatedLoansOperations } from '../paginatedLoans'
import { usersOperations } from '../users'
import { userSchema } from '../users/schema'
import * as registerActions from '../register/actions'
import * as accountActions from './actions'
import * as accountSelectors from './selectors'

export const update = accountActions.update

export const login = () =>
  async (dispatch, getState, { api }) => {
    dispatch(accountActions.loading())

    const { username, password } = accountSelectors.getAccount(getState())
    if (username.length < 12) {
      if (!isValidCpf(username)) {
        dispatch(accountActions.error('CPF inválido'))
        return
      }
    }
    if (username.length >= 12) {
      if (!isValidCnpj(username)) {
        dispatch(accountActions.error('CNPJ inválido'))
        return
      }
    }

    if (password.length !== 6) {
      dispatch(accountActions.error('Senha deve ter 6 dígitos'))
      return
    }

    try {
      const { data: signInResponse } = await api.post('new-auth/public/signIn', { username, password }, { noAuth: true })

      const auth = setAuth(signInResponse.data)

      await dispatch(fetchAccount())
      await dispatch(accountActions.update({ auth }))

      dispatch(afterLogin())
      return
    } catch (err) {
      if (err.response && err.response.status === 401) {
        dispatch(accountActions.error('CPF ou senha inválida'))
        return
      }

      Sentry.captureException(err)
      dispatch(accountActions.error('Não foi possível conectar-se a Mutual, tente novamente mais tarde'))
    }
  }

export const loginFromStorage = () =>
  async (dispatch, getState, { api }) => {
    const authFromStorage = accountSelectors.getAuth(getState())
    if (authFromStorage) {
      try {
        const auth = setAuth(authFromStorage)

        const account = await dispatch(fetchAccount({ ignoreExpiry: true }))
        dispatch(accountActions.update({ auth }))
        dispatch(afterLogin())
        return account
      } catch (err) { }
    }
    return false
  }

export const logout = () =>
  async (dispatch, getState) => {
    dispatch(accountActions.reset())
    dispatch(registerActions.reset())
    dispatch(accountActions.update({ auth: null }))

    destroyAuth()
  }

export const deleteAccount = (userType) =>
  async (dispatch, getState, { api }) => {
    try {
      await api.post(`account/deleteAccount`)
    } catch (err) {
      Sentry.captureException(err)
      userType === 'investor'
        ? dispatch(accountActions.error('Não foi possível desativar a conta, por favor verifique se possui algum investimento ativo'))
        : dispatch(accountActions.error('Não foi possível desativar a conta, por favor verifique se possui algum empréstimo ativo'))
    }
  }

export const clearError = () =>
  async (dispatch) => {
    dispatch(accountActions.clearError())
  }

export const cacheProfilePicture = () =>
  async (dispatch, getState) => {
    const { profilePicture, tempProfilePicture } = accountSelectors.getAccount(getState())

    if (!profilePicture && !tempProfilePicture) {
      return
    }

    const picture = tempProfilePicture || profilePicture
    if (picture.small) {
      const smallProfilePicture = await asyncGetCachedImageURI(picture.small)
      dispatch(accountActions.update({ smallProfilePicture }))
    }

    if (picture.large) {
      const largeProfilePicture = await asyncGetCachedImageURI(picture.large)
      dispatch(accountActions.update({ largeProfilePicture }))
    }
  }

export const acceptTerms = (type = 'borrower') =>
  async (dispatch, getState, { api }) => {
    dispatch(accountActions.loading())
    const path = type === 'borrower'
      ? 'acceptBorrowerTerms'
      : 'acceptInvestorTerms'

    try {
      await api.post(`account/${path}`)

      const update = type === 'borrower'
        ? { acceptedBorrowerTermsAt: new Date() }
        : { acceptedInvestorTermsAt: new Date() }

      dispatch(accountActions.update(update))
    } catch (err) {
      Sentry.captureException(err)
      dispatch(accountActions.error('Não foi possível conectar-se a Mutual, tente novamente mais tarde'))
    }
  }

export const saveSuitabilityAnswers = (answers) =>
  async (dispatch, getState, { api }) => {
    dispatch(accountActions.loading())
    try {
      await api.post(`account/suitability`, { answers })
    } catch (err) {
      Sentry.captureException(err)
      dispatch(accountActions.error('Não foi possível conectar-se a Mutual, tente novamente mais tarde'))
    }
  }

export const updateBank = ({ accountType, account, agency, code }) =>
  async (dispatch, getState, { api }) => {
    dispatch(accountActions.loading())

    try {
      await api.put(`account/pf/bank`, {
        accountType,
        account,
        agency,
        code
      })

      const bank = { accountType, account, agency, code }

      dispatch(accountActions.update({ bank }))
      return true
    } catch (err) {
      Sentry.captureException(err)
      dispatch(accountActions.error('Não foi possível conectar-se a Mutual, tente novamente mais tarde'))
      return false
    }
  }

export const afterLogin = () =>
  async (dispatch, getState) => {
    const nickname = accountSelectors.getNickname(getState())
    const email = accountSelectors.getEmail(getState())
    const phone = accountSelectors.getPhone(getState())
    const userType = accountSelectors.getUserType(getState())
    const { profilePicture } = accountSelectors.getAccount(getState())
    dispatch(cacheProfilePicture())

    dispatch(noticesOperations.fetchNoticesCount())
    dispatch(paginatedLoansOperations.startPagination())

    registerPushNotificationToken(nickname, profilePicture.small, phone, email)
    dispatch(fetchIuguBalance())
    dispatch(track())
    dispatch(identify())
    dispatch(update({ activeMenuType: userType }))
  }

export const changeFlagStatus = (flag, value) =>
  (dispatch, getState) => {
    dispatch(update({ flags: { [flag]: value } }))
  }

export const identify = () =>
  (dispatch, getState) => {
    const name = accountSelectors.getNickname(getState())
    const email = accountSelectors.getEmail(getState())
    const phone = accountSelectors.getPhone(getState())
    const profilePicture = accountSelectors.getLargeProfilePicture(getState())
    const _id = accountSelectors.getId(getState())
    const username = accountSelectors.getUsername(getState())
    const userType = accountSelectors.getUserType(getState())
    const { cep, city, neighborhood, street, state } = accountSelectors.getAddress(getState())
    const age = accountSelectors.getAge(getState())
    const maritalStatus = accountSelectors.getMaritalStatus(getState())
    const gender = accountSelectors.getGender(getState())
    const birthDate = accountSelectors.getBirthDate(getState())
    const platform = Platform.OS
    const version = Platform.Version
    const { deviceName, deviceYearClass } = Constants

    analytics.identify(_id, {
      email,
      phone,
      name,
      username,
      gender,
      userType,
      profilePicture,
      cep,
      city,
      neighborhood,
      street,
      state,
      age,
      deviceName,
      deviceYearClass,
      platform,
      version,
      maritalStatus,
      birthDate
    })
  }

export const requestWithdrawal = (amount) =>
  async (dispatch, getState, { api }) => {
    try {
      dispatch(accountActions.loading())

      const amountCents = Math.round(amount * 100)

      await api.post('iugu/account/requestWithdrawal', { amountCents })

      const currentBalance = accountSelectors.getBalance(getState())
      const balanceCents = Math.round(currentBalance * 100) - amountCents

      dispatch(accountActions.update({ balanceCents }))
    } catch (err) {
      Sentry.captureException(err)
      throw err
    }
  }

export const fetchAccount = (options = {}) =>
  async (dispatch, getState, { api }) => {
    try {
      dispatch(accountActions.update({ loading: true }))
      const { data: accountResponse } = await api.get('account/me', null, options)
      const { data: account } = accountResponse
      dispatch(accountActions.update(account, { loading: false }))
      const { entities } = normalize(account, userSchema)
      dispatch(usersOperations.receive(entities.user))
      return account
    } catch (err) {
      Sentry.captureException(err)
      dispatch(accountActions.update({ loading: false }))
      throw err
    }
  }

export const fetchIuguBalance = () =>
  async (dispatch, getState, { api }) => {
    try {
      dispatch(accountActions.loading())
      const { data } = await api.get(`iugu/account/balance`)
      const { balanceCents, committedBalanceCents } = data.data
      dispatch(accountActions.update({ balanceCents, committedBalanceCents, balanceError: false }))
    } catch (err) {
      // We receive a 404 error when user doesn't have a wallet yet
      dispatch(accountActions.update({ loading: false }))
      if (err.response || err.response.status === 404) {
        dispatch(accountActions.error('Erro ao atualizar carteira'))
        dispatch(accountActions.update({ balanceError: true }))
      }
      Sentry.captureException(err)
    }
  }

export const fetchPendingBankChange = () =>
  async (dispatch, getState, { api }) => {
    try {
      const { data: response } = await api.get(`iugu/account/pendingBankChange`)

      dispatch(accountActions.update({ pendingBankChange: response.data }))
      return response.data
    } catch (err) {
      Sentry.captureException(err)
      throw err
    }
  }

export const verifyPassword = (password) =>
  async (dispatch, getState, { api }) => {
    try {
      await api.post('account/password/valid', { password })
      return true
    } catch (err) {
      if (!err.response || err.response.status !== 400) {
        Sentry.captureException(err)
      }
    }

    return false
  }

const uploadDocumentToS3 = async ({ image, uploadUrl }) => new Promise((resolve, reject) => {
  // Using XMLHttpRequest because of fetch crash: https://github.com/facebook/react-native/issues/10756
  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        resolve()
      } else {
        reject(new Error(`Failed to upload image ${xhr.statusText}`))
      }
    }
  }
  xhr.open('PUT', uploadUrl)
  const fileType = 'image/jpeg'
  xhr.setRequestHeader('Content-Type', fileType)
  xhr.send({ uri: image.uri, type: fileType })
})

const uploadDocumentsToS3 = async (documents) => {
  const uploadDocumentsPromises = documents.map(uploadDocumentToS3)

  await Promise.all(uploadDocumentsPromises)
}

export const submitSingleDocument = (documentType, documentImage, metadata) =>
  async (dispatch, getState, { api }) => {
    try {
      const queryString = metadata ? `?${qs.stringify(metadata)}` : ''
      const { data: uploadUrlsRequest } = await api.get(`/account/pf/aws/${documentType}${queryString}`)
      const { data: uploadUrls } = uploadUrlsRequest
      await uploadDocumentsToS3([
        { image: documentImage, uploadUrl: uploadUrls.original }
      ])
    } catch (err) {
      Sentry.captureException(err)
      throw err
    }
  }

export const submitDoubleDocument = (documentType, frontImage, backImage, metadata) =>
  async (dispatch, getState, { api }) => {
    try {
      const queryString = metadata ? `?${qs.stringify(metadata)}` : ''
      const { data: uploadUrlsRequest } = await api.get(`/account/pf/aws/${documentType}${queryString}`)
      const { data: uploadUrls } = uploadUrlsRequest

      await uploadDocumentsToS3([
        { image: frontImage, uploadUrl: uploadUrls.front },
        { image: backImage, uploadUrl: uploadUrls.back }
      ])
    } catch (err) {
      Sentry.captureException(err)
      throw err
    }
  }

export const submitPersonalInformation = (maritalStatus, spouseName, gender) =>
  async (dispatch, getState, { api }) => {
    const body = {
      maritalStatus,
      spouseName: spouseName || undefined,
      gender
    }
    try {
      await api.put('account/pf/personalInformation', body)
      dispatch(accountActions.update({ pendencies: { personalInformation: { status: 'approved' } } }))
    } catch (err) {
      Sentry.captureException(err)
      throw err
    }
  }

export const submitBank = ({ accountType, account, agency, code }) =>
  async (dispatch, getState, { api }) => {
    try {
      await api.post('account/pf/bank', {
        accountType,
        account,
        agency,
        code
      })

      const bank = { accountType, account, agency, code }

      dispatch(accountActions.update({ bank, pendencies: { bank: { status: 'approved' } } }))
      return true
    } catch (err) {
      Sentry.captureException(err)
      return false
    }
  }

export const submitAddress = (address) =>
  async (dispatch, getState, { api }) => {
    try {
      await api.post('account/pf/address', address)
    } catch (err) {
      Sentry.captureException(err)
      throw err
    }
  }

export const sendSupport = (body) =>
  async (dispatch, getState, { api }) => {
    try {
      await api.post(`notification/sendSupport`, { body })
    } catch (err) {
      Sentry.captureException(err)
      throw err
    }
  }

export const updateEmail = ({ email }) =>
  async (dispatch, getState, { api }) => {
    try {
      const { data: result } = await api.post(`account/pf/email`, { email })
      const { data } = result
      dispatch(accountActions.update({ email: data.email, oldEmails: data.oldEmails }))
    } catch (err) {
      err.response.data.code === 'EMAIL_ALREADY_IN_USE'
        ? dispatch(accountActions.error('Este endereço de email já está sendo utilizado'))
        : dispatch(accountActions.error('Houve um erro ao atualizar seus dados.'))
      Sentry.captureException(err)
    }
  }

export const track = () =>
  async (dispatch, getState, { api }) => {
    try {
      const appVersion = config.version
      const { expoVersion, installationId, deviceName, deviceYearClass, sessionId, platform: { ios, android } } = Constants

      const dataToSend = { appVersion, expoVersion, installationId, deviceName, deviceYearClass, sessionId, ios, android }

      const location = await attemptToGetLocation()
      if (location) {
        dataToSend.location = location
      }

      await api.post('account/track', dataToSend)
    } catch (err) {
      Sentry.captureException(err)
    }
  }

export const saveInvestorOnboardingAnswers = (questionnaire) =>
  async (dispatch, getState, { api }) => {
    const answers = Object.values(questionnaire).map(R.pick(['code', 'answer']))
    try {
      const { data: result } = await api.post('account/user/answerQuestions', { answers, acceptedLowRiskProfileTerms: true })
      const { data } = result
      analytics.track(`Investor${data.currentlyProfile}`, { answers, time: new Date() })
      dispatch(accountActions.update({ userInvestorProfile: data.currentlyProfile }))
    } catch (err) {
      dispatch(accountActions.error('Oops', 'Houve um problema durante a simulação de empréstimo, favor entrar em contato com nosso setor de atendimento'))
      Sentry.captureException(err)
    }
  }
