import * as React from 'react';
import Aux from '../../hoc/Aux/Aux'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

import './Burger.css'

const burger = (props) => {
	let transformIngredients = Object.keys(props.ingredients)
								.map(key => {
									return [...Array(props.ingredients[key])].map((_,i) => {
										return <BurgerIngredient key={key+i} type={key}/>
									})
								})
								.reduce((arr,elm) => {
									return arr.concat(elm)
								}, []);
	if(transformIngredients.length === 0) {
		transformIngredients = <p>Please add ingredients</p>
	}
	return (
		<Aux>
			<div className="Burger">
				<BurgerIngredient type="bread-top"/>
				{transformIngredients}
				<BurgerIngredient type="bread-bottom"/>
			</div>
		</Aux>
	);
};
export default burger