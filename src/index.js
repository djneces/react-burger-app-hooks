import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
//applyMiddleware for thunk, compose for devtools
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
//thunk - middleware for async
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

//Enhancers for middleware (https://github.com/zalmoxisus/redux-devtools-extension#installation)
//setting up ENV variables
const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

//combine reducers
const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer,
});

//add Redux devtools to the store
// prettier-ignore
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

//I could use BrowserRouter in App.js to instead
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
