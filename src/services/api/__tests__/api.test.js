import { api, setAuth, destroyAuth, getAuth } from '../api'
import * as onTokenExpiryModule from '../../onTokenExpiry'
import jestFetchMock from 'jest-fetch-mock'

describe('api', () => {
  beforeAll(() => {
    global.fetch = jestFetchMock
  })

  afterEach(() => {
    fetch.resetMocks()
    destroyAuth()
    onTokenExpiryModule.onTokenExpiry = jest.fn()
  })

  it('should succeed upon a 200 response [GET]', async () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 'success' }), { status: 200 })
    const response = await api.get('https://mutual.club')
    expect(response.status).toEqual(200)
    expect(response.data.status).toEqual('success')
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('should succeed upon a 200 response [POST]', async () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 'success' }), { status: 200 })
    const response = await api.post('https://mutual.club', { foo: 'bar' })
    expect(response.status).toEqual(200)
    expect(response.data.status).toEqual('success')
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('should throw an error upon a 400 response [GET]', async () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 'fail' }), { status: 400 })

    try {
      await api.get('https://mutual.club')
      expect(true).toEqual(false)
    } catch (err) {
      expect(err.response.status).toEqual(400)
      expect(err.response.data.status).toEqual('fail')
      expect(fetch).toHaveBeenCalledTimes(1)
    }
  })

  it('should throw an error upon a 400 response [PATCH]', async () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 'fail' }), { status: 400 })

    try {
      await api.patch('https://mutual.club')
      expect(true).toEqual(false)
    } catch (err) {
      expect(err.response.status).toEqual(400)
      expect(err.response.data.status).toEqual('fail')
      expect(fetch).toHaveBeenCalledTimes(1)
    }
  })

  it('should throw an error upon a 500 response [GET]', async () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 'error' }), { status: 500 })

    try {
      await api.get('https://mutual.club')
      expect(true).toEqual(false)
    } catch (err) {
      expect(err.response.status).toEqual(500)
      expect(err.response.data.status).toEqual('error')
      expect(fetch).toHaveBeenCalledTimes(1)
    }
  })

  it('should throw an error upon a 500 response [HEAD]', async () => {
    fetch.mockResponseOnce(JSON.stringify({ status: 'error' }), { status: 500 })

    try {
      await api.head('https://mutual.club')
      expect(true).toEqual(false)
    } catch (err) {
      expect(err.response.status).toEqual(500)
      expect(err.response.data.status).toEqual('error')
      expect(fetch).toHaveBeenCalledTimes(1)
    }
  })

  it('should refresh upon a 401 error', async () => {
    const mockInitialIdToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    const mockRefreshedIdToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODk5IiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.vh550jBSyRy-00xkbWpeesFXMJLWUYTu1yAANmgZdeY'
    const mockRefreshToken = 'REFRESH_TOKEN'
    setAuth({ RefreshToken: mockRefreshToken, IdToken: mockInitialIdToken })
    expect(getAuth().sub).toEqual('1234567890')

    fetch.mockResponses(
      [JSON.stringify({ status: 'fail' }), { status: 401 }],
      [JSON.stringify({ status: 'success', data: { IdToken: mockRefreshedIdToken } }), { status: 200 }],
      [JSON.stringify({ status: 'success' }), { status: 200 }]
    )

    const response = await api.get('https://google.com')
    expect(response.status).toEqual(200)
    expect(response.data.status).toEqual('success')
    expect(getAuth().sub).toEqual('1234567899')
    expect(getAuth().IdToken).toEqual(mockRefreshedIdToken)
    expect(getAuth().RefreshToken).toEqual(mockRefreshToken)
    expect(fetch).toHaveBeenCalledTimes(3)

    const refreshBody = JSON.parse(fetch.mock.calls[1][1].body)
    expect(refreshBody.token).toEqual(mockRefreshToken)
  })

  it('should not refresh if noAuth is true', async () => {
    const mockInitialToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    setAuth({ IdToken: mockInitialToken })
    expect(getAuth().sub).toEqual('1234567890')

    fetch.mockResponses(
      [JSON.stringify({ status: 'fail' }), { status: 401 }],
      [JSON.stringify({ status: 'success' }), { status: 200 }]
    )

    try {
      await api.get('https://google.com', null, { noAuth: true })
      expect(true).toEqual(false)
    } catch (err) {
      expect(err.response.status).toEqual(401)
      expect(err.response.data.status).toEqual('fail')
      expect(fetch).toHaveBeenCalledTimes(1)
    }
  })

  it(`should give up when it can't refresh`, async () => {
    const mockInitialToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    setAuth({ IdToken: mockInitialToken })
    expect(getAuth().sub).toEqual('1234567890')

    fetch.mockResponses(
      [JSON.stringify({ status: 'fail', original: true }), { status: 401 }],
      [JSON.stringify({ status: 'fail' }), { status: 401 }]
    )

    try {
      await api.get('https://google.com')
      expect(true).toEqual(false)
    } catch (err) {
      expect(err.response.status).toEqual(401)
      expect(err.response.data.original).toEqual(true)
      expect(onTokenExpiryModule.onTokenExpiry).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledTimes(2)
    }
  })

  it(`should not call onTokenExpiry when it can't refresh if ignoreExpiry is true`, async () => {
    const mockInitialToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    setAuth({ IdToken: mockInitialToken })
    expect(getAuth().sub).toEqual('1234567890')

    fetch.mockResponses(
      [JSON.stringify({ status: 'fail', original: true }), { status: 401 }],
      [JSON.stringify({ status: 'fail' }), { status: 401 }]
    )

    try {
      await api.get('https://google.com', null, { ignoreExpiry: true })
      expect(true).toEqual(false)
    } catch (err) {
      expect(err.response.status).toEqual(401)
      expect(err.response.data.original).toEqual(true)
      expect(onTokenExpiryModule.onTokenExpiry).toHaveBeenCalledTimes(0)
      expect(fetch).toHaveBeenCalledTimes(2)
    }
  })
})
