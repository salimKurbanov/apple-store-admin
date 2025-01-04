import React from 'react';
import './css/services.css';
import Form from './components/Form';
import List from './components/List';
import Orders from './components/Orders';


const Services = () => {

    return (
        <div className='services container'>

            <div className="services_panel">
                <Form />
                <List />
            </div>

            <Orders />
        </div>
    );
};

export default Services;