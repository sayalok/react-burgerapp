import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';

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
        purchasing: false,
        loading: false
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
        this.setState({loading:true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.price,
            customer: {
                name: "Mr ABC",
                address: {
                    street: "Testing",
                    zip: "1203"
                }
            }
        }
        axios.post('/orders.jon', order)
            .then(res => {
                this.setState({loading: false, purchasing: false});
            })
            .catch(err => {
                this.setState({loading: false, purchasing: false});
            })
    }

	render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice.toFixed(2)}
                puchaseCancel={this.puchaseCancelHandler}
                puchasedContinue={this.puchasedContinueHandler}
            />
        
        if(this.state.loading) {
            orderSummary = <Spinner/>
        }
		return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.puchaseCancelHandler}>
                    {orderSummary}
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
export default WithErrorHandler(BurgerBuilder,axios);
