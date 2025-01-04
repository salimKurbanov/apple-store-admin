import { useEffect, useState } from "react"
import Api from "../../../utils/Api"
import Store from "../../../utils/Store"

export default function useStoreList () {
    const [list, setList] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dollar, setDollar] = useState(0)

    Store.useListener('add_product', (data) => {
        setList(prev => ([data, ...prev]))
    })

    Store.useListener('edit_product', (data) => {
        setList(list.map(el => {
            if(el.productid === data.productid) {
                return data
            }
            return el
        }))
    })

    Store.useListener('delete_product', (id) => {
        setList(prev => prev.filter(el => el.productid !== id))
    })

    useEffect(() => {
        (async () => {
            let res = await Api.get('api/products/all')

            let dollar = await Api.get('api/course/dollar')

            setLoading(true)

            if(dollar !== 'error') {
                setDollar((dollar.value / 100).toFixed(2))
            }

            if(res !== 'error') {
                setList(res)
            }
        })()
    }, [])

    const openEditProduct = (el) => {
        Store.setListener('open_edit_product', el)
    }

    return {
        list,
        dollar,
        loading,
        openEditProduct
    }
}