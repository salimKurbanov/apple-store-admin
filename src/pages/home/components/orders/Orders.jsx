import React from 'react';
import OrdersItem from './OrdersItem';
import useOrders from '../../hooks/useOrders';

const Orders = () => {

    const orders = useOrders()

    return (
        <div className="orders">
            <div className="new_orders">
                {orders.list.newOrders?.length ? 
                    <>
                    <div className="title">Заказы</div>
                    <div className="orders_list">
                        {orders.list.newOrders.map((el) => (
                            <OrdersItem callback={() => orders.closeOrder(el.ordersid)} key={el.ordersid} el={el}/>
                        ))}
                    </div>
                    </>
                :<></>}
            </div>
            <div className="history">
                {orders.list.oldOrders?.length ? 
                    <>
                    <div className="title">История</div>
                    <div className="orders_list">
                        {orders.list.oldOrders.map((el) => (
                            <OrdersItem mode={'disabled'} key={el.ordersid} el={el}/>
                        ))}
                    </div>
                    </>
                :<></>}
            </div>
        </div>
    );
};

export default Orders;