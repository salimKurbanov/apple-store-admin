import React from 'react';
import AddCharacter from './AddCharacter';
import CharacterItem from './CharacterItem';

const Characters = ({ setError, changeCharacterDescription, changeCharacterIcon, deleteCharacter, list, error }) => {
    return (
        <div className='characters'>
            <h4>характеристики</h4>
            
            {list?.length ? 
            <>
                {list.map(el => (
                    <CharacterItem
                        error={error}
                        el={el} 
                        key={el.id} 
                        deleteCharacter={deleteCharacter}
                        changeCharacterIcon={changeCharacterIcon}
                        changeCharacterDescription={changeCharacterDescription}
                    />
                ))}
            </>
            : <></>}
            
            {list?.length < 3 ? <AddCharacter setError={setError} error={error} />:<></>}
        </div>
    );
};

export default Characters;