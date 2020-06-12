import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { connect } from "react-redux";
import ChechoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../Checkout/ContactData/ContactData';


class Checkout extends Component {


    // constructor() {
    //     super();
    //     this.state = {
    //         ingredients: {
    //             salad: 1,
    //             bacon: 1,
    //             cheese: 1,
    //             meat: 1
    //         },
    //         totalPrice: 0
    //     }
    // }
    // componentDidMount() {
    //     const query = new URLSearchParams(this.props.location.search)
    //     const ingredients = {};
    //     let price = 0;
    //     for(let param of query.entries()) {
    //         if(param[0] === 'price') {
    //             price = +param[1]
    //         } else {
    //             ingredients[param[0]] = +param[1]
    //         }
    //     }

    //     this.setState({ingredients: ingredients, totalPrice: price})
    // }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutCountinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

	render() {
		return (
            <div>
                <ChechoutSummary 
                    ingredients={this.props.ings}
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutCountinuedHandler}    
                />

                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}
                />
            </div>
		);
	}
}

const mapStateToprops = state => {
    return {
        ings: state.ingredients
    }
}
export default connect(mapStateToprops)(Checkout);