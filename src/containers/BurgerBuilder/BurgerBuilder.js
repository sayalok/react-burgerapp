import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENTS_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 0.7,
    meat: 1.3
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updatedIngreditents = {
            ...this.state.ingredients
        }

        updatedIngreditents[type] = updatedCount;

        const priceAddition = INGREDIENTS_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice:newPrice,ingredients: updatedIngreditents});
        this.updatePurchaseState(updatedIngreditents);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;

        const updatedIngreditents = {
            ...this.state.ingredients
        }

        updatedIngreditents[type] = updatedCount;

        const priceDEdution = INGREDIENTS_PRICES[type]
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDEdution;

        this.setState({totalPrice:newPrice,ingredients: updatedIngreditents});
        this.updatePurchaseState(updatedIngreditents);
    }

    puchaseHandler = () => {
        this.setState({purchasing: true})
    }

    puchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    puchasedContinueHandler = () => {
        alert('Yeah !')
    }

	render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
		return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.puchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice.toFixed(2)}
                        puchaseCancel={this.puchaseCancelHandler}
                        puchasedContinue={this.puchasedContinueHandler}
                        />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchaseable= {this.state.purchasable}
                    ordered={this.puchaseHandler}
                    price={this.state.totalPrice}/>
            </Aux>
		);
	}
}


export default BurgerBuilder;
