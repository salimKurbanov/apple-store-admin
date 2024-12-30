import React from 'react';
import './css/color_picker.css';
import useColorPicker from './hooks/useColorPicker';
import Input from '../input/Input';

const ColorPicker = () => {

    const color = useColorPicker()

    return (
        <div className="color_picker shadow">
            <h2>Выберите цвет</h2>
            
            <div className="image_container">

                <canvas 
                    className='gradient'
                    ref={color.canvasRef}
                    width={color.canvasWidth}
                    height={color.canvasHeight}
                    onMouseDown={color.dragStart}
                />
                <div className="pointer" ref={color.pointer}></div>
            </div>

            <div className="transparency">
                <h4>прозрачность</h4>

                <input 
                    type="range" 
                    onInput={(e) => color.changeTransparency(e)} 
                    onMouseMove={(e) => e.stopPropagation()}
                    min={0} 
                    max={1} 
                    step={0.01} 
                    value={color.transparency}/>
            </div>

            <Input 
                label={'HEX'} 
                type={'text'} 
                value={color.selectedColor} 
                onChange={color.inputColor} 
                onBlur={''}
                placeholder={''} 
                mode={'full'}
            />
        </div>
    );
};

export default ColorPicker;