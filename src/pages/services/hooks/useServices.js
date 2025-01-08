import { useEffect, useRef, useState } from "react"
import Api from "../../../utils/Api"
import Store from "../../../utils/Store"
import { validateFields } from "../../../utils/Services"


export default function useServices() {

    const [error, setError] = useState({
        description: false,
        title: false,
        price: false,
        image: false
    })
    const [input, setInput] = useState({
        description: '',
        image: '',
        title: '',
        price: '',
        preview: false
    })
    const [load, setLoad] = useState(false)
    const area = useRef(null)

    useEffect(() => {
        Store.setListener('title', 'Услуги')   
    }, [])

    const inputDescription = (e) => {
        const textarea = area.current;
        const value = validate(e.target.value, 'description')
    
        if (textarea) {
            textarea.style.height = '45px'; 
            const isOverflowing = textarea.scrollHeight > textarea.clientHeight; 

            if (isOverflowing) {
                textarea.style.height = `${textarea.scrollHeight}px`; 
            }
        }
    
        setInput(prev => ({...prev, description: value}));
    };

    const previewImg = (e) => {
        setError(prev => ({...prev, image: false}))
        setInput(prev => ({...prev, image: e.target.files[0], preview: URL.createObjectURL(e.target.files[0])}))
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

        setInput(prev => ({...prev, [name]: value}))
    }

    const submitForm = async (e) => {
        e.preventDefault()
        
        let err = false

        const emptyFields = validateFields(input)

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

        if(!input.image) {
            setError(prev => ({...prev, image: true}))
            err = true
        }


        if(err) {
            Store.setListener('notice', {type: 'error', text: 'Заполните правильно все поля'})
            return
        }

        setLoad(true)

        let data = new FormData()
        data.append('title', input.title)
        data.append('description', input.description)
        data.append('image', input.image)
        data.append('price', input.price)

        let req = await Api.postFormData(data, 'api/services/create')

        if(req === 'error') {
            return 
        }

        setLoad(false)
        setInput(prev => ({...prev, title: '', description: '', price: '', image: false, preview: false}))
        Store.setListener('notice', {type: 'success', text: req.message})
        Store.setListener('newService', (req.data))
    }

    return {
        submitForm,
        change,
        validate,
        previewImg,
        inputDescription,
        error, 
        input,
        area,
        load
    }
}