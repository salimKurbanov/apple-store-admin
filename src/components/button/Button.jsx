import React from 'react';
import './css/button.css';


const Button = ({callback, mode, children}) => {

    return (
        <button onClick={callback} className={`main_button ${mode}`} >
            {children}
        </button>
    );
};

export default Button; 