import React, { Component } from 'react';
import ChechoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';


class Checkout extends Component {

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        }
    };

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
                    ingredients={this.state.ingredients}
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutCountinuedHandler}    
                />
            </div>
		);
	}
}
export default Checkout;
