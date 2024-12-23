const listener = {}
const Store = {}

Store.useListener = (name, func) => {
    return listener[name]=func
}

Store.setListener = (name, data) => {
    if(name) {
        return listener[name](data)
    } else {
        return
    }
}

export default Store;