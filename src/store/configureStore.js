import { createStore, applyMiddleware, combineReducers } from 'redux'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

import { api } from '~/services/api'
import { registerPushNotificationListener } from '~/services/pushNotification'

import * as reducers from './reducers'

const configureStore = (initialState = {}) => {
  const rootReducer = combineReducers(reducers)
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk.withExtraArgument({ api }))
  )

  const persistor = persistStore(store)

  registerPushNotificationListener(store)

  return { store, persistor }
}

export { configureStore }
