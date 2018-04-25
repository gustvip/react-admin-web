/**
 * Created by joey on 2018/02/19
 */

import T from 'utils/T'
import thunk from 'redux-thunk'
import { createStore as _createStore, applyMiddleware, combineReducers } from 'redux'

export const STORE_INJECT = '@@STORE_INJECT'

/**
 * 注册
 */
class Registry {
  constructor () {
    this.store = null
    this.initialReducer = {
      initialReducer: (a = {}) => a,
    }
    this.finallyReducer = {}
  }
  
  injectReducers (reducers) {
    const _this = this
    _this.finallyReducer = Object.assign(
      reducers.reduce((acc, reducer) => {
        acc[reducer.name] = reducer.reducer
        return acc
      }, {}),
      _this.initialReducer,
    )
    _this.store.replaceReducer(combineReducers(_this.finallyReducer))
  }
  
  get initialReducers () {
    const _this = this
    
    return combineReducers(
      T.lodash.isEmpty(_this.finallyReducer)
        ? _this.initialReducer
        : _this.finallyReducer,
    )
  }
}

/**
 * 注册中间件
 * @param registry
 * @return {function(*): function(*): function(*=)}
 */
function registryMiddleware (registry) {
  return dispatch => next => action => {
    if (T.lodash.isPlainObject(action) && action.hasOwnProperty(STORE_INJECT)) {
      const reducers = action[STORE_INJECT]
      return T.helper.checkArray(reducers) && registry.injectReducers(reducers)
    }
    
    return next(action)
  }
}

/**
 * createStore
 * @param initialState
 */
export default function createStore (initialState = {}) {
  const registry = new Registry()
  let finalCreateStore = applyMiddleware(...[registryMiddleware(registry), thunk])
  
  // if we have redux devtools installed hook into it.
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

