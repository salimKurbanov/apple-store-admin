import React, { useEffect } from 'react';
import Store from '../../utils/Store';
import Input from '../../components/input/Input';

const Services = () => {

    useEffect(() => {
        Store.setListener('title', 'Услуги')   
    }, [])

    return (
        <div className='services container'>
            <Input label={'название'} />
        </div>
    );
};

export default Services;