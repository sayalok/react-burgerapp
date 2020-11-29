import * as actionTypes from '../actions/actionTypes'

const initialState = {
    ingredients: null,
    price: 4,
    error: false
}

const INGREDIENTS_PRICES = {
    salad: 0.5,
    bacon: 0.3,
    cheese:0.4,
    meat: 1.2
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                price: state.price + INGREDIENTS_PRICES[action.ingredientName]
            }        
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                price: state.price - INGREDIENTS_PRICES[action.ingredientName]
            }  
        case actionTypes.SET_INGREDIENT:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                price: 4
            }
        case actionTypes.Fetch_INGREDIENT_ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}

export default reducer