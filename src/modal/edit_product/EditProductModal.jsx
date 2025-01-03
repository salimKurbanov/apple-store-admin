import React from 'react';
import './css/edit_product.css'
import useEditProduct from './hooks/useEditProduct';
import ImageContainer from '../../pages/product/components/ImageContainer';
import Button from '../../components/button/Button';
import CommonData from './components/CommonData';
import Characters from './components/Characters';

const EditProductModal = () => {

    const product = useEditProduct()

    if(!product.isOpen) return null

    return (
        <div className='edit_product_modal_wrapper' onMouseDown={product.closeModal}>
            <div className="edit_product_modal">
                <h2>Редактировать товар</h2>

                <form className='producct_form'>
                    <div className="data_container">
                        <ImageContainer
                            id={'edit_image'}
                            error={product.error.image}
                            imageRef={product.editImageRef}
                            image={product.image} 
                            addImage={product.addImage}
                            pipette={product.pipette}
                            pipietteFunction={product.pipietteFunction}
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

                    <Button 
                        callback={product.editProduct} 
                        mode={'black'}
                    >Сохранить</Button>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;