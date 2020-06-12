import React, { Component } from 'react';
import { connect } from "react-redux";
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Aux from '../../hoc/Aux/Aux';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';
import * as actionTypes from "../../store/actions";


class BurgerBuilder extends Component {

    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        // axios.get('/ingredients.json')
        //     .then(res => {
        //         this.setState({ingredients: res.data})
        //     })
        //     .catch(err => {this.setState({error:true})})
    }

    componentWillUnmount() {
        
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

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;

    //     const updatedIngreditents = {
    //         ...this.state.ingredients
    //     }

    //     updatedIngreditents[type] = updatedCount;

    //     const priceAddition = INGREDIENTS_PRICES[type]
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState({totalPrice:newPrice,ingredients: updatedIngreditents});
    //     this.updatePurchaseState(updatedIngreditents);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;

    //     const updatedIngreditents = {
    //         ...this.state.ingredients
    //     }

    //     updatedIngreditents[type] = updatedCount;

    //     const priceDEdution = INGREDIENTS_PRICES[type]
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDEdution;

    //     this.setState({totalPrice:newPrice,ingredients: updatedIngreditents});
    //     this.updatePurchaseState(updatedIngreditents);
    // }

    puchaseHandler = () => {
        this.setState({purchasing: true})
    }

    puchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    puchasedContinueHandler = () => {
        const queryParams = [];

        for(let item in this.state.ingredients) {
            queryParams.push(
                encodeURIComponent(item) + '=' + encodeURIComponent(this.state.ingredients[item])
            )
        }
        queryParams.push('price='+ this.state.totalPrice)
        this.props.history.push({
            pathname: "/checkout",
            search: '?'+ queryParams.join('&')
        });
    }

	render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Something is wrong</p> : <Spinner/>;
        
        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchaseable= {this.state.purchasable}
                        ordered={this.puchaseHandler}
                        price={this.props.price}/>
                </Aux>
            )

            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price.toFixed(2)}
                puchaseCancel={this.puchaseCancelHandler}
                puchasedContinue={this.puchasedContinueHandler}
            />
        }

        if(this.state.loading) {
            orderSummary = <Spinner/>
        }


		return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.puchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
		);
	}
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (WithErrorHandler(BurgerBuilder,axios));
