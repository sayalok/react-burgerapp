import React, { Component } from "react";

import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-order';

import './ContactData.css';
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            city: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading:true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Mr ABC",
                address: {
                    street: "Testing",
                    zip: "1203"
                }
            }
        }
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({loading: false});
            })
    }

    render() {
        let form = (
            <form>
                <div>
                    <input type="text" name="name" placeholder="Enter your name"/>
                </div>
                <div>
                    <input type="text" name="email" placeholder="Enter your name"/>
                </div>
                <div>
                    <input type="text" name="street" placeholder="Enter your street"/>
                </div>
                <div>
                    <input type="text" name="city" placeholder="Enter your city"/>
                </div>
                <Button btnType="Success" clicked={this.orderHandler}>
                    Order
                </Button>
            </form>
        )

        if(this.state.loading) {
            form = <Spinner/>
        }
        return (
            <div className="ContactData">
                <h4>Enter Details</h4>
                {form}
            </div>
        )
    }
}

export default ContactData