import React, { Component } from 'react';

import Aux from '../Aux'
import './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false,
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToogleHandler = () => {
        this.setState({showSideDrawer: !this.state.showSideDrawer});
    }
    render() {
        return (
            <Aux>
                <Toolbar drawerToogleClick={this.sideDrawerToogleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
                <main className="content">
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;