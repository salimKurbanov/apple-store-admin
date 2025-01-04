import React, { useEffect, useState } from 'react';
import Api from '../../../utils/Api';
import Item from './Item';
import Store from '../../../utils/Store';

const Orders = () => {

    const [newOrders, setNewOrders] = useState([])
    const [oldOrders, setOldOrders] = useState([])

    useEffect(() => {

        (async () => {

            let req = await Api.get('api/orders/services/all')

            if(req !== 'error') {
                setNewOrders(req.newOrders)
                setOldOrders(req.oldOrders)
            }

        })()

    }, [])

    const closeOrder = async (id) => {
        let req = await Api.put({}, `api/orders/services/close/${id}`)

        if(req !== 'error') {
            setNewOrders(prev => prev.filter(el => el.servicesid !== id))
            setOldOrders(prev => ([...prev, req.data]))
            Store.setListener('notice', {type: 'success', text: req.message})
        }
    }

    return (
        <div className="services_orders">
            <div className='orders_column'>
                <div className="title">Заявки</div>
                <div className="orders_list new">
                    {newOrders.length ? 
                        newOrders.map((el) => (
                            <Item key={el.servicesid} el={el} callback={closeOrder}/>
                        ))
                    :<></>}
                </div>
            </div>
            <div className='orders_column'>
                <div className="title">История</div>
                <div className="orders_list">
                    {oldOrders.length ? 
                        oldOrders.map((el) => (
                            <Item disabled={true} key={el.servicesid} el={el} callback={closeOrder}/>
                        ))
                    :<></>}
                </div>
            </div>
        </div>
    );
};

export default Orders;