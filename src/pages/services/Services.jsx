import React from 'react';
import './css/services.css';
import Form from './components/Form';
import List from './components/List';


const Services = () => {

    return (
        <div className='services container'>

            <div className="services_panel">
                <Form />
                <List />
            </div>

            <div className="services_orders"></div>
        </div>
    );
};

export default Services;