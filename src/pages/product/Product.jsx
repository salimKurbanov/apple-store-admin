import React from 'react';
import ProductForm from './components/ProductForm';
import './css/product.css';
import StoreList from './components/StoreList';

const Product = () => {
    return (
        <div className='product container'>
            <ProductForm />

            <StoreList />
        </div>
    );
};

export default Product;