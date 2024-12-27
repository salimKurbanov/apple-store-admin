import React, { useEffect, useRef } from 'react';
import DeleteButton from '../../../components/delete_button/DeleteButton';

const CharacterItem = ({el, deleteCharacter, changeCharacterIcon, changeCharacterDescription}) => {

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
            <label className='character_icon shadow' htmlFor={el.imageName}>
                <img src={URL.createObjectURL(el.file)} alt="" />
                <input 
                    id={el.imageName} 
                    type="file" 
                    onChange={(e) => changeCharacterIcon(e, el.imageName)}
                />
            </label>

            <div className="description_container shadow">
                <textarea ref={area} className='description' value={el.description} onChange={(e) => changeCharacterDescription(e, el.imageName)}></textarea>

                <DeleteButton callback={() => deleteCharacter(el.imageName)}/>
            </div>
        </div>
    );
};

export default CharacterItem;