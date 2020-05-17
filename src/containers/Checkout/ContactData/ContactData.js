import React, { Component } from "react";

import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-order';

import './ContactData.css';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Street'
                },
                value: ''
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your ZipCode'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Email'
                },
                value: ''
            },
            deliverMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest',displayValue: 'Fastest'},
                        {value: 'cheapest',displayValue: 'cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading:true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
        let formElmArray = []
        for (const item in this.state.orderForm) {
            formElmArray.push({
                id: item,
                config: this.state.orderForm[item]
            })
        }

        let formInput = formElmArray.map((inputItem) => {
            return <Input 
                key={inputItem.id}
                elementType={inputItem.config.type} 
                elementConfig={inputItem.config.elementConfig} 
                value={inputItem.config.value}/>
        })
        let form = (
            <form>
                {formInput}                
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