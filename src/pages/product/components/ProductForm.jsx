import React from 'react';
import ImageContainer from './ImageContainer';
import Characters from './Characters';
import CommonData from './CommonData';
import Button from '../../../components/button/Button';
import useProductForm from '../hooks/useProductForm';
import ColorPicker from '../../../components/color_picker/ColorPicker';

const ProductForm = () => {

    const product = useProductForm()

    return (
        <form className='producct_form'>
            <div className="data_container">
                <ImageContainer image={product.image} addImage={product.addImage}/>

                <CommonData 
                    commonData={product.commonData}
                    inputCommonData={product.inputCommonData}
                />

                <Characters 
                    changeCharacterIcon={product.changeCharacterIcon}
                    changeCharacterDescription={product.changeCharacterDescription}
                    deleteCharacter={product.deleteCharacter} 
                    list={product?.characters}
                />

                <ColorPicker />
            </div>

            <Button callback={product.addNewProduct} mode={'black'}>Добавить</Button>
        </form>
    );
};

export default ProductForm;