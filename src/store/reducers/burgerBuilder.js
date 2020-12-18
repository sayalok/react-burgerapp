import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    ingredients: null,
    price: 4,
    error: false,
    building: false
}

const INGREDIENTS_PRICES = {
    salad: 0.5,
    bacon: 0.3,
    cheese:0.4,
    meat: 1.2
}

const addIngredient = (state, action) => {
    const addIngredients = updateObject(state.ingredients,
        {[action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    )
    const addState = {
        ingredients: addIngredients,
        price: state.price + INGREDIENTS_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state,addState)
}

const removeIngredient = (state,action) => {
    const removeIngredients = updateObject(state.ingredients,
        {[action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    )
    const removeState = {
        ingredients: removeIngredients,
        price: state.price + INGREDIENTS_PRICES[action.ingredientName],
        building: true
    }
    return updateObject(state,removeState)
}

const setIngredient = (state,action) => {
    return updateObject(state,{
        ingredients: action.ingredients,
        error: false,
        price: 4,
        building: false
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state,action)
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state,action)   
        case actionTypes.SET_INGREDIENT: return setIngredient(state,action)
        case actionTypes.Fetch_INGREDIENT_ERROR: return updateObject(state,{error: true})
        default: return state
    }
}

export default reducer