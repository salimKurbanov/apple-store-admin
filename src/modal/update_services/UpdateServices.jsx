import React, { useEffect, useRef, useState } from 'react';
import Store from '../../utils/Store';
import './css/update.css';
import Input from '../../components/input/Input';
import TextArea from '../../components/textarea/TextArea';
import Api from '../../utils/Api';
import Button from '../../components/button/Button';
import { validateFields } from '../../utils/Services';
import useUpdate from './hooks/useUpdate';


const UpdateServices = () => {

    const update = useUpdate()

    if(!update.open) return null

    return (
        <div className='update_popup' onMouseDown={update.close}>
            <form action="" onMouseDown={(e) => e.stopPropagation()}>
                <h2>Редактировать услугу</h2>
                <Input onChange={(e) => update.change(e, 'title')} mode={'full'} value={update.item.title} label={'название'} error={update.error.title}/>
                <TextArea onChange={update.inputDescription} refCurrent={update.area} error={update.error.description} label={'описание'} mode={'full'} value={update.item.description}/>
                <Input onChange={(e) => update.change(e, 'price')} mode={'full'} value={update.item.price} label={'цена, руб.'} error={update.error.price}/>

                <div className="icon">
                    <h3>иконка</h3>
                    <label className={update.error.image ? 'error' : ''} htmlFor="preview_modal">
                        <input id='preview_modal' value={''} type="file" onChange={update.previewImg}/>
                        {update.img.preview
                        ? <img src={update.img.preview} alt="" className="cover_image" /> 
                        : update.item.image 
                        ? <img src={`${Api.url}images/service/${update.item.image}`} alt="" className="cover_image" /> 
                        :<span>+</span>}
                    </label>
                </div>

                <Button type={'submit'} mode={'full black'} callback={update.submitForm}>
                    Сохранить
                </Button>
            </form>
        </div>
    );
};

export default UpdateServices;