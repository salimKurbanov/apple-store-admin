import React from 'react';
import Cross from '../../../components/cross/Cross';

const ImageContainer = ({ imageRef, image, addImage, pipietteFunction, pipette, error }) => {
    return (
        <div className="image_wrapper">
            <h4>изображение</h4>

            <label 
                className={`image_container ${image ? '' : 'shadow'} ${error ? 'error' : ''}`}
                style={{cursor: `${pipette ? 'url("/images/icons/pipette.svg"), auto' : 'pointer'}`}}
                htmlFor='product_image' 
                onClick={(e) => pipietteFunction(e)}>
                
                <canvas 
                    className='gradient'
                    ref={imageRef}
                    width={'230px'}
                    height={'300px'}
                />

                {image ? <></> : <Cross mode={'big'}/>}

                <input id='product_image' type="file" onChange={(e) => addImage(e)}/>
            </label>
        </div>
    );
};

export default ImageContainer;