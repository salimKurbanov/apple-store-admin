import React from 'react';
import CharacterItem from './CharacterItem';
import AddCharacter from './AddCharacter';

const Characters = ({setError, changeCharacterDescription, changeCharacterIcon, deleteCharacter, list, error}) => {
    return (
        <div className='characters'>
            <h4>характеристики</h4>
            
            {list?.length ? 
            <>
                {list.map(el => (
                    <CharacterItem
                        error={error}
                        el={el} 
                        key={el.imageName} 
                        deleteCharacter={deleteCharacter}
                        changeCharacterIcon={changeCharacterIcon}
                        changeCharacterDescription={changeCharacterDescription}
                    />
                ))}
            </>
            : <></>}
            
            {list?.length < 4 ? <AddCharacter setError={setError} error={error} />:<></>}
        </div>
    );
};

export default Characters;