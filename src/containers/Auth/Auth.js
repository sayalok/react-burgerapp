import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'
import './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as authActions from "../../store/actions/";

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
        },
        isSignUp: true
    }

    componentDidMount() {
        if(!this.props.building && this.props.authRedirect !== '/') {
            this.props.onSetAuthRedirectPath()
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
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignUp
        )
    }

    switchAuthModeHandler = () => {
        console.log('here');
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
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

        if(this.props.loading) {
            formInput = <Spinner/>
        }

        let errorMsg = null

        if (this.props.error) {
            errorMsg = (
                <p>{this.props.error.message}</p>
            )
        }

        let isRedirect = null
        if (this.props.isAuth) {
            isRedirect = <Redirect to={this.props.authRedirect}/>
        }

        return (
            <div className="Auth">
                {errorMsg}
                {isRedirect}
                <form onSubmit={this.submitHandler}>
                    <h2>Sign In</h2>
                    {formInput}
                    <Button btnType="Success">
                        Submit
                    </Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                    Switch To {this.state.isSignUp ? "SignIn": "SignUp"}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirect: state.auth.authRedirect
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onAuth: (email,pass, isSignUp) => dispatch(authActions.auth(email,pass,isSignUp)),
        onSetAuthRedirectPath: () => dispatch(authActions.setAuthRedirect('/'))
    }
}
export default connect(mapStateToProps,mapDispatchToProp)(Auth);