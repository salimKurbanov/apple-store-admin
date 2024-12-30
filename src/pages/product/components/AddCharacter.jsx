import React from 'react';
import Cross from '../../../components/cross/Cross';
import Store from '../../../utils/Store';

const AddCharacter = () => {

    const openModal = () => {
        Store.setListener('open_character_modal', true)
    }

    return (
        <div className='add_character_btn shadow' onMouseDown={openModal}>
            <Cross />
        </div>
    );
};

export default AddCharacter;