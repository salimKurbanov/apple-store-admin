import React from 'react';
import { formatDate } from '../../../utils/Services';

const Item = ({disabled, el, callback}) => {

    return (
        <div className={`order_item shadow ${disabled ? 'disabled' : ''}`}>
            <div className="main">
                <h2>{el.service_name}</h2>
                <div className="info_block">
                    <div>
                        <p>{el.name}</p>
                        <p className="price mt">от {el.price} руб.</p>
                    </div>
                    <div>
                        <p>{formatDate(el.datetime)}</p>
                        <p className='mt'>{el.phone}</p>
                    </div>
                </div>
            </div>
            {disabled ?<></>:
            <div className="arrow" onClick={() => callback(el.servicesid)}>
                <svg width="15.997070" height="18.907997" viewBox="0 0 15.9971 18.908" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <defs/>
                    <path id="path" d="M7.31 0.72L7.29 0.7C7.29 0.3 7.6 0 7.99 0C8.39 0 8.7 0.3 8.7 0.7L8.68 0.72L7.31 0.72ZM0.23 11.41L0.2 11.41C-0.07 11.13 -0.07 10.69 0.2 10.41C0.48 10.13 0.92 10.13 1.2 10.41L1.2 10.44L0.23 11.41ZM14.79 10.44L14.79 10.41C15.07 10.13 15.5 10.13 15.78 10.41C16.06 10.69 16.06 11.13 15.78 11.41L15.75 11.41L14.79 10.44Z" fill="#000000" fillOpacity="0" fillRule="nonzero"/>
                    <path id="path" d="M7.99 0.7L7.99 18.2M15.29 10.91L7.99 18.2L0.7 10.91" stroke="#000000" strokeOpacity="1.000000" strokeWidth="1.408000" strokeLinejoin="round" strokeLinecap="round"/>
                </svg>
            </div>}
        </div>
    );
};

export default Item;