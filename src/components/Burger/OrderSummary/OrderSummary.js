import React from "react";
import Aux from "../../../hoc/Aux";
import Button from "../../UI/Button/Button";

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
            <p><strong>Total Price: </strong> {props.price}</p>
            <p>Continue To Checkout</p>
            <Button btnType="Danger" clicked={props.puchaseCancel}>Cancel</Button>
            <Button btnType="Success" clicked={props.puchasedContinue}>Continue</Button>
        </Aux>
    )
};

export default OrderSummary;