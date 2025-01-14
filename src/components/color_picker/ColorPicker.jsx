import React from 'react';
import './css/color_picker.css';
import useColorPicker from './hooks/useColorPicker';
import Input from '../input/Input';

const ColorPicker = ({keys}) => {

    const color = useColorPicker(keys)

    if(!color.isOpen) return null

    return (
        <div className="color_picker shadow" onMouseDown={(e) => e.stopPropagation()}>
            <div className="header">
                <h2>Выберите цвет</h2>

                <div className="piepette" onClick={color.pipietteFunction}>
                    <svg fill="#000000" height="15px" width="15px" version="1.1" id="Capa_1" viewBox="0 0 296.135 296.135">

                        <g id="SVGRepo_bgCarrier" stroke-width="0"/>

                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

                        <g id="SVGRepo_iconCarrier"> <path d="M284.5,11.635C276.997,4.132,267.021,0,256.411,0s-20.586,4.132-28.089,11.635l-64.681,64.68l-6.658-6.658 c-2.777-2.777-6.2-4.512-9.786-5.206c-0.598-0.116-1.2-0.202-1.804-0.26s-1.211-0.087-1.817-0.087s-1.213,0.029-1.817,0.087 s-1.206,0.145-1.804,0.26c-3.585,0.694-7.009,2.43-9.786,5.206v0c-1.388,1.388-2.516,2.938-3.384,4.59 c-0.289,0.55-0.55,1.112-0.781,1.683c-0.694,1.712-1.128,3.505-1.302,5.317c-0.058,0.604-0.087,1.211-0.087,1.817 c0,1.213,0.116,2.426,0.347,3.621c0.347,1.793,0.954,3.545,1.822,5.196c0.868,1.651,1.996,3.201,3.384,4.59l4.319,4.319 L21.468,213.811c-1.434,1.434-2.563,3.143-3.316,5.025l-16.19,40.387c-3.326,8.298-2.338,17.648,2.644,25.013 c5.04,7.451,13.356,11.899,22.244,11.899c3.432,0,6.817-0.659,10.063-1.961L77.3,277.984c1.882-0.754,3.592-1.883,5.025-3.316 l113.021-113.021l4.318,4.318c0.463,0.463,0.944,0.897,1.44,1.302c0.993,0.81,2.049,1.504,3.15,2.083 c2.752,1.446,5.785,2.169,8.818,2.169l0,0c0.029,0,0.058-0.004,0.087-0.004c1.791-0.008,3.58-0.264,5.312-0.777 c2.345-0.694,4.583-1.851,6.569-3.471c0.497-0.405,0.977-0.839,1.44-1.302v0c2.314-2.314,3.905-5.077,4.772-8.009 c0.694-2.345,0.926-4.798,0.694-7.216c-0.116-1.209-0.347-2.408-0.694-3.581s-0.81-2.318-1.388-3.419 c-0.868-1.651-1.996-3.201-3.384-4.59l-6.658-6.658l64.68-64.68C299.988,52.326,299.988,27.124,284.5,11.635z M63.285,251.282 l-30.764,12.331l12.332-30.763l110.848-110.848l18.432,18.432L63.285,251.282z"/> </g>

                    </svg>
                </div>
            </div>
            
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
                mode={'full'}
            />
        </div>
    );
};

export default ColorPicker;