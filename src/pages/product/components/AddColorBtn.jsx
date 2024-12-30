import React, { useState } from 'react';
import Cross from '../../../components/cross/Cross';
import Store from '../../../utils/Store';

const AddColorBtn = () => {
    const [color, setColor] = useState(false)

    Store.useListener('sendColor', (data) => {
        setColor(data)
    })

    return (
        <div className={`add_color_btn shadow`} style={{backgroundColor: `${color ? color : 'var(--grey)'}`}}>
            {color ? <></> : <Cross />}
        </div>
    );
};

export default AddColorBtn;