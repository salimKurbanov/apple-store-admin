import React from 'react';
import AddCharacter from './AddCharacter';
import CharacterItem from './CharacterItem';

const Characters = ({ changeCharacterDescription, changeCharacterIcon, deleteCharacter, list }) => {
    return (
        <div className='characters'>
            <h4>характеристики</h4>
            
            {list?.length ? 
            <>
                {list.map(el => (
                    <CharacterItem
                    el={el} 
                    key={el.imageName} 
                    deleteCharacter={deleteCharacter}
                    changeCharacterIcon={changeCharacterIcon}
                    changeCharacterDescription={changeCharacterDescription}
                />
                ))}
            </>
            : <></>}
            
            {list?.length < 4 ? <AddCharacter />:<></>}
        </div>
    );
};

export default Characters;