import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/WithErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get('orders.json')
            .then(res => {
                let fetchOrders = [];
                
                for (const item in res.data) {
                    fetchOrders.push({
                        ...res.data[item],
                        id: item
                    })
                }
                
                this.setState({loading: false, orders: fetchOrders})
            })
            .catch(err => {
                this.setState({loading: false})
            })
    }

    render() {
        let ordertml;
        if(this.state.orders.length > 0) {
            ordertml = this.state.orders.map(order => (
                <Order 
                    key={order.id}
                    ingredients= {order.ingredients}
                    price={order.price}
                />
            ))
        }else{
            ordertml = <p style={{textAlign:'center'}}>No Order Found</p>
        }
        return <div>{ordertml}</div>
    }
}

export default withErrorHandler(Orders, axios);