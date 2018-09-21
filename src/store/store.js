import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';
import * as reducers from './reducers';
import sagas from './sagas';

const logger = createLogger({
  collapsed: true
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(sagaMiddleware, thunkMiddleware, logger)
);

sagaMiddleware.run(sagas);

export default store;
