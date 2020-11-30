import * as actionTypes from './actionTypes'
import axios from '../../axios-order'

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderID: id,
        orderData: orderData
    }
}

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json', orderData)
        .then(res => {
            dispatch(purchaseBurgerSuccess(res.data.name, orderData))
        })
        .catch(err => {
            dispatch(purchaseBurgerFailed(err))
        })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccsee = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,

    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrderStart())
        axios.get('/orders.json')
            .then(result => {
                const fetchResult = []
                for (const key in result.data) {
                    fetchResult.push({
                        ...result.data[key],
                        id:key
                    })
                }
                dispatch(fetchOrderSuccsee(fetchResult))
            })
            .catch(error => {
                dispatch(fetchOrderSuccsee(error))
            })
    }
}