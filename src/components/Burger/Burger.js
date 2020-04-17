import React from 'react';

import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger  = (props) => {
    let ingredientArr = Object.keys(props.ingredients).map((igKey) => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        })
    })
    .reduce((arr,elm) => {
        return arr.concat(elm)
    },[])

    if(ingredientArr.length === 0) {
        ingredientArr = <p>Please add mosla here</p>
    }
    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top"/>
            { ingredientArr}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default Burger