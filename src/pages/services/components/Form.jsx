import React from 'react';
import useServices from '../hooks/useServices';
import Input from '../../../components/input/Input';
import TextArea from '../../../components/textarea/TextArea';
import Button from '../../../components/button/Button';

const Form = () => {

    const services = useServices()

    return (
        <form action="">
            <Input value={services.input.title} onChange={(e) => services.change(e, 'title')} label={'название'} mode={`full`} error={services.error.title}/>
            <TextArea onChange={services.inputDescription} refCurrent={services.area} error={services.error.description} label={'описание'} mode={'full'} value={services.input.description}/>
            <Input value={services.input.price} onChange={(e) => services.change(e, 'price')} label={'цена'} mode={`full`} error={services.error.price}/>

            <div className="icon">
                <h3>иконка</h3>
                <label className={services.error.image ? 'error' : ''} htmlFor="preview">
                    <input id='preview' value={''} type="file" onChange={services.previewImg}/>
                    {services.input.preview 
                    ? <img src={services.input.preview} alt="" className="cover_image" /> 
                    : <span>+</span>}
                </label>
            </div>

            <Button type={'submit'} callback={services.submitForm} mode={'black max-content'}>
                Добавить
            </Button>
        </form>

    );
};

export default Form;