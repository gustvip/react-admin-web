/**
 * Created by joey on 2018/02/19
 */
import { createStore as _createStore, applyMiddleware, combineReducers } from 'redux';
import { isPlainObject, isFunction, transform } from 'lodash';

export const STORE_INJECT = '@@STORE_INJECT';

class Registry {
	constructor () {
		this.store = null;
		this.initialReducer = {
			initialReducer () {
				return {};
			},
		};
	}
	
	injectReducers (reducers) {
		this.store.replaceReducer(combineReducers(
			transform(reducers, (acc, reducer) => acc[reducer.name] = reducer.reducer, {...this.initialReducer}),
		));
	}
	
	get initialReducers () {
		return combineReducers(this.initialReducer);
	}
}

/**
 * 注册中间件
 * @param {Object} registry
 * @return {function(*): function(*): function(*=)}
 */
function registryMiddleware (registry) {
	return () => next => (action) => {
		if (isPlainObject(action) && Object.prototype.hasOwnProperty.call(action, STORE_INJECT) && Array.isArray(action[STORE_INJECT]) && action[STORE_INJECT].length > 0) {
			return registry.injectReducers(action[STORE_INJECT]);
		}
		return next(action);
	};
}

/**
 * Thunk中间件
 * @param {*} [extraOptions]
 * @return {function(*=, *=): function(*): Function}
 */
function thunkMiddleware (extraOptions) {
	return ({dispatch, getState}) => next => (action) => {
		if (isFunction(action)) {
			return action(dispatch, getState, extraOptions);
		}
		return next(action);
	};
}

export default function createStore (initialState = {}) {
	const registry = new Registry();
	let finalCreateStore = applyMiddleware(registryMiddleware(registry), thunkMiddleware());
	
	if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
		finalCreateStore = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(finalCreateStore);
	}
	
	const store = finalCreateStore(_createStore)(
		registry.initialReducers,
		initialState,
	);
	
	registry.store = store;
	return store;
}
