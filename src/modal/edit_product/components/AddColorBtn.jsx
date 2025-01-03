import React, { useEffect, useState } from 'react';
import Cross from '../../../components/cross/Cross';
import ColorPicker from '../../../components/color_picker/ColorPicker';
import Store from '../../../utils/Store';

const AddColorBtn = ({outColor, error, setError}) => {
    const [color, setColor] = useState(false)
    const keys = {
        openModal: 'openEditColorPicker',
        sendColor: 'editColor',
        sendColorToPicker: 'editColorToPicker',
        sendColorToForm: 'editColorToForm',
        able_pipette: 'able_edit_pipette'
    }

    Store.useListener('editColor', (data) => {
        setColor(data)
    })

    const openColorPicker = (e) => {
        e.stopPropagation()
        setError(prev => ({...prev, color: false}))
        Store.setListener('openEditColorPicker', true)
    }

    useEffect(() => {
        setColor(outColor)
    }, [])

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