import React, { Component } from 'react';
import { connect } from "react-redux";

import * as orderActions from "../../store/actions/";
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {

    state = {
        orders: [],
        loading: true

    }
    componentDidMount() {
        this.props.onFetchOrders()
    //     axios.get('/orders.json')
    //         .then(result => {
    //             const fetchResult = []
    //             for (const key in result.data) {
    //                 fetchResult.push({
    //                     ...result.data[key],
    //                     id:key
    //                 })
    //             }
    //             this.setState({loading:false,orders:fetchResult})
    //         })
    //         .catch(error => {
    //             this.setState({loading:false})
    //         })
    }

    render() {
        let orders = <Spinner/>
        if (!this.props.loading) {
            orders = (
                this.props.orders.map(item => (
                    <Order 
                        key={item.id}
                        ingredients={item.ingredients}
                        price={+item.price}
                    />
                ))
            )
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
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(orderActions.fetchOrders())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(Orders,axios));