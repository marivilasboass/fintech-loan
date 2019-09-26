import { normalize } from 'normalizr'
import Sentry from 'sentry-expo'

import * as transactionsActions from './actions'
import * as transactionsSelectors from './selectors'
import { transactionsSchema } from './schema'

export const reset = transactionsActions.reset

export const fetchNextPage = () =>
  async (dispatch, getState, { api }) => {
    try {
      const previousPage = transactionsSelectors.getPage(getState())
      const limit = 30
      const { data: response } = await api.get(`transaction-manager/userTransactions?page=${previousPage + 1}&limit=${limit}`)
      const { results: newTransactions, balances, page, totalPages } = response.data

      if (newTransactions && newTransactions.length > 0) {
        const { entities } = normalize(newTransactions, transactionsSchema)
        dispatch(transactionsActions.nextPage(entities.transaction, balances))

        if (page === totalPages) {
          dispatch(transactionsActions.endReached())
        }
        return
      }

      dispatch(transactionsActions.endReached())
    } catch (err) {
      dispatch(transactionsActions.error('Erro ao carregar o extrato'))
      Sentry.captureException(err)
    }
  }
