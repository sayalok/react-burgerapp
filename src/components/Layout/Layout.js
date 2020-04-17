import React from 'react';

import Aux from '../../hoc/Aux'
import './Layout.css'

const layout = ( props ) => (
    <Aux>
        <div>from layout </div>
        <main className="content">
            {props.children}
        </main>
    </Aux>
)

export default layout;