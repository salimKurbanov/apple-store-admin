import React from 'react';
import Cross from '../../../components/cross/Cross';

const AddIcon = ({error, file, callback}) => {
    return (
        <label className={`add_icon ${error ? 'error' : ''} `} htmlFor='character_icon'>
            {file ? 
                <img className='image' src={URL.createObjectURL(file)} alt="" />
            :
                <Cross />
            }

            <input id='character_icon' value={''} type="file" onChange={(e) => callback(e)}/>
        </label>
    );
};

export default AddIcon;