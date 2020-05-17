import React from 'react';
import './Input.css';

const Input = (props) => {
    let inputElement = null;
    switch(props.elementType) {
        case('select') :
            inputElement = (
                <div className="Input">
                    <label className="Label">{props.label}</label>
                    <select 
                        className="InputElement" 
                        value={props.value}>
                        {props.elementConfig.options.map(item => (
                            <option key={item.value} value={item.value}>{item.displayValue}</option>
                        ))}
                    </select>
                </div>
            );
            break;
        case('input') :
            inputElement = (
                <div className="Input">
                    <label className="Label">{props.label}</label>
                    <input 
                        className="InputElement" 
                        {...props.elementConfig} 
                        value={props.value}/>
                </div>
            );
            break;
        case('textarea') :
            inputElement = (
                <div className="Input">
                    <label className="Label">{props.label}</label>
                    <textarea 
                    className="InputElement" 
                    {...props.elementConfig} 
                    value={props.value}/>
                </div>
            );
            break;

        default:
            inputElement = (
                <div className="Input">
                    <label className="Label">{props.label}</label>
                    <input 
                        className="InputElement" 
                        {...props.elementConfig} 
                        value={props.value}/>
                </div>
            );
            break;
    }

    return (
        <div >
            {inputElement}
        </div>
    )
}

export default Input;