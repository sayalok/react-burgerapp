import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'
import * as orderActions from '../../store/actions/'


class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     price: 0
    // }

    // componentWillMount() {
    //     let searchParams = new URLSearchParams(this.props.location.search);
    //     let ingredients = {}
    //     let price = 0

    //     for (let p of searchParams) {

    //         if(p[0] === "price") {
    //             price = +p[1]
    //         }else{
    //             ingredients[p[0]] = +p[1];
    //         }
    //     }
    //     this.setState({ingredients: ingredients,price: price})
    // }

    componentWillMount() {
        this.props.onPurchaseInit()
    }
    checkoutCanceledHandler = () => this.props.history.goBack();

    checkoutContinuedHandler = () => this.props.history.replace('/checkout/contact-data');

    render() {
        let summary = <Redirect to="/"/>
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutCanceled={this.checkoutCanceledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}/>
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased

    }
}

const mapDispatchToProp = dispatch => {
    return {
        onPurchaseInit: () => dispatch(orderActions.purchaseInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProp)(Checkout);