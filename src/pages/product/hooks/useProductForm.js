import { useCallback, useEffect, useRef, useState } from "react"
import Store from "../../../utils/Store"
import { getColor, initCnavasImage, rgbToHex, validateArray, validateFields } from "../../../utils/Services"
import Api from "../../../utils/Api"

export default function useProductForm () {
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(undefined)
    const [characters, setCharacters] = useState([])
    const [pipette, setPipette] = useState(false)
    const [commonData, setCommonData] = useState({
        name: '',
        memory: '',
        price: '',
        colorName: '',
        color: ''
    })
    const [error, setError] = useState({
        name: false,
        memory: false,
        price: false,
        colorName: false,
        color: false,
        characters: false,
        image: false,
    })
    const imageRef = useRef(null)

    Store.useListener('add_new_character', (data) => {
        setCharacters(prev => ([...prev, data]))
    })

    Store.useListener('sendColorToForm', (data) => {
        setCommonData(prev => ({...prev, color: data}))
    })

    Store.useListener('able_pipette', setPipette)

    const pipietteFunction = (e) => {
        if(pipette) {
            e.stopPropagation()
            e.preventDefault()

            const pixel = getColor(e, imageRef)
            const color = '#' + rgbToHex(pixel[0], pixel[1], pixel[2], Math.round(pixel[3] / 255))
            Store.setListener('sendColor', color)
            Store.setListener('sendColorToPicker', color)
            setCommonData(prev => ({...prev, color: color}));
            document.body.style.setProperty('cursor', 'default', 'important')
            setPipette(false)
        }
    }

    const inputCommonData = (e, name) => {
        setError(prev => ({...prev, [name]: false}))

        let value = e.target.value

        switch (name) {
            case 'memory':
                value = value.replace(/[^0-9/]/g, "");
                break
            case 'price':
                if(/^\d*\.?\d*$/.test(value)) {
                    value = value
                } else {
                    setError(prev => ({...prev, [name]: 'Только числовое значение'}))
                    return 
                }
                break
            default:
                break
        }
        
        setCommonData(prev => ({...prev, [name]: value}))
    }

    const changeCharacterIcon = (e, id) => {
        setError(prev => ({...prev, characters: false}))
        setCharacters(characters.map((el) => {
            if(el.id === id) {
                return ({...el, file: e.target.files[0]})
            }
            return el;
        }))
    }

    const changeCharacterDescription = (e, id) => {
        setError(prev => ({...prev, characters: false}))
        setCharacters(characters.map((el) => {
            if(el.id === id) {
                return ({...el, description: e.target.value})
            }
            return el;
        }))
    }

    const addNewProduct = async (e) => {
        e.preventDefault()

        let err = false
        let emptyFields = validateFields(commonData)
        let emptyCharacter = validateArray(characters)

        if(emptyFields) {
            setError(prev => ({
                ...prev,
                ...emptyFields.reduce((acc, field) => {
                    acc[field] = 'это обязательное поле';
                    return acc;
                }, {})
            }));

            err = true
        }

        if(!image) {
            setError(prev => ({...prev, image: true}))
            err = true
        }

        if(emptyCharacter || characters.length <= 0) {
            setError(prev => ({...prev, characters: true}))
            err = true
        }

        if(err) {
            return
        }

        if(+commonData.price <= 0) {
            setError(prev => ({...prev, price: 'Пожалуйста, проверьте цену'}))
            return
        }

        setLoading(true)

        let article = crypto.randomUUID()
        let specifications = []

        let data = new FormData()
        data.append('title', commonData.name)
        data.append('memory', commonData.memory)
        data.append('price', commonData.price * 100)
        data.append('colorName', commonData.colorName)
        data.append('color', commonData.color)
        data.append('main_image', image)
        data.append('article', article)

        let charactersCreate = characters.map(async (el) => {
            let char = new FormData()
            char.append('file', el.file)
            char.append('description', el.description)
            char.append('article', article)
            let item = await Api.postFormData(char, 'api/products/specification/create')

            if(item !== 'error') {
                item.data.id = item.data.specificationsid
                specifications.push(item.data)
            }
        })
        await Promise.all(charactersCreate)

        let res = await Api.postFormData(data, 'api/products/create')

        setLoading(false)

        if(res === 'error') {
            Store.setListener('notice', {type: 'error', text: 'Ощибка'})
            return
        } else {
            Store.setListener('notice', {type: 'success', text: 'Товар добавлен'})
            Store.setListener('add_product', ({...res.data, specifications: specifications}))
        }
    }

    const addImage = (e) => {
        setError(prev => ({...prev, image: false}))

        const image = e.target.files[0]

        initCnavasImage(imageRef, 230, URL.createObjectURL(image))

        setImage(image)
    }

    const deleteCharacter = (id) => {
        setError(prev => ({...prev, characters: false}))

        setCharacters((prev) => prev.filter(el => el.id !== id));
    }

    const stopPipette = useCallback((e) => {
        setPipette(false);
        document.body.style.setProperty('cursor', 'default', 'important');
    }, []);

    useEffect(() => {
        if (pipette) {
            const handleClick = (e) => stopPipette(e);
            window.addEventListener('click', handleClick);
    
            return () => {
                window.removeEventListener('click', handleClick);
            };
        }
    }, [pipette])

    return {
        image,
        characters,
        commonData,
        imageRef,
        pipette,
        setError,
        addImage,
        deleteCharacter,
        changeCharacterIcon,
        changeCharacterDescription,
        inputCommonData,
        addNewProduct,
        pipietteFunction,
        error,
        loading,
    }
}