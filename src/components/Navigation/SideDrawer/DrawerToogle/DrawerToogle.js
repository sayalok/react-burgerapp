import * as React from 'react';
import './DrawerToogle.css'

const DrawerToogle = (props) => (
    <div onClick={props.clicked} className="DrawerToggle">
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default DrawerToogle