import React from 'react';
import './Toolbar.css'
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToogle from '../SideDrawer/DrawerToogle/DrawerToogle';

const Toolbar  = (props) => (
    <header className="Toolbar">
        <DrawerToogle clicked={props.drawerToogleClick}/>
        <div className="logoWrapper">
            <Logo/>
        </div>
        <nav className="DesktopOnly">
            <NavigationItems/>
        </nav>
    </header>
)

export default Toolbar