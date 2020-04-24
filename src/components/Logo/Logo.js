import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import './Logo.css'

const Logo  = (props) => (
    <div className="Logo">
        <img src={burgerLogo} alt="Burger App"/>
    </div>
)

export default Logo