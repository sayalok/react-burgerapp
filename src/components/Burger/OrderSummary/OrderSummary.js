import React from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

const OrderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
                .map(key => {
                    return (
                        <li key={key}>
                            <span style={{textTransform: "uppercase"}}>{key}</span> 
                            : 
                            {props.ingredients[key]}
                        </li>
                    )
                })
    return (
        <Aux>
            <h3>Your Order</h3>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>
                <strong>Total Price: </strong> 
                {props.totalPrice}
            </p>
            <p>Continue Tto checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancel}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
        </Aux>
    );
};
export default OrderSummary