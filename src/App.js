import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import './App.css';

class App extends Component {
	render() {
		return (
			<div>
				<Layout>
					<Switch>
						<Route path="/orders" component={Orders}/>
						<Route path="/checkout" component={Checkout}/>
						<Route path="/auth" exact component={Auth}/>
						<Route path="/logout" exact component={Logout}/>
						<Route path="/" exact component={BurgerBuilder}/>
					</Switch>
				</Layout>
			</div>
		);
	}
}

export default App;