import React from 'react';
import './css/home.css';
import Information from './components/information/Information';
import Orders from './components/orders/Orders';


const Home = () => {
    return (
        <div className='home container'>
            <Information />
            <Orders />
        </div>
    );
};

export default Home;