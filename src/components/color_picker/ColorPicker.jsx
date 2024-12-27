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
                <img src="/images/color_picker.svg" alt="" />

                <div className="pointer"></div>
            </div>

            <div className="transparency">
                <h4>прозрачность</h4>

                <input type="range"  min="0" max="100" />
            </div>

            <Input 
                label={'HEX'} 
                type={'text'} 
                value={''} 
                onChange={''} 
                onBlur={''}
                placeholder={''} 
                mode={'full'}
            />
        </div>
    );
};

export default ColorPicker;