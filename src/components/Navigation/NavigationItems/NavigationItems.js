import React from 'react';
import NavigationItem from "./NavigationItem/NavigationItem";
import './NavigationItems.css'

const NavigationItems = (props) => {
    return (
        <ul className="NavigationItems">
            <NavigationItem link="/" exact>Home</NavigationItem>
            {   props.isAuth
                ? <NavigationItem link="/orders">Orders</NavigationItem>
                : null
            }
            {   props.isAuth
                ? <NavigationItem link="/logout">Log Out</NavigationItem>   
                : <NavigationItem link="/auth">Authenticate</NavigationItem>
            }
            
            
        </ul>
    )
};

export default NavigationItems