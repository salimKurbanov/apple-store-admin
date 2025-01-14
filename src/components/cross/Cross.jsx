import React from 'react';
import './css/cross.css';

const Cross = ({ mode }) => {
    return (
        <div className={`cross ${mode}`}>
            <span></span>
            <span></span>
        </div>
    );
};

export default Cross;