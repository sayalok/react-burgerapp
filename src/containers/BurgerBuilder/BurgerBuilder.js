import React, { Component } from 'react';
import { connect } from 'react-redux'


import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'

import Aux from '../../hoc/Aux/Aux'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import axios from '../../axios-order'

import * as burgerBuilderActions from '../../store/actions/'

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
    }

    componentDidMount() {
        this.props.onInitIngredient()
    }

    updatePurchaseState = (ingredients) => {
        const sumOfIngredients = Object.keys(ingredients)
                                .map((item) => {
                                    return ingredients[item]
                                })
                                .reduce((sum,elm) => {
                                    return sum + elm
                                })
        return sumOfIngredients > 0
    }
    purchaseHandler = () => {
        if(this.props.isAuth) {
            this.setState({purchasing: true})
        }else{
            this.props.history.push('/auth')
        }
    }

    purchaseClosedHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    render() {
        const disableInfo = {...this.props.ings}
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null
        let burger = this.props.error ? <p>Ingredient failed to load</p>: <Spinner/>
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        addIngredient={this.props.onIngredientAdded} 
                        removeIngredient={this.props.onIngredientRemoved}
                        disabled={disableInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuth}/>
                </Aux>
            )

            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                purchaseContinue={this.purchaseContinueHandler}
                purchaseCancel={this.purchaseClosedHandler}
                totalPrice={this.props.price.toFixed(0)}/>
        }
        if (this.state.loading) {
            orderSummary = <Spinner/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseClosedHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingName => dispatch(burgerBuilderActions.addIngredients(ingName)),
        onIngredientRemoved: ingName => dispatch(burgerBuilderActions.removeIngredients(ingName)),
        onInitIngredient: () => dispatch(burgerBuilderActions.initIngredient())

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));