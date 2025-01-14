import React from 'react';
import Cross from '../../../components/cross/Cross';

const ImageContainer = ({ imageRef, image, addImage, pipietteFunction, pipette, error, id }) => {
    return (
        <div className="image_wrapper">
            <h4>изображение</h4>

            <label 
                className={`image_container ${image ? '' : 'shadow'} ${error ? 'error' : ''}`}
                style={{cursor: `${pipette ? 'url("/images/icons/pipette.svg"), auto' : 'pointer'}`, backgroundColor: `${image ? '' : 'var(--grey)'}`}}
                htmlFor={id}
                onClick={(e) => pipietteFunction(e)}>
                
                <canvas 
                    className='gradient'
                    ref={imageRef}
                    width={'230px'}
                    height={'300px'}
                />

                {image ? <></> : <Cross mode={'big'}/>}

                <input id={id} type="file" value={''} onChange={(e) => addImage(e)}/>
            </label>
        </div>
    );
};

export default ImageContainer;