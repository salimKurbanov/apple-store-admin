import React from 'react';
import ImageContainer from './ImageContainer';
import Characters from './Characters';
import CommonData from './CommonData';
import Button from '../../../components/button/Button';
import useProductForm from '../hooks/useProductForm';

const ProductForm = () => {

    const product = useProductForm()

    return (
        <form className='producct_form'>
            <div className="data_container">
                <ImageContainer
                    error={product.error.image}
                    imageRef={product.imageRef}
                    image={product.image} 
                    addImage={product.addImage}
                    pipette={product.pipette}
                    pipietteFunction={product.pipietteFunction  }
                />

                <CommonData 
                    setError={product.setError}
                    error={product.error}
                    commonData={product.commonData}
                    inputCommonData={product.inputCommonData}
                />

                <Characters 
                    setError={product.setError}
                    error={product.error.characters}
                    changeCharacterIcon={product.changeCharacterIcon}
                    changeCharacterDescription={product.changeCharacterDescription}
                    deleteCharacter={product.deleteCharacter} 
                    list={product?.characters}
                />
            </div>

            <Button callback={product.addNewProduct} mode={'black'}>Добавить</Button>
        </form>
    );
};

export default ProductForm;