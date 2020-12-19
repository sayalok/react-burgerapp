import React, { Component } from "react";
import { connect } from "react-redux";

import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-order';

import './ContactData.css';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as orderActions from "../../../store/actions/";

class ContactData extends Component {

    inputMaking(lbl, elmType, inpType, inpPlacHoldr, val) {
        return {
            label: lbl,
            elementType: elmType,
            elementConfig: {
                type: inpType,
                placeholder: inpPlacHoldr
            },
            value: val,
            validation: {
                required: true
            },
            valid: false,
            touched: false
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
                validation: {},
                value: 'cheapest',
                valid: true
            }
        },
        // loading: false,
        formIsValid: false
    }

    checkValidity = (value,rules) => {
        let isValid = true

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        return isValid
    }

    orderHandler = (e) => {
        e.preventDefault();
        const formData = {}
        for(let formElmId in this.state.orderForm) {
            formData[formElmId] = this.state.orderForm[formElmId].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price.toFixed(2),
            orderData: formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order, this.props.token)
    }

    inputChangedHandler = (e, inputIdentifier) => {
        const updateOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElm = {
            ...updateOrderForm[inputIdentifier]
        }
        updatedFormElm.value = e.target.value;
        updatedFormElm.valid = this.checkValidity(updatedFormElm.value, updatedFormElm.validation)
        updatedFormElm.touched = true
        updateOrderForm[inputIdentifier] = updatedFormElm;

        let formIsValid = true;
        for (const inputIdentifier in updateOrderForm) {
            formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid
        }
        
        this.setState({orderForm: updateOrderForm,formIsValid: formIsValid})
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
                    changed={(e) => this.inputChangedHandler(e,inputItem.id)}
                    inValid={!inputItem.config.valid}
                    shouldValidate={inputItem.config.validation}
                    touched={inputItem.config.touched}/>
            )
        })
        let form = (
            <form onSubmit={this.orderHandler}>
                {formInput}                
                <Button btnType="Success" disabled={!this.state.formIsValid}>
                    Order
                </Button>
            </form>
        )

        if(this.props.loading) {
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onOrderBurger: (orderdata,token) => dispatch(orderActions.purchaseBurger(orderdata,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProp)(withErrorHandler(ContactData,axios))