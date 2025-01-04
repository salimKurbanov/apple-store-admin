import React from 'react';
import './css/add_character_modal.css';
import AddIcon from './components/AddIcon';
import Description from './components/Description';
import Button from '../../components/button/Button';
import useAddCharacter from './hooks/useAddCharacter';

const AddCharacterModal = () => {
    const obj = useAddCharacter()

    if(!obj.isOpen) return null

    return (
        <div className='add_character_modal_wrapper' onMouseDown={obj.closeModal}>

            <form onSubmit={obj.addCharacter} className="add_character_modal" onMouseDown={(e) => e.stopPropagation()}>
                <h2>Добавить характеристику</h2>

                <div className="add_character_modal_content">
                    <AddIcon error={obj.error.icon} icon={obj.newItem.icon} callback={obj.addImage}/>

                    <Description 
                        error={obj.error.description}
                        text={obj.newItem.description} 
                        area={obj.area} 
                        callback={obj.inputDescription}
                        addCharacter={obj.addCharacter}
                    />
                </div>

                <Button type={'submit'} mode={'black'}>Сохранить</Button>
            </form>

        </div>
    );
};

export default AddCharacterModal;