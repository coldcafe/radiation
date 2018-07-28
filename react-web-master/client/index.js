import React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import {createStore , applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import {Provider} from 'react-redux';
import AppStore from './redux/AppStore';
import Routes from './routes';
import { root_route } from './routes';
import RootSaga from './redux/root_saga';
import 'antd/dist/antd.css';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// mount it on the Store
const store = createStore(
  AppStore,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(RootSaga)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={root_route}/>
  </Provider>
  ,
  document.getElementById("content")
);