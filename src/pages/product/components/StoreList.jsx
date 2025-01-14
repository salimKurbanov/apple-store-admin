import Loading from "../../../components/loading/Loading";
import useStoreList from "../hooks/useStoreList";
import StoreItem from "./StoreItem";

export default function StoreList () {
    const store = useStoreList()

    return (
        <div className="store_list">
            {store?.list?.length ? 
                store.list.map((el) => (
                    <StoreItem
                        el={el} 
                        key={el.productid} 
                        dollar={store.dollar}
                        loading={store.deleteLoading}
                        openEditProduct={store.openEditProduct}
                    />
                ))
            :
            <></>}
        </div>
    )
}