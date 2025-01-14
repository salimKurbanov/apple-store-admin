import React, { useEffect } from 'react';
import ProductForm from './components/ProductForm';
import './css/product.css';
import StoreList from './components/StoreList';
import Store from '../../utils/Store';

const Product = () => {

    useEffect(() => {

        Store.setListener('title', 'Товары')

    }, [])
    return (
        <div className='product container'>
            <ProductForm />

            <StoreList />
        </div>
    );
};

export default Product;