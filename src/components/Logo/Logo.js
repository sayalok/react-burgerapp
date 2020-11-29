import React from 'react';
import burgerLogo from '../../assets/images/Logo.png'

import './Logo.css'

const Logo = (props) => {
  return (
    <div className="Logo">
        <img src={burgerLogo} alt="Burger" style={{height: props.height}}/>
    </div>
  );
};

export default Logo