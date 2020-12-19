import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from "react-redux";

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import Checkout from './containers/Checkout/Checkout'
import Orders from './containers/Orders/Orders'
import * as actions from './store/actions/'
import './App.css';

class App extends Component {
	componentDidMount() {
		this.props.onTryAuthSignUp();
	}
	render() {

		let routes = (
			<Switch>
				<Route path="/auth" exact component={Auth}/>
				<Route path="/" exact component={BurgerBuilder}/>
				<Redirect to="/"/>
			</Switch>
		)

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route path="/orders" component={Orders}/>
					<Route path="/checkout" component={Checkout}/>
					<Route path="/logout" exact component={Logout}/>
					<Route path="/" exact component={BurgerBuilder}/>
					<Redirect to="/"/>
			</Switch>
			)
		}
		return (
			<div>
				<Layout>
					{routes}
				</Layout>
			</div>
		);
	}
}

const mapStateToProp = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}

const mapDispatchToProp = dispatch => {
	return {
		onTryAuthSignUp: () => dispatch(actions.authCheckState())
	}
}

export default withRouter(connect(mapStateToProp,mapDispatchToProp)(App));