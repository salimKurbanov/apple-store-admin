import React, { useEffect, useState } from 'react';

const Item = ({el}) => {

    const [close, setClose] = useState(false)

    useEffect(() => {

        let timeout = setTimeout(() => {
            setClose(true)
        }, 3000)

        return () => {
            clearTimeout(timeout)
        }

    }, [])

    return (
        <div className={`item ${el.type} ${close ? 'close' : ''}`}>{el.text}</div>
    );
};

export default Item;