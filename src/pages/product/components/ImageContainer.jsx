import React from 'react';
import Cross from '../../../components/cross/Cross';

const ImageContainer = ({ image, addImage }) => {
    return (
        <div className="image_wrapper">
            <h4>изображение</h4>

            <label className={`image_container ${image ? '' : 'shadow'}`} htmlFor='product_image' >
                {image ? 
                    <img className='image' src={URL.createObjectURL(image)} alt="" />
                :
                    <Cross mode={'big'}/>
                }

                <input id='product_image' type="file" onChange={(e) => addImage(e)}/>
            </label>
        </div>
    );
};

export default ImageContainer;