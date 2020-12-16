import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import * as authActions from "../../../store/actions/"


class Logout extends Component {

    componentDidMount() {
        this.props.onLogOut();
    }
    render() {
        return <Redirect to="/"/>;
    }
}

const mapsDispatchToProp = dispatch => {
    return {
        onLogOut: () => dispatch(authActions.logOut())
    }
}
export default connect(null,mapsDispatchToProp)(Logout);