import React from 'react';
import './Order.css'

const Order = (props) => {
    let ingredients = []
    for (const key in props.ingredients) {
        ingredients.push({
            name: key,
            amount: props.ingredients[key]
        })
    }
    const ingredientsOutput = ingredients.map(item => {
        console.log(item.name)
        console.log(item.amount)
        return <span key={item.name} className="ingredient">
                    {item.name}: {item.amount}
                </span>
    })
    return (
        <div className="Order">
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price <strong>{props.price}</strong></p>
        </div>
    )
};

export default Order