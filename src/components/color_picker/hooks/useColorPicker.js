import { useEffect, useRef, useState } from "react";
import { initCnavasImage, makeColor, rgbToHex, toHex } from "../../../utils/Services";
import Store from "../../../utils/Store";

export default function useColorPicker (keys) {
    const [isOpen, setIsOpen] = useState(false)
    const canvasRef = useRef(null);
    const pointer = useRef(null)
    const [selectedColor, setSelectedColor] = useState('#FFFFFF');
    const [isBlock, setIsBlock] = useState(true)
    const [transparency, setTransparency] = useState(1)
    const canvasWidth = 200;
    const canvasHeight = 127;

    Store.useListener(keys.openModal, () => {
        setIsOpen(prev => prev = prev === true ? false : true)
    })

    useEffect(() => {
        if(isOpen) {
            const image = '/color_picker.svg'

            initCnavasImage(canvasRef, canvasWidth, image, canvasHeight)

            window.addEventListener('mousedown', closeColorPicker)
            window.addEventListener('mousemove', dragMove)
            window.addEventListener('mouseup', dragEnd)
        }

        return () => {
            window.removeEventListener('mousedown', closeColorPicker)
            window.removeEventListener('mouseup', dragEnd)
            window.removeEventListener('mousemove', dragMove)
        }
    }, [isOpen, isBlock, selectedColor]);

    Store.useListener(keys.sendColorToPicker, setSelectedColor)

    const changeTransparency = (e) => {
        e.stopPropagation()

        const alpha = toHex(Math.round(e.target.value * 255))

        const updatedColor = selectedColor.slice(0, 7) + alpha;
        setSelectedColor(updatedColor)
        Store.setListener(keys.sendColor, updatedColor)
        setTransparency(e.target.value)
    }

    const inputColor = (e) => {
        let value = e.target.value

        const hexPattern = /^#[0-9A-Fa-f]{0,8}$/; //так же ограничивает колличество символов до 8ми после №
        
        if (!hexPattern.test(value)) {
            return false;
        }

        if (!value.startsWith("#")) {
            value = "#" + value.replace(/#/g, ""); // Добавляем # и удаляем лишние #
        }

        setSelectedColor(value)
        Store.setListener(keys.sendColor, value)
        Store.setListener(keys.sendColorToForm, value)
    }

    const dragMove = (e) => {
        e.preventDefault()

        if(!isBlock) {
            const pixel = makeColor(e, canvasRef, pointer)

            const color = '#' + rgbToHex(pixel[0], pixel[1], pixel[2], transparency)
            
            Store.setListener(keys.sendColor, color)

            setSelectedColor(color);

            return
        }

        return
    };

    const dragStart = (e) => {
        e.preventDefault()

        const pixel = makeColor(e, canvasRef, pointer)

        const color = '#' + rgbToHex(pixel[0], pixel[1], pixel[2], transparency)

        Store.setListener(keys.sendColor, color)

        setSelectedColor(color);

        setIsBlock(false)
    }

    const dragEnd = (e) => {
        e.preventDefault()
        setIsBlock(true)
        Store.setListener(keys.sendColorToForm, selectedColor)
    }

    const pipietteFunction = (e) => {
        e.stopPropagation()
        document.body.style.setProperty('cursor', 'url("/pipette.svg"), auto', 'important')
        Store.setListener(keys.able_pipette, true)
    }

    const closeColorPicker = () => {
        setIsOpen(false)
    }

    return {
        isOpen,
        canvasWidth,
        canvasHeight,
        canvasRef,
        pointer,
        selectedColor,
        transparency,
        dragStart,
        dragMove,
        dragEnd,
        inputColor,
        changeTransparency,
        pipietteFunction,
    }
}