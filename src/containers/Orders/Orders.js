import React, { Component } from 'react';
import Order from '../../components/Order/Order'
import axios from '../../axios-order'
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

    state = {
        orders: [],
        loading: true

    }
    componentDidMount() {
        axios.get('/orders.json')
            .then(result => {
                const fetchResult = []
                for (const key in result.data) {
                    fetchResult.push({
                        ...result.data[key],
                        id:key
                    })
                }
                this.setState({loading:false,orders:fetchResult})
            })
            .catch(error => {
                this.setState({loading:false})
            })
    }

    render() {
        return (
            <div>
                {
                    this.state.orders.map(item => (
                        <Order 
                            key={item.id}
                            ingredients={item.ingredients}
                            price={+item.price}
                        />
                    ))
                }
                
            </div>
        );
    }
}

export default WithErrorHandler(Orders,axios);