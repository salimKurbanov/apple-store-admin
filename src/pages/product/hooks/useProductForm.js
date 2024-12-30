import { useState } from "react"
import Store from "../../../utils/Store"

export default function useProductForm () {
    const [image, setImage] = useState(false)
    const [characters, setCharacters] = useState([])
    const [commonData, setCommonData] = useState({
        name: '',
        memory: '',
        price: '',
        colorName: '',
        color: ''
    })

    Store.useListener('add_new_character', (data) => {
        setCharacters(prev => ([...prev, data]))
    })

    Store.useListener('sendColorToForm', (data) => {
        setCommonData(prev => ({...prev, color: data}))
    })

    const inputCommonData = (e, name) => {
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
        setCharacters(characters.map((el) => {
            if(el.imageName === id) {
                return ({...el, file: e.target.files[0]})
            }
            return el;
        }))
    }

    const changeCharacterDescription = (e, id) => {
        setCharacters(characters.map((el) => {
            if(el.imageName === id) {
                return ({...el, description: e.target.value})
            }
            return el;
        }))
    }

    const addNewProduct = (e) => {
        e.preventDefault()

        let obj = structuredClone(commonData)

        obj.price *= 100

        const body = {
            ...obj,
            image: image,
            characters: characters
        }

        console.log('успешно', body)
    }

    const addImage = (e) => {
        setImage(e.target.files[0])
    }

    const deleteCharacter = (elToDelete) => {
        setCharacters((prev) => prev.filter(el => el.imageName !== elToDelete));
    }

    return {
        image,
        characters,
        commonData,
        addImage,
        deleteCharacter,
        changeCharacterIcon,
        changeCharacterDescription,
        inputCommonData,
        addNewProduct,
    }
}