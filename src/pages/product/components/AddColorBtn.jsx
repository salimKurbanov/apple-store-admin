import React, { useState } from 'react';
import Cross from '../../../components/cross/Cross';
import Store from '../../../utils/Store';
import ColorPicker from '../../../components/color_picker/ColorPicker'

const AddColorBtn = ({error, setError}) => {
    const [color, setColor] = useState(false)
    const keys = {
        openModal: 'openColorPicker',
        sendColor: 'sendColor',
        sendColorToPicker: 'sendColorToPicker',
        sendColorToForm: 'sendColorToForm',
        able_pipette: 'able_pipette'
    }

    Store.useListener('sendColor', (data) => {
        setColor(data)
    })

    const openColorPicker = (e) => {
        e.stopPropagation()
        setError(prev => ({...prev, color: false}))
        Store.setListener('openColorPicker', true)
    }

    return (
        <div className="add_color_btn_wrapper">
            <div className={`add_color_btn shadow ${error ? 'error' : ''}`} style={{backgroundColor: `${color ? color : 'var(--grey)'}`}} onMouseDown={openColorPicker}>
                {color ? <></> : <Cross />}
            </div>

            <ColorPicker keys={keys}/>
        </div>
    );
};

export default AddColorBtn;