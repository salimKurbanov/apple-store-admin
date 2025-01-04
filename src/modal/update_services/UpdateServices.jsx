import React, { useRef, useState } from 'react';
import Store from '../../utils/Store';
import './css/update.css';
import Input from '../../components/input/Input';
import TextArea from '../../components/textarea/TextArea';
import Api from '../../utils/Api';
import Button from '../../components/button/Button';
import { validateFields } from '../../utils/Services';


const UpdateServices = () => {

    const [item, setItem] = useState({
        datetime: '',
        description: '',
        image: '',
        price: '',
        servicesid: '',
        title: '',
    })
    const [img, setImg] = useState({
        file: false,
        preview: false
    })
    const [error, setError] = useState({
        description: false,
        image: false,
        price: false,
        servicesid: false,
        title: false
    })
    const [open, setOpen] = useState(false)
    const area = useRef(null)

    Store.useListener('open_services_modal', (data) => {
        setOpen(data.modal)
        setItem(data.el)
    })

    const previewImg = (e) => {
        setError(prev => ({...prev, image: false}))
        setImg(prev => ({...prev, file: e.target.files[0], preview: URL.createObjectURL(e.target.files[0])}))
    }

    const close = () => {
        document.body.style.overflow = 'visible'
        setItem({ datetime: '', description: '', image: '', price: '', servicesid: '', title: ''})
        setImg({file: false, preview: false})
        setOpen(false)
    }

    const validate = (value, name) => {
        setError(prev => ({...prev, [name]: false}))
        switch(name) {
            case 'title':
                if(value.length < 3) {
                    setError(prev => ({...prev, [name]: 'Значение не может быть короче 3х символов'}))
                }
                break
            case 'price':
                if(value === '') {
                    setError(prev => ({...prev, [name]: 'Обязательное поле'}))
                } else if(/^\d*\.?\d*$/.test(value)) {
                    value = value
                } else {
                    setError(prev => ({...prev, [name]: 'Только числовое значение'}))
                    return ''
                }
                break
            case 'description':
                if(value.length < 3) {
                    setError(prev => ({...prev, [name]: 'Значение не может быть короче 3х символов'}))
                }
                break
            default:
                break
        }

        return value
    }

    const change = (e, name) => {
        const value = validate(e.target.value, name)
        setItem(prev => ({...prev, [name]: value}))
    }

    const submitForm = async (e) => {
        e.preventDefault()
        
        let err = false

        const emptyFields = validateFields(item)

        if(emptyFields) {
            setError(prev => ({
                ...prev,
                ...emptyFields.reduce((acc, field) => {
                    acc[field] = "Обязательное поле";
                    return acc;
                }, {})
            }));

            err = true
        }

        if(!img.file) {
            setError(prev => ({...prev, image: true}))
            err = true
        }

        if(err) {
            Store.setListener('notice', {type: 'error', text: 'Заполните правильно все поля'})
            return
        }


        let data = new FormData()
        data.append('title', item.title)
        data.append('description', item.description)
        data.append('image', item.image)
        data.append('price', item.price)
        data.append('file', img.file)

        let req = await Api.put(data, 'api/services/create')

        if(req === 'error') {
            Store.setListener('notice', {type: 'error', text: req.message})
            return 
        }

        setInput(prev => ({...prev, title: '', description: '', price: '', image: false, preview: false}))
        Store.setListener('notice', {type: 'success', text: req.message})
        Store.setListener('newService', (req.data))
    }

    if(!open) return null

    return (
        <div className='update_popup' onMouseDown={close}>
            <form action="" onMouseDown={(e) => e.stopPropagation()}>
                <h2>Редактировать услугу</h2>
                <Input onChange={(e) => change(e, 'title')} mode={'full'} value={item.title} label={'название'} error={error.title}/>
                <TextArea onChange={(e) => change(e, 'description')} refCurrent={area} error={error.description} label={'описание'} mode={'full'} value={item.description}/>
                <Input onChange={(e) => change(e, 'price')} mode={'full'} value={item.price} label={'название'} error={error.price}/>

                <div className="icon">
                    <h3>иконка</h3>
                    <label className={error.image ? 'error' : ''} htmlFor="preview_modal">
                        <input id='preview_modal' value={''} type="file" onChange={previewImg}/>
                        {img.preview
                        ? <img src={img.preview} alt="" className="cover_image" /> 
                        : item.image 
                        ? <img src={`${Api.url}images/service/${item.image}`} alt="" className="cover_image" /> 
                        :<span>+</span>}
                    </label>
                </div>

                <Button mode={'full black'}>
                    Сохранить
                </Button>
            </form>
        </div>
    );
};

export default UpdateServices;