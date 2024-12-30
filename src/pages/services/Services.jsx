import React from 'react';
import Input from '../../components/input/Input';
import TextArea from '../../components/textarea/TextArea';
import './css/services.css';
import Button from '../../components/button/Button';
import useServices from './hooks/useServices';


const Services = () => {

    const services = useServices()

    return (
        <div className='services container'>
            <div className="services_panel">

                <form action="">
                    <Input value={services.input.title} onChange={(e) => services.change(e, 'title')} label={'название'} mode={`full`} error={services.error.title}/>
                    <TextArea onChange={services.inputDescription} refCurrent={services.area} error={services.error.description} label={'описание'} mode={'full'} value={services.input.description}/>
                    <Input value={services.input.price} onChange={(e) => services.change(e, 'price')} label={'цена'} mode={`full`} error={services.error.price}/>

                    <div className="icon">
                        <h3>иконка</h3>
                        <label htmlFor="preview">
                            <input id='preview' type="file" onChange={services.previewImg}/>
                            {services.preview 
                            ? <img src={services.preview} alt="" className="cover_image" /> 
                            : <span>+</span>}
                        </label>
                    </div>

                    <Button type={'submit'} callback={services.submitForm} mode={'black max-content'}>
                        Добавить
                    </Button>
                </form>

            </div>
            <div className="services_orders"></div>
        </div>
    );
};

export default Services;