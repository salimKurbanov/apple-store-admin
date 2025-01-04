import React from 'react';
import Cross from '../../../components/cross/Cross';

const AddIcon = ({error, icon, callback, addCharacter}) => {

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); 
            addCharacter(e); 
        }
    };

    return (
        <label className={`add_icon ${error ? 'error' : ''} `} htmlFor='character_icon' onKeyDown={(e) => handleKeyDown(e)}>
            {icon ? 
                <img className='image' src={URL.createObjectURL(icon)} alt="" />
            :
                <Cross />
            }

            <input id='character_icon' value={''} type="file" onChange={(e) => callback(e)}/>
        </label>
    );
};

export default AddIcon;