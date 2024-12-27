import { useEffect, useState } from "react";
import Api from "./utils/Api";


export default function useMain() {

    const [auth, setAuth] = useState(1)
    const [user, setUser] = useState({})
    const [course, setCourse] = useState(1)

    useEffect(() => {
                
        (async () => {
            const token = localStorage.getItem('accessToken')

            if(!token) {
                setTimeout(() => {
                    setAuth(2)
                }, 1000)
                return
            }

            let res = await Api.init(token)
            let req = await Api.get('api/course/dollar')

            if(req !== 'error') {
                setCourse(req)
            }

            if(res.success) {
                setAuth(3)
                setUser(res.data)
                return
            } else {
                setAuth(2)
                return
            }
            
        })()

    }, [])

    return {
        auth,
        user,
        course
    }
}