import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToogle from '../SideDrawer/DrawerToogle/DrawerToogle'

import './Toolbar.css'

const Toolbar = (props) => {
    return (
        <header className="Toolbar">
            <DrawerToogle clicked={props.drawerToogleClicked}/>
            <div className="logoWrapper">
                <Logo/>
            </div>
            <nav className="DesktopOnly">
                <NavigationItems isAuth={props.isAuth}/>
            </nav>
        </header>
    );
};

export default Toolbar