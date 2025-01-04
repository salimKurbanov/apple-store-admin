import React from 'react';
import Cross from '../../../components/cross/Cross';

const AddIcon = ({error, icon, callback}) => {
    return (
        <label className={`add_icon ${error ? 'error' : ''} `} htmlFor='character_icon'>
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