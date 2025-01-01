import { useEffect, useState } from "react"
import Api from "../../../utils/Api"

export default function useStoreList () {
    const [list, setList] = useState(false)
    const [loading, setLoading] = useState(false)
    const [dollar, setDollar] = useState(0)

    useEffect(() => {
        (async () => {
            let res = await Api.get('api/products/all')

            let dollar = await Api.get('api/course/dollar')

            if(dollar !== 'error') {
                setDollar((dollar.value / 100).toFixed(2))
            }

            if(res !== 'error') {
                setList(res)
            }
        })()
    }, [])

    return {
        list,
        dollar
    }
}