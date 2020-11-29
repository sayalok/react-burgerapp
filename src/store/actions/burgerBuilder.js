import * as actionTypes from './actionTypes'
import axios from '../../axios-order'

export const addIngredients = name => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredients = name => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredient = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients,
    }
}

export const fetchIngredientError = () => {
    return {
        type: actionTypes.Fetch_INGREDIENT_ERROR
    }
}

export const initIngredient = () => {
    return dispatch => {
        axios.get("/ingredients.json")
        .then(result => {
            dispatch(setIngredient(result.data))
        })
        .catch(error => {
            dispatch(fetchIngredientError())
        })
    }
}