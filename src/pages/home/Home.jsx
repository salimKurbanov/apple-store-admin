import React, { useEffect } from 'react';
import './css/home.css';
import Information from './components/information/Information';
import Orders from './components/orders/Orders';
import Store from '../../utils/Store';


const Home = () => {

    useEffect(() => {
        Store.setListener('title', 'Главная')   
    }, [])
    
    return (
        <div className='home container'>
            <Information />
            <Orders />
        </div>
    );
};

export default Home;