import React from 'react';
import './SideDrawer.css'
import Logo from '../../Logo/Logo';
import Aux from '../../../hoc/Aux';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';



const SideDrawer  = (props) => {

    let attachClasses = "SideDrawer Close";
    if(props.open) {
        attachClasses = "SideDrawer Open"
    }
    return (
        <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachClasses}>
                <div className="logoWrapper">
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Aux>
    )
}

export default SideDrawer