import React, { useEffect, useState } from 'react';
import OrdersItem from './OrdersItem';
import Api from '../../../../utils/Api';

const Orders = () => {

    const [list, setList] = useState({
        newOrders: [],
        oldOrders: []
    })

    useEffect(() => {

        (async () => {

            let res = await Api.get('api/orders/all')

            if(res !== 'error') {
                return setList(prev => ({...prev, newOrders: res.newOrders, oldOrders: res.oldOrders}))
            }

        })()

    }, [])

    const deleteOrder = async (id) => {
        let res = await Api.delete(`api/orders/delete/${id}`)

        if(res !== 'error') {
            return 'ok'
        }
    }

    return (
        <div className="orders">
            <div className="new_orders">
                <div className="title">Заказы</div>
                <div className="orders_list">
                    {list.newOrders?.length ? 
                        list.newOrders.map((el) => (
                            <OrdersItem key={el.ordersid} el={el}/>
                        ))
                    :<></>}
                </div>
            </div>
            <div className="history">
                <div className="title">История</div>
                <div className="orders_list">
                    {list.oldOrders?.length ? 
                        list.oldOrders.map((el) => (
                            <OrdersItem key={el.ordersid} el={el}/>
                        ))
                    :<></>}
                </div>
            </div>
        </div>
    );
};

export default Orders;