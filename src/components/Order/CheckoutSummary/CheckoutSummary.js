import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import './CheckoutSummary.css'


const ChechoutSummary = (props) => {
    return (
        <div className="ChechoutSummary">
            <h1>Confirm Your Order</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked={props.checkoutCanceled}>
                Cancel
            </Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>
                Continue
            </Button>
        </div>
    )
}

export default ChechoutSummary;