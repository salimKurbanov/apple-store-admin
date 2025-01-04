'use client'
import { useState } from "react";
import Button from "../../../components/button/Button";
import DeleteButton from "../../../components/delete_button/DeleteButton";
import Api from "../../../utils/Api";
import ItemOption from "./ItemOption";
import Store from "../../../utils/Store";

export default function StoreItem ({el, dollar, openEditProduct}) {
    const price = ((dollar * el.price) / 100).toFixed(2)
    const [loading, setLoading] = useState(false)
    
    const deleteProduct = async (id) => {
        setLoading(true)

        let req = await Api.delete(`api/products/delete/${id}`)

        setLoading(false)

        if(req !== 'error') {
            Store.setListener('notice', {type: 'success', text: 'Товар удалён'})
            Store.setListener('delete_product', id)
            return 
        }
    }

    return (
        <div className={`store_item shadow ${loading ? 'loading' : ''}`}>
            <img className="store_item_image" src={`${Api.url}images/products/${el.main_image}`} alt="" />

            <div className="store_item_content">
                <div className="head">
                    <div className="name">{el.title}</div>

                    <div className="price">{price} руб.</div>
                </div>

                <div className="option_list">
                    {el?.specifications?.length ? 
                        el.specifications.map((el) => (
                            <ItemOption 
                                key={el.id || el.specificationsid}
                                icon={`${Api.url}images/products/${el.icon}`}
                                description={el.description}
                            />
                        ))
                    :<></>}
                </div>

                <div className="colors_flex">
                    <div className="color" style={{background: `${el.color}`}}></div>
                    <p className="memory">{el.memory} гб.</p>
                </div>

                <button className="fake_button">Заказать</button> 
            </div>

            <div className="manage_flex">
                <Button mode={'icon_btn'} callback={() => openEditProduct(el)}>
                    <svg width="12.000977" height="12.016434" viewBox="0 0 11.001 11.0164" fill="none">
                        <defs/>
                        <path id="path" d="M2.24 7.1L8.58 0.82C9.02 0.39 9.73 0.39 10.17 0.82C10.61 1.25 10.61 1.96 10.17 2.39L3.73 8.77C3.43 9.07 3.28 9.22 3.11 9.34C2.96 9.46 2.81 9.56 2.64 9.65C2.46 9.75 2.26 9.82 1.86 9.97L0.5 10.5L0.94 9.19C1.08 8.74 1.16 8.52 1.26 8.31C1.36 8.13 1.47 7.95 1.59 7.79C1.73 7.6 1.9 7.44 2.24 7.1ZM4.21 7.79L4.23 7.77C4.51 7.77 4.73 7.99 4.73 8.27C4.73 8.55 4.51 8.77 4.23 8.77L4.21 8.75L4.21 7.79ZM2.26 6.63L2.24 6.61C2.24 6.33 2.46 6.11 2.74 6.11C3.02 6.11 3.24 6.33 3.24 6.61L3.22 6.63L2.26 6.63Z" fill="#000000" fillOpacity="0" fillRule="nonzero"/>
                        <path id="path" d="M4.23 8.27L2.74 8.27L2.74 6.61M8.58 0.82C9.02 0.39 9.73 0.39 10.17 0.82C10.61 1.25 10.61 1.96 10.17 2.39L3.73 8.77C3.43 9.07 3.28 9.22 3.11 9.34C2.96 9.46 2.81 9.56 2.64 9.65C2.46 9.75 2.26 9.82 1.86 9.97L0.5 10.5L0.94 9.19C1.08 8.74 1.16 8.52 1.26 8.31C1.36 8.13 1.47 7.95 1.59 7.79C1.73 7.6 1.9 7.44 2.24 7.1L8.58 0.82Z" stroke="#FFFFFF" strokeOpacity="1.000000" strokeWidth="1.500000" strokeLinejoin="round" strokeLinecap="round"/>
                    </svg>
                </Button>

                <DeleteButton callback={() => deleteProduct(el.productid)}/>
            </div>
        </div>
    )
}