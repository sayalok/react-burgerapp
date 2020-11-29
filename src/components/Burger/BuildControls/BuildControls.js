import * as React from 'react';
import BuildControl from '../BuildControls/BuildControl/BuildControl'

import './BuildControls.css'

const controls = [
        {label: 'Salad',  type: 'salad'},
        {label: 'Bacon',  type: 'bacon'},
        {label: 'Cheese', type: 'cheese'},
        {label: 'Meat',   type: 'meat'},
]

const buildControls = (props) => {
    let controlsHTML = controls.map(item => {
        return <BuildControl 
                    label={item.label} 
                    key={item.label} 
                    added={() => props.addIngredient(item.type)}
                    removed={() => props.removeIngredient(item.type)}
                    disabled={props.disabled[item.type]}/>
    })
    return (
        <div className="buildControls">
            <p>Price: {props.price.toFixed(2)}</p>
            {controlsHTML}
            <button 
                className="OrderButton" 
                disabled={!props.purchasable}
                onClick={props.ordered}>
                Order Now
            </button>
        </div>
    );
};

export default buildControls