import React from "react";
import Aux from "../../../hoc/Aux";

const OrderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span>{igKey}: </span>
                    {props.ingredients[igKey]}
                </li>
            )
        })
    return (
        <Aux>
            <h2>Your Order</h2>
            <p>Your Items:</p>
            <ul>
                {ingredients}
            </ul>
            <p>Continue To Checkout</p>
        </Aux>
    )
};

export default OrderSummary;