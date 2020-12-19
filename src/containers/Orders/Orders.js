import React, { Component } from 'react';
import { connect } from "react-redux";

import * as orderActions from "../../store/actions/";
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {

    state = {
        loading: true

    }
    componentDidMount() {
        this.props.onFetchOrders(this.props.token,this.props.userId)
    }

    render() {
        let orders = <Spinner/>
        if (!this.props.loading) {
            if (this.props.orders.length > 0) {
                orders = (
                    this.props.orders.map(item => (
                        <Order 
                            key={item.id}
                            ingredients={item.ingredients}
                            price={+item.price}
                        />
                    ))
                )
            }else{
                orders = "No Order Found"
            }
        }
        return (
            <div>
                {orders}                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token,userId) => dispatch(orderActions.fetchOrders(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(Orders,axios));