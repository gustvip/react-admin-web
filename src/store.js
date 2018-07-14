/**
 * Created by joey on 2018/02/19
 */

import T from 'utils/t'
import thunk from 'redux-thunk'
import { createStore as _createStore, applyMiddleware, combineReducers } from 'redux'

export const STORE_INJECT = '@@STORE_INJECT'

class Registry {
  constructor () {
    this.store = null
    this.initialReducer = {
      initialReducer: () => ({}),
    }
    this.finallyReducer = {}
  }
  
  /**
   *
   * @param reducers
   */
  injectReducers (reducers) {
    this.store.replaceReducer(combineReducers(
      this.finallyReducer = T.lodash.transform(reducers, (acc, reducer) => acc[reducer.name] = reducer.reducer, {...this.initialReducer}),
    ))
  }
  
  get initialReducers () {
    return combineReducers(
      T.lodash.isEmpty(this.finallyReducer)
        ? this.initialReducer
        : this.finallyReducer,
    )
  }
}

/**
 * 注册中间件
 * @param {Object} registry
 * @return {function(*): function(*): function(*=)}
 */
function registryMiddleware (registry) {
  return () => next => action => {
    if (T.lodash.isPlainObject(action) && action.hasOwnProperty(STORE_INJECT) && T.helper.checkArray(action[STORE_INJECT])) {
      return registry.injectReducers(action[STORE_INJECT])
    }
    
    return next(action)
  }
}

/**
 * createStore
 * @param {Object} initialState
 */
export default function createStore (initialState = {}) {
  const registry = new Registry()
  let finalCreateStore = applyMiddleware(registryMiddleware(registry), thunk)
  
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    finalCreateStore = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(finalCreateStore)
  }
  
  const store = finalCreateStore(_createStore)(
    registry.initialReducers,
    initialState,
  )
  
  registry.store = store
  return store
}

