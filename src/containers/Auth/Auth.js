import React, { Component } from 'react';
import { connect } from "react-redux";
import './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import * as contactActions from "../../store/actions/";

class Auth extends Component {
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
        controls: {
            email: this.inputMaking('Enter your email','input','email','Enter Your Email',''),
            password: this.inputMaking('Enter your password','input','password','Enter Your Password',''),
        }
    }

    checkValidity = (value,rules) => {
        let isValid = true

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        return isValid
    }

    inputChangedHandler = (e, inputIdentifier) => {
        const updateControlsForm = {
            ...this.state.controls,
            [inputIdentifier]: {
                ...this.state.controls[inputIdentifier],
                value: e.target.value,
                valid: this.checkValidity(e.target.value, this.state.controls[inputIdentifier].validation),
                touched: true,
            }
        };        
        this.setState({controls: updateControlsForm})
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.controls.email,this.state.controls.password)
    }

    render() {
        let formElmArray = []
        for (const item in this.state.controls) {
            formElmArray.push({
                id: item,
                config: this.state.controls[item]
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
        return (
            <div className="Auth">
                <form onSubmit={this.submitHandler}>
                    <h2>Sign In</h2>
                    {formInput}
                    <Button btnType="Success">
                        Order
                    </Button>
                </form>
            </div>
        );
    }
}
// const mapStateToProps = (state) => {

// }

const mapDispatchToProp = dispatch => {
    return {
        onAuth: (email,pass) => dispatch(contactActions.auth())
    }
}
export default connect(null,mapDispatchToProp)(Auth);