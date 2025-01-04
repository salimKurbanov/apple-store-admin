import React, { useEffect, useRef } from 'react';
import DeleteButton from '../../../components/delete_button/DeleteButton';
import Api from '../../../utils/Api';

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
            <label className={`character_icon shadow ${error ? 'error' : ''}`} htmlFor={el.id || el.specificationsid}>
                <img src={el.file instanceof File ? URL.createObjectURL(el.file) : `${Api.url}images/products/${el.icon}`} alt="" />
                <input 
                    value={''}
                    id={el.id || el.specificationsid} 
                    type="file" 
                    onChange={(e) => changeCharacterIcon(e, (el.id || el.specificationsid))}
                />
            </label>

            <div className={`description_container shadow ${error ? 'error' : ''}`}>
                <textarea ref={area} className='description' value={el.description} onChange={(e) => changeCharacterDescription(e, (el.id || el.specificationsid))}></textarea>

                <DeleteButton callback={() => deleteCharacter(el.id || el.specificationsid)}/>
            </div>
        </div>
    );
};

export default CharacterItem;