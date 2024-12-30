import { useEffect, useRef, useState } from "react";
import Store from "../../../utils/Store";

export default function useColorPicker () {
    const canvasRef = useRef(null);
    const pointer = useRef(null)
    const [selectedColor, setSelectedColor] = useState('#FFFFFF');
    const [isBlock, setIsBlock] = useState(true)
    const [transparency, setTransparency] = useState(1)
    const canvasWidth = 211;
    const canvasHeight = 127;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
    
        const img = new Image();
        img.src = 'images/color_picker.svg';
        img.onload = function () {
            ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
        };

        window.addEventListener('mousemove', dragMove)
        window.addEventListener('mouseup', dragEnd)

        return () => {
            window.removeEventListener('mouseup', dragEnd)
            window.removeEventListener('mousemove', dragMove)
        }
    }, [isBlock, selectedColor]);

    const changeTransparency = (e) => {
        e.stopPropagation()

        const alpha = toHex(Math.round(e.target.value * 255))

        const updatedColor = selectedColor.slice(0, 7) + alpha;
        setSelectedColor(updatedColor)
        Store.setListener('sendColor', updatedColor)
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
        Store.setListener('sendColor', value)
        Store.setListener('sendColorToForm', value)
    }

    const dragMove = (e) => {
        e.preventDefault()

        if(!isBlock) {
            const pixel = makeColor(e)
            
            Store.setListener('sendColor', '#' + rgbToHex(pixel[0], pixel[1], pixel[2], transparency))

            setSelectedColor('#' + rgbToHex(pixel[0], pixel[1], pixel[2], transparency));
        }

        return
    };

    const dragStart = (e) => {
        e.preventDefault()
        const pixel = makeColor(e)

        Store.setListener('sendColor', '#' + rgbToHex(pixel[0], pixel[1], pixel[2], transparency))

        setSelectedColor('#' + rgbToHex(pixel[0], pixel[1], pixel[2], transparency));

        setIsBlock(false)
    }

    const dragEnd = (e) => {
        e.preventDefault()
        setIsBlock(true)
        Store.setListener('sendColorToForm', selectedColor)
    }

    const makeColor = (event) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        if(x < 0) {
            x = 0
        } else if(x > 210) {
            x = 210
        } 

        if(y < 0) {
            y = 0
        } else if (y > 126) {
            y = 126
        }

        pointer.current.style.top = `${y}px`
        pointer.current.style.left = `${x}px`

        return ctx.getImageData(x, y, 1, 1).data;
    }

    function rgbToHex(R,G,B,A) {return toHex(R) + toHex(G) + toHex(B) + (A < 1 ? toHex(Math.round(A * 255)) : '');}

    function toHex(value) {
        value = Math.max(0, Math.min(255, Math.round(value)));
        
        return value.toString(16).padStart(2, '0').toUpperCase();
    }

    return {
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
    }
}