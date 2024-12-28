import { useEffect, useState } from "react"
import Api from "../../../utils/Api"


export default function useOrders() {

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

    return {
        list,
        closeOrder,
        deleteOrder
    }
}