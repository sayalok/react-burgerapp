import React, { Component } from 'react';
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-order'
import * as burgerBuilderActions from '../../store/actions/'

class BurgerBuilder extends Component {
    state = {
        // ingredients: null,
        // price: 4,
        // purchasable: false,
        purchasing: false,
        loading: false,
        // error: false
    }

    componentDidMount() {
        this.props.onInitIngredient()
    //     axios.get("/ingredients.json")
    //         .then(result => {
    //             this.setState({ingredients: result.data})
    //         })
    //         .catch(error => {
    //             this.setState({error: true})
    //         })
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

    /*
    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type] = updatedCount
        const updatedPrice = this.state.price + INGREDIENTS_PRICES[type]
        this.setState({ingredients: updatedIngredients, price: updatedPrice})
        this.updatePurchaseState(updatedIngredients)
    }
    
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if(oldCount <= 0) {
            return
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type] = updatedCount
        const updatedPrice = this.state.price - INGREDIENTS_PRICES[type]
        this.setState({ingredients: updatedIngredients, price: updatedPrice})
        this.updatePurchaseState(updatedIngredients)
    }
    */
    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseClosedHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        // const queryParams = []
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }

        // queryParams.push('price='+ this.state.price)
        // const queryString = queryParams.join('&')
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // })
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
                        ordered={this.purchaseHandler}/>
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
        error: state.burgerBuilder.error
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