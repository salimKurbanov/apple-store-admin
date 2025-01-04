import React, { useEffect, useRef } from 'react';
import DeleteButton from '../../../components/delete_button/DeleteButton';

const CharacterItem = ({el, deleteCharacter, changeCharacterIcon, changeCharacterDescription, error}) => {

    const area = useRef(null)

    useEffect(() => {
        const textarea = area.current;

        if (textarea) {
            textarea.style.height = '16px'; 
            const isOverflowing = textarea.scrollHeight > textarea.clientHeight; 
            
            if (isOverflowing) {
                textarea.style.height = `${textarea.scrollHeight}px`; 
            }
        }
    }, [el.description])

    return (
        <div className='character_item'>
            <label className={`character_icon shadow ${error ? 'error' : ''}`} htmlFor={el.id}>
                <img src={URL.createObjectURL(el.icon)} alt="" />
                <input 
                    value={''}
                    id={el.id} 
                    type="file" 
                    onChange={(e) => changeCharacterIcon(e, el.id)}
                />
            </label>

            <div className={`description_container shadow ${error ? 'error' : ''}`}>
                <textarea ref={area} className='description' value={el.description} onChange={(e) => changeCharacterDescription(e, el.id)}></textarea>

                <DeleteButton callback={() => deleteCharacter(el.id)}/>
            </div>
        </div>
    );
};

export default CharacterItem;