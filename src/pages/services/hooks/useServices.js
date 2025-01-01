import { useEffect, useRef, useState } from "react"
import Api from "../../../utils/Api"
import Notice from "../../../components/notice/Notice"
import Store from "../../../utils/Store"


export default function useServices() {

    const [error, setError] = useState({
        description: false,
        title: false,
        price: false
    })
    const [input, setInput] = useState({
        description: undefined,
        image: undefined,
        title: undefined,
        price: undefined,
        preview: false
    })
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

        if(error.description || error.price || error.title || !input.image || !input.title || !input.price || !input.description) {
            Notice.Send({type: 'error', text: 'Заполните правильно все поля'})
            return
        }

        let data = new FormData()
        data.append('title', input.title)
        data.append('description', input.description)
        data.append('image', input.image)
        data.append('price', input.price)

        let req = await Api.postFormData('api/services/create', data)

        if(req === 'error') {
            return Notice.Send({type: 'error', text: req.message})
        }

        // URL.revokeObjectURL()
        setInput(prev => ({...prev, title: '', description: '', price: '', image: false, preview: false}))
        Notice.Send({type: 'success', text: req.message})
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
        area
    }
}