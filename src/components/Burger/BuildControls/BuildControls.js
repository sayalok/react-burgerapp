import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import './BuildControls.css';

const controls = [
    {label: "Salad", type:"salad"},
    {label: "Bacon", type:"bacon"},
    {label: "Cheese", type:"cheese"},
    {label: "Meat", type:"meat"}
]
const buildControls = (props) => (
    <div className="buildControls">
        <p>Total Price is: {props.price.toFixed(2)}</p>
        {controls.map(ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}/>
        ))}
        <button className="OrderButton" disabled={!props.purchaseable}>
            Order Now
        </button>
    </div>
)

export default buildControls;