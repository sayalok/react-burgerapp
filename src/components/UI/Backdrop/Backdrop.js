import React from 'react';

import './Backdrop.css'

const Backdrop = (props) => (
    props.show ? <div className="BackDrop" onClick={props.clicked}></div> : null
)
export default Backdrop