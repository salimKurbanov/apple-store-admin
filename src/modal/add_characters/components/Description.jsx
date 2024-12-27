import React from 'react';

const Description = ({error, text, area, callback, addCharacter}) => {

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); 
            addCharacter(e); 
        }
    };

    return (
        <textarea 
            ref={area} 
            className={`description shadow ${error ? 'error' : ''}`} 
            value={text} 
            onChange={(e) => callback(e)}
            onKeyDown={(e) => handleKeyDown(e)}
        >
        </textarea>
    )
};

export default Description;