import React from 'react';
import './Input.css';

const Input = (props) => {
    let inputElement = null;
    let InputClasses = ['InputElement']

    if (props.inValid && props.shouldValidate && props.touched) {
        InputClasses.push("Invalid")
    }

    switch(props.elementType) {
        case('select') :
            inputElement = (
                <div className="Input">
                    <label className="Label">{props.label}</label>
                    <select 
                        className={InputClasses.join(" ")}
                        onChange={props.changed}
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
                        className={InputClasses.join(" ")}
                        onChange={props.changed}
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
                    className={InputClasses.join(" ")}
                    onChange={props.changed}
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
                        className={InputClasses.join(" ")}
                        onChange={props.changed}
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