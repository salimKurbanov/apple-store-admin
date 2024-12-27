const Api = {}

Api.url = 'http://localhost:5000/'

Api.init = async (token) => {
    try {

        let res = await fetch(`${Api.url}api/users/init`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                ssid: token
            }
        })

        res = await res.json()

        return res

    } catch(e) {
        return 'error'
    }
}

Api.auth = async (body) => {
    try {

        let res = await fetch(`${Api.url}api/users/signin/admin-panel`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(body)
        })

        res = await res.json()

        return res

    } catch(e) {
        console.log(e)
        return 'error'
    }
}

Api.get = async (path) => {

    try {
        let res = await fetch(`${Api.url}${path}`)

        res = await res.json()

        if(res.status) {
            return res.data
        } else {
            return 'error'
        }
    } catch(e) {
        return 'error'
    }

}

Api.postFormData = async (path, data) => {

    try {
        let res = await fetch(`${Api.url}${path}`, {
            method: 'POST',
            body: data
        })

        res = await res.json()

        if(res.status === 401) {
            return Api.logout()
        }

        return res
    } catch(e) {
        console.log(e)
        return 'error'
    }

}

Api.delete = async (path) => {
    try {

        let res = await fetch(`${Api.url}${path}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                ssid: localStorage.getItem('accessToken')
            }
        })

        res = await res?.json()

        if(res.status === 401) {
            return Api.logout()
        }

        if(res.success) {
            return res
        } else {
            return 'error'
        }

    } catch(e) {
        return 'error'
    }
}

Api.post = async (body, path) => {
    try {

        let res = await fetch(`${Api.url}${path}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                ssid: localStorage.getItem('accessToken')
            },
            body: JSON.stringify(body)
        })

        res = await res?.json()

        if(res.status === 401) {
            return Api.logout()
        }

        if(res.success) {
            return res
        } else {
            return 'error'
        }

    } catch(e) {
        return 'error'
    }
}

Api.put = async (body, path) => {
    try {

        let res = await fetch(`${Api.url}${path}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                ssid: localStorage.getItem('accessToken')
            },
            body: JSON.stringify(body)
        })

        res = await res?.json()

        if(res.status === 401) {
            return Api.logout()
        }

        if(res.success) {
            return res
        } else {
            return 'error'
        }

    } catch(e) {
        return 'error'
    }
}

Api.logout = () => {
    localStorage.removeItem('accessToken')
    return window.location.reload()
}

export default Api;