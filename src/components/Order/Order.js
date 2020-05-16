import React from 'react';
import './Order.css';
const Order = (props) => {
    const ingredients = [];
    for (const ig in props.ingredients) {
        ingredients.push({
            name: ig,
            amount: props.ingredients[ig]
        })
    }

    const igHtml = ingredients.map(item => {
        return <span key={item.name} className="ingredient">
            {item.name} ({item.amount})
        </span>
    })
    return (
        <div className="Order">
            <p>Ingredients: {igHtml}</p>
            <p>Price: 
                <strong>USD {props.price}</strong>
            </p>
        </div>
    )
}

export default Order;