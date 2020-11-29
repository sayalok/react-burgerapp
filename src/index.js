import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import	thunk from 'redux-thunk'
import reportWebVitals from './reportWebVitals';

import './index.css';
import App from './App';

import burgerBuilderreducer from './store/reducers/burgerBuilder'
import orderReducer from './store/reducers/order'

const rootReducers  = combineReducers({
	burgerBuilder: burgerBuilderreducer,
	order: orderReducer
})
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducers, composeEnhancers(
	applyMiddleware(thunk)
))

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
)

ReactDOM.render(
	<React.StrictMode>{app}</React.StrictMode>,
  	document.getElementById('root')
);
reportWebVitals();
