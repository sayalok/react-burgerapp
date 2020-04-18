import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


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
        totalPrice: 4
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
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}/>
            </Aux>
		);
	}
}


export default BurgerBuilder;
