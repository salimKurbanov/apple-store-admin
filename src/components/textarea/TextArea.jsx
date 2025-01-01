import React from 'react';
import './css/textarea.css';


const TextArea = ({onKeyDown, value, error, onChange, label, mode, refCurrent}) => {
    return (
        <div className={`textarea_field ${mode} ${error ? 'error': ''}`}>
            <div className="label">{label}</div>
            <textarea
                ref={refCurrent}
                className='shadow'
                value={value} 
                onKeyDown={onKeyDown} 
                onChange={onChange}>
            </textarea>
            <div className="error_message">{error ? error:''}</div>
        </div>
    );
};

export default TextArea;