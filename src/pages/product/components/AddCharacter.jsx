import React from 'react';
import Cross from '../../../components/cross/Cross';
import Store from '../../../utils/Store';

const AddCharacter = ({ error, setError }) => {

    const openModal = () => {
        setError(prev => ({...prev, characters: false}))

        Store.setListener('open_character_modal', 'add_new_character')
    }

    return (
        <div className={`add_character_btn shadow ${error ? 'error' : ''}`} onMouseDown={openModal}>
            <Cross />
        </div>
    );
};

export default AddCharacter;