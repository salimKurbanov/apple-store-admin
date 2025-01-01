import { useEffect, useRef, useState } from "react"
import Store from "../../../utils/Store"
import { getColor, initCnavasImage, rgbToHex, validateArray, validateFields } from "../../../utils/Services"
import Api from "../../../utils/Api"
import Notice from "../../../components/notice/Notice"

export default function useProductForm () {
    const [image, setImage] = useState(undefined)
    const [characters, setCharacters] = useState([])
    const [pipette, setPipette] = useState(false)
    const [commonData, setCommonData] = useState({
        name: undefined,
        memory: undefined,
        price: undefined,
        colorName: undefined,
        color: undefined
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
                if (/^\d*\.?\d*$/.test(value)) {
                    value = value
                } else {return}
                break
            default:
                break
        }

        setCommonData(prev => ({...prev, [name]: value}))
    }

    const changeCharacterIcon = (e, id) => {
        setError(prev => ({...prev, characters: false}))
        setCharacters(characters.map((el) => {
            if(el.imageName === id) {
                return ({...el, file: e.target.files[0]})
            }
            return el;
        }))
    }

    const changeCharacterDescription = (e, id) => {
        setError(prev => ({...prev, characters: false}))
        setCharacters(characters.map((el) => {
            if(el.imageName === id) {
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

        if(+commonData.price <= 0) {
            setError(prev => ({...prev, price: true}))
            Notice.Send({type: 'error', text: 'Пожалуйста, првоерьте цену'})
            return
        }

        if(emptyFields) {
            setError(prev => ({
                ...prev,
                ...emptyFields.reduce((acc, field) => {
                    acc[field] = true;
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
            Notice.Send({type: 'error', text: 'Пожалуйста, заполните все поля'})
            return
        }

        let data = new FormData()
        data.append('title', commonData.name)
        data.append('memory', commonData.memory)
        data.append('price', commonData.price * 100)
        data.append('colorName', commonData.colorName)
        data.append('color', commonData.color)
        data.append('main_image', image)
        data.append('specifications', JSON.stringify(characters))

        const res = await Api.postFormData(data, 'api/products/create')

        if(res === 'error') {
            Notice.Send({type: 'error', text: res.message})
            return
        } else {
            Notice.Send({type: 'success', text: res.message})
        }
    }

    const addImage = (e) => {
        setError(prev => ({...prev, image: false}))

        const image = e.target.files[0]

        initCnavasImage(imageRef, 230, 300, URL.createObjectURL(image))

        setImage(image)
    }

    const deleteCharacter = (elToDelete) => {
        setError(prev => ({...prev, characters: false}))

        setCharacters((prev) => prev.filter(el => el.imageName !== elToDelete));
    }

    const stopPipette = (e) => {
        setPipette(false)
        document.body.style.setProperty('cursor', 'default', 'important')
    }

    useEffect(() => {
        if(pipette) {
            window.addEventListener('click', (e) => stopPipette(e))
        }

        return () => {
            if(pipette) {
                window.removeEventListener('click', stopPipette)
            }
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
    }
}