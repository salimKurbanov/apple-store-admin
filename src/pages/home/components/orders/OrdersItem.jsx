import React from 'react';
import Button from '../../../../components/button/Button';
import Api from '../../../../utils/Api';

const OrdersItem = ({mode, el, callback}) => {

      function formatDate(isoDate) {
        const date = new Date(isoDate);
      
        if (isNaN(date.getTime())) {
          throw new Error("Invalid date format");
        }
      
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
      
        return `${day}.${month}.${year} ${hours}:${minutes}`;
      }
    
    return (
        <div className={`order_list_item shadow ${mode}`}>
            <div className="info">
                <div className="product">
                    <img src={`${Api.url}images/products/${el.image}`} alt="" />
                    <div className="description">
                        <div className="name">{el.title}</div>
                        <div className="memory">{el.memory}</div>
                        <div className="price">{el.price} руб.</div>
                    </div>
                </div>
                <div className="user">
                    <div className="description">
                        <div className="name">{el.username}</div>
                        <div className="date">{formatDate(el.datetime)}</div>
                        <div className="phone">{el.phone}</div>
                    </div>
                    {mode === 'disabled' ? 
                    <div className="cross" onClick={callback}>
                        <svg width="15.707031" height="15.707108" viewBox="0 0 15.707 15.7071" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <defs/>
                            <line id="Линия 2" x1="0.353516" y1="0.353546" x2="15.353516" y2="15.353546" stroke="#000000" strokeOpacity="1.000000" strokeWidth="1.000000"/>
                            <line id="Линия 2" x1="15.353516" y1="0.353546" x2="0.353516" y2="15.353546" stroke="#000000" strokeOpacity="1.000000" strokeWidth="1.000000"/>
                        </svg>
                    </div>
                    :<div className="arrow" onClick={callback}>
                        <svg width="15.997070" height="18.907997" viewBox="0 0 15.9971 18.908" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <defs/>
                            <path id="path" d="M7.31 0.72L7.29 0.7C7.29 0.3 7.6 0 7.99 0C8.39 0 8.7 0.3 8.7 0.7L8.68 0.72L7.31 0.72ZM0.23 11.41L0.2 11.41C-0.07 11.13 -0.07 10.69 0.2 10.41C0.48 10.13 0.92 10.13 1.2 10.41L1.2 10.44L0.23 11.41ZM14.79 10.44L14.79 10.41C15.07 10.13 15.5 10.13 15.78 10.41C16.06 10.69 16.06 11.13 15.78 11.41L15.75 11.41L14.79 10.44Z" fill="#000000" fillOpacity="0" fillRule="nonzero"/>
                            <path id="path" d="M7.99 0.7L7.99 18.2M15.29 10.91L7.99 18.2L0.7 10.91" stroke="#000000" strokeOpacity="1.000000" strokeWidth="1.408000" strokeLinejoin="round" strokeLinecap="round"/>
                        </svg>
                    </div>}
                </div>
            </div>
            <div className="address">{el.address}</div>
        </div>
    );
};

export default OrdersItem;