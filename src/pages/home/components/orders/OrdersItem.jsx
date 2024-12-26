import React from 'react';
import Button from '../../../../components/button/Button';
import Api from '../../../../utils/Api';

const OrdersItem = ({mode, el}) => {

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
                    <div className="cross">
                        <svg width="15.707031" height="15.707108" viewBox="0 0 15.707 15.7071" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <defs/>
                            <line id="Линия 2" x1="0.353516" y1="0.353546" x2="15.353516" y2="15.353546" stroke="#000000" strokeOpacity="1.000000" strokeWidth="1.000000"/>
                            <line id="Линия 2" x1="15.353516" y1="0.353546" x2="0.353516" y2="15.353546" stroke="#000000" strokeOpacity="1.000000" strokeWidth="1.000000"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="address">{el.address}</div>
        </div>
    );
};

export default OrdersItem;