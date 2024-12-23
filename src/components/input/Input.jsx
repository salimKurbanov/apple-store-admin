import React from 'react';
import './css/input.css';


const Input = ({label, type, value, onChange, onBlur, placeholder, mode}) => {

    return (
        <div className={`input_field ${mode}`}>
            <div title={label} className="label">{label}</div>
            <input type={type} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder}/>
        </div>
    );
};

export default Input;