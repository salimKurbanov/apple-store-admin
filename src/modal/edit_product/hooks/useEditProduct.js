import { useCallback, useEffect, useRef, useState } from "react"
import { getColor, initCnavasImage, rgbToHex, validateArray, validateCharactersArray, validateFields } from "../../../utils/Services"
import Store from "../../../utils/Store"
import Api from "../../../utils/Api"

export default function useEditProduct() {
    const [isOpen, setIsOpen] = useState(false)
    const [id, setId] = useState(false)
    const [image, setImage] = useState(undefined)
    const [mainFile, setMainFile] = useState(false)
    const [characters, setCharacters] = useState([])
    const [pipette, setPipette] = useState(false)
    const [commonData, setCommonData] = useState({
        name: '',
        memory: '',
        price: '',
        colorName: '',
        color: '',
        article: ''
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
    const editImageRef = useRef(null)
    const isBlock = useRef(false)

    Store.useListener('open_edit_product', (data) => {
        setIsOpen(true)
        setCommonData(prev => ({
            ...prev,
            name: data.title,
            memory: data.memory,
            price: (data.price / 100).toFixed(2),
            colorName: data.colorname,
            color: data.color,
            article: data.article
        }))

        setCharacters(data.specifications.map((el) => {
            return ({...el, file: false})
        }))
        setImage(data.main_image)
        setId(data.productid)
    })

    useEffect(() => {
        if (image && !isBlock.current) {
            const canvas = editImageRef.current;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });

            const img = new Image();
            img.src = `${Api.url}images/products/${image}`;
            img.crossOrigin = "anonymous"
            img.onload = function () {
                const imgWidth = img.naturalWidth;
                const imgHeight = img.naturalHeight;
        
                const width = 230;
                
                const height = (width / imgWidth) * imgHeight;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
            };
            isBlock.current = true
        }
    }, [image, isBlock.current]);

    Store.useListener('edit_new_character', (data) => {
        let newEl = {...data, new: true}
        setCharacters(prev => ([...prev, newEl]))
    })

    Store.useListener('editColorToForm', (data) => {
        setCommonData(prev => ({...prev, color: data}))
    })

    Store.useListener('able_edit_pipette', setPipette)

    const pipietteFunction = (e) => {
        if(pipette) {
            e.stopPropagation()
            e.preventDefault()

            const pixel = getColor(e, editImageRef)
            const color = '#' + rgbToHex(pixel[0], pixel[1], pixel[2], Math.round(pixel[3] / 255))
            Store.setListener('editColor', color)
            Store.setListener('editColorToPicker', color)
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
            let elId = el.id || el.specificationsid
            if(elId === id) {
                return ({...el, file: e.target.files[0]})
            }
            return el;
        }))
    }

    const changeCharacterDescription = (e, id) => {
        setError(prev => ({...prev, characters: false}))
        setCharacters(characters.map((el) => {
            let elId = el.id || el.specificationsid
            if(elId === id) {
                return ({...el, description: e.target.value})
            }
            return el;
        }))
    }

    const editProduct = async (e) => {
        e.preventDefault()

        let err = false
        let emptyFields = validateFields(commonData)
        let emptyCharacter = validateCharactersArray(characters)

        if(emptyFields) {
            setError(prev => ({
                ...prev,
                ...emptyFields.reduce((acc, field) => {
                    acc[field] = 'это обязательное поля';
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
            setError(prev => ({...prev, price: true}))
            return
        }

        let specifications = []

        let data = new FormData()
        data.append('title', commonData.name)
        data.append('memory', commonData.memory)
        data.append('price', commonData.price * 100)
        data.append('colorName', commonData.colorName)
        data.append('color', commonData.color)
        data.append('main_image', image)
        data.append('mainFile', mainFile)

        let charactersCreate = characters.map(async (el) => {
            let char = new FormData()
            char.append('description', el.description)
            char.append('file', el.file)
            if(el.new) {
                char.append('article', commonData.article)
                let item = await Api.postFormData(char, 'api/products/specification/create')

                if(item !== 'error') {
                    item.data.id = item.data.specificationsid
                    specifications.push(item.data)
                }
            } else {
                char.append('icon', el.icon)
                let item = await Api.putFormData(char, `api/products/specification/update/${el.id || el.specificationsid}`)
    
                if(item !== 'error') {
                    item.data.id = item.data.specificationsid
                    specifications.push(item.data)
                }
            }
        })
        await Promise.all(charactersCreate)

        const res = await Api.putFormData(data, `api/products/update/${id}`)

        if(res === 'error') {
            Store.setListener('notice', {type: 'error', text: res.message})
            return
        } else {
            Store.setListener('notice', {type: 'success', text: 'Товар изменён'})
            Store.setListener('edit_product', ({...res.data, specifications: specifications}))
            closeModal(e, true)
        }
    }

    const addImage = (e) => {
        setError(prev => ({...prev, image: false}))

        const image = e.target.files[0]

        initCnavasImage(editImageRef, 230, URL.createObjectURL(image))

        setImage(image)
        setMainFile(image)
    }

    const closeModal = (e, key) => {
        if(e.target === e.currentTarget || key) {
            setIsOpen(false)
            setCommonData({
                name: '',
                memory: '',
                price: '',
                colorName: '',
                color: ''
            })
            setMainFile(false)
    
            setCharacters([])
            setImage(undefined)
            setId(false)
            isBlock.current = false
            setError({
                name: false,
                memory: false,
                price: false,
                colorName: false,
                color: false,
                characters: false,
                image: false,
            })
        }
    }

    const deleteCharacter = async (id) => {
        setError(prev => ({...prev, characters: false}))

        const res = await Api.delete(`api/products/delete/specification/${id}`)

        if(res !== 'error') {
            setCharacters((prev) => prev.filter(el => (el.id || el.specificationsid) !== id));
            Store.setListener('notice', {type: 'success', text: 'Характеристика удалёна'})
            return
        }
    }

    const stopPipette = useCallback((e) => {
        setPipette(false);
        document.body.style.setProperty('cursor', 'default', 'important');
    }, [setPipette]);
    
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
        isOpen,
        image,
        characters,
        commonData,
        editImageRef,
        pipette,
        setError,
        addImage,
        deleteCharacter,
        changeCharacterIcon,
        changeCharacterDescription,
        inputCommonData,
        editProduct,
        pipietteFunction,
        error,
        closeModal,
    }
}