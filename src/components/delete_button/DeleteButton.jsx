import React from 'react';
import './css/delete_button.css';
import Cross from '../cross/Cross';

const DeleteButton = ({callback}) => {
    return (
        <div className='delete_btn' onClick={callback}>
            <Cross mode={'delete'} />
        </div>
    );
};

export default DeleteButton;