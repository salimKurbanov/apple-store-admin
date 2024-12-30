import React from 'react';
import './css/input.css';


const Input = ({label, type, value, onChange, onBlur, placeholder, mode, error}) => {

    return (
        <div className={`input_field ${mode} ${error ? 'error' : ''}`}>
            <div title={label} className="label">{label}</div>
            <input className='shadow' type={type} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder}/>
            <div className="error_message">{error ? error : ''}</div>
        </div>
    );
};

export default Input;