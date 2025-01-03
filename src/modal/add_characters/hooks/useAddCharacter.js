import { useRef, useState } from "react"
import Store from "../../../utils/Store"

export default function useAddCharacter () {
    const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState({
        icon: false,
        description: false
    })
    const [newItem, setNewItem] = useState({
        file: false,
        description: '',
        imageName: crypto.randomUUID(),
    })
    const [key, setKey] = useState('')

    const area = useRef(null)

    Store.useListener('open_character_modal', (data) => {
        setKey(data)
        setIsOpen(true)
    })

    const closeModal = () => {
        setIsOpen(false)
        setError({
            icon: false,
            description: false
        })
        setNewItem({
            file: false,
            description: '',
            imageName: crypto.randomUUID(),
        })
    }

    const inputDescription = (e) => {
        setError(prev => ({...prev, description: false}))
        const textarea = area.current;
    
        if (textarea) {
            textarea.style.height = '45px'; 
            const isOverflowing = textarea.scrollHeight > textarea.clientHeight; 

            if (isOverflowing) {
                textarea.style.height = `${textarea.scrollHeight}px`; 
            }
        }
    
        setNewItem(prev => ({...prev, description: e.target.value}));
    };

    const addImage = (e) => {
        setError(prev => ({...prev, icon: false}))
        setNewItem(prev => ({...prev, file: e.target.files[0]}))
    }

    const addCharacter = (e) => {
        e.preventDefault()
        if(newItem.description === '') {
            setError(prev => ({...prev, description: true}))
        }
        if(newItem.file === false) {
            setError(prev => ({...prev, icon: true}))
        }
        if(newItem.file === false || newItem.description === '') {
            return
        }

        Store.setListener(key, newItem)
        closeModal()
    }

    return {
        error,
        isOpen,
        closeModal,
        newItem,
        area,
        inputDescription,
        addImage,
        addCharacter
    }
}