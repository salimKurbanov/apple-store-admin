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
            setList(prev => ({...prev, oldOrders: prev.oldOrders.filter(el => el.ordersid !== id)}))
            return
        }
    }

    const closeOrder = async (id) => {
        let res = await Api.put({}, `api/orders/close/order/${id}`)

        if(res !== 'error') {
            let item = list.newOrders.find(el => el.ordersid === id)
            setList(prev => ({
                ...prev, 
                newOrders: prev.newOrders.filter(el => el.ordersid !== id), 
                oldOrders: [item, ...prev.oldOrders]
            }))
            return 
        }
    }

    return (
        <div className="orders">
            <div className="new_orders">
                <div className="title">Заказы</div>
                <div className="orders_list">
                    {list.newOrders?.length ? 
                        list.newOrders.map((el) => (
                            <OrdersItem callback={() => closeOrder(el.ordersid)} key={el.ordersid} el={el}/>
                        ))
                    :<></>}
                </div>
            </div>
            <div className="history">
                <div className="title">История</div>
                <div className="orders_list">
                    {list.oldOrders?.length ? 
                        list.oldOrders.map((el) => (
                            <OrdersItem callback={() => deleteOrder(el.ordersid)} mode={'disabled'} key={el.ordersid} el={el}/>
                        ))
                    :<></>}
                </div>
            </div>
        </div>
    );
};

export default Orders;