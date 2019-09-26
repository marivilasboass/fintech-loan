
import jwtDecode from 'jwt-decode'
import config from '~/../config'
import { onTokenExpiry } from '../onTokenExpiry'
import { ResponseError } from '~/utils/ResponseError'

let auth = null

const defaultHeaders = {
  'Content-Type': 'application/json'
}

export const setAuth = (receivedAuth) => {
  if (!receivedAuth) {
    return
  }

  const jwt = jwtDecode(receivedAuth.IdToken)

  auth = {
    ...receivedAuth,
    ...jwt
  }

  return auth
}

export const destroyAuth = () => {
  auth = null
}

export const getAuth = () => auth

const createFetchFunction = (method) => async (url, receivedBody, options = {}) => {
  const { noAuth, ignoreExpiry } = options
  const baseURL = config.api.gwUrl

  const Authorization = !noAuth && auth && auth.IdToken

  const headers = defaultHeaders
  if (Authorization) {
    headers.Authorization = Authorization
  }

  const fullUrl = `${baseURL}/${url}`

  const init = {
    headers,
    method
  }
  if (receivedBody) {
    const body = JSON.stringify(receivedBody)
    init.body = body
  }

  try {
    const response = await wrappedFetch(fullUrl, init)

    return response
  } catch (firstErr) {
    const couldRefresh = Authorization && firstErr.response && firstErr.response.status === 401
    if (!couldRefresh) {
      throw firstErr
    }

    try {
      const response = await attemptToRefreshAndRetry(fullUrl, init)
      return response
    } catch (err) {
      if (!ignoreExpiry) {
        onTokenExpiry()
      }

      throw firstErr
    }
  }
}

const wrappedFetch = async (fullUrl, init) => {
  const timeout = new Promise((resolve, reject) => {
    const { timeout } = config.api
    return setTimeout(() => reject(new Error('Request timeout')), timeout)
  })

  const fetchPromise = fetch(fullUrl, init)

  const response = await Promise.race([fetchPromise, timeout])

  response.data = await safelyParseJson(response)

  if (!response.ok) {
    throw new ResponseError(response)
  }

  return response
}

const safelyParseJson = async (response) => {
  try {
    const json = await response.json()
    return json
  } catch (err) {
    return {}
  }
}

const attemptToRefreshAndRetry = async (fullUrl, init) => {
  const { RefreshToken: refreshToken } = auth

  const refreshedAuth = await refreshAuth(refreshToken)
  // We need to keep the old auth since the refreshed auth doesn't come with a `RefreshToken`
  setAuth({ ...auth, ...refreshedAuth })

  const Authorization = auth.IdToken
  const updatedInit = {
    ...init,
    headers: { ...init.headers, Authorization }
  }

  const response = await wrappedFetch(fullUrl, updatedInit)
  return response
}

const refreshAuth = async (token) => {
  const body = JSON.stringify({ token })
  const headers = defaultHeaders
  const method = 'POST'
  const url = `${config.api.gwUrl}/new-auth/public/refreshToken`

  const { data: refreshResponse } = await wrappedFetch(url, { body, headers, method })

  return refreshResponse.data
}

export const api = {
  get: createFetchFunction('GET'),
  post: createFetchFunction('POST'),
  delete: createFetchFunction('DELETE'),
  put: createFetchFunction('PUT'),
  patch: createFetchFunction('PATCH'),
  options: createFetchFunction('OPTIONS'),
  head: createFetchFunction('HEAD')
}
