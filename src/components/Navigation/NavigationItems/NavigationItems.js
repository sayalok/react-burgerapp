import React from 'react';
import NavigationItem from "./NavigationItem/NavigationItem";
import './NavigationItems.css'

const NavigationItems = (props) => (
    <ul className="NavigationItems">
        <NavigationItem link="/" exact>Home</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
);

export default NavigationItems