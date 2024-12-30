import React from 'react';
import './css/button.css';


const Button = ({callback, mode, children, type}) => {

    return (
        <button type={type} onClick={callback} className={`main_button ${mode}`} >
            {children}
        </button>
    );
};

export default Button; 