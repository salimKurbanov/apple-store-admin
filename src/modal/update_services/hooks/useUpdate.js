import { useRef, useState } from "react"
import Store from "../../../utils/Store"
import Api from "../../../utils/Api"
import { validateFields } from "../../../utils/Services"


export default function useUpdate() {

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
    
        setItem(prev => ({...prev, description: value}));
    };

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

        let req = await Api.putFormData(data, `api/services/update/${item.servicesid}`)

        if(req === 'error') {
            return
        }

        Store.setListener('updateList', req.data)
        Store.setListener('notice', {type: 'success', text: req.message})
        close()
    }

    return {
        item, 
        img,
        error,
        open,
        area,
        previewImg,
        close,
        change,
        submitForm,
        inputDescription
    }
}