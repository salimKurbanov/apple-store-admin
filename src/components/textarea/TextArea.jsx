import React, { useEffect } from 'react';
import './css/textarea.css';


const TextArea = ({onKeyDown, value, error, onChange, label, mode, refCurrent}) => {

    useEffect(() => {
        const textarea = refCurrent.current;

        if (textarea) {
            textarea.style.height = '16px'; 
            const isOverflowing = textarea.scrollHeight > textarea.clientHeight; 
            
            if (isOverflowing) {
                textarea.style.height = `${textarea.scrollHeight}px`; 
            }
        }
    }, [value])

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