import React, { Component } from "react";

import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-order';

import './ContactData.css';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {

    inputMaking(lbl, elmType, inpType, inpPlacHoldr, val) {
        return {
            label: lbl,
            elementType: elmType,
            elementConfig: {
                type: inpType,
                placeholder: inpPlacHoldr
            },
            value: val
        }
    }
    state = {
        orderForm: {
            name: this.inputMaking('Enter your name','input','text','Enter Your Name',''),
            street: this.inputMaking('Enter your Street','input','text','Enter Your Street',''),
            zip: this.inputMaking('Enter your Zip','input','text','Enter Your Zip',''),
            country: this.inputMaking('Enter your Country','input','text','Enter Your Country',''),
            email: this.inputMaking('Enter your Email','input','text','Enter Your email',''),
            deliverMethod: {
                label: 'Enter Delivery Method',
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
        const formData = {}
        for(let formElmId in this.state.orderForm) {
            formData[formElmId] = this.state.orderForm[formElmId].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    inputChangedHandler = (e, inputIdentifier) => {
        const updateOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElm = {
            ...updateOrderForm[inputIdentifier]
        }
        updatedFormElm.value = e.target.value;
        updateOrderForm[inputIdentifier] = updatedFormElm;
        this.setState({orderForm: updateOrderForm})
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
            return (
                <Input 
                    key={inputItem.id}
                    elementType={inputItem.config.elementType} 
                    elementConfig={inputItem.config.elementConfig} 
                    value={inputItem.config.value}
                    changed={(e) => this.inputChangedHandler(e,inputItem.id)}/>
            )
        })
        let form = (
            <form onSubmit={this.orderHandler}>
                {formInput}                
                <Button btnType="Success">
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