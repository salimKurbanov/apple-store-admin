'use client'
import Api from "../../../utils/Api";
import ItemOption from "./ItemOption";

export default function StoreItem ({el, dollar}) {
    const price = ((dollar * el.price) / 100).toFixed(2)

    return (
        <div className="store_item shadow">
            <img className="store_item_image" src={`${Api.url}images/products/${el.main_image}`} alt="" />

            <div className="store_item_content">
                <div className="head">
                    <div className="name">{el.title}</div>

                    <div className="price">{price} руб.</div>
                </div>

                <div className="option_list">
                    <ItemOption 
                        icon={'/images/icons/processor.svg'}
                        description={'Процессор А18 с 5 ядрами GPU'}
                    />
                    <ItemOption 
                        icon={'/images/icons/cameraBlock.svg'}
                        description={`48-МП Fusion камера
                                    2x телеобъектив
                                    12-МП ультраширокая камера`}
                    />
                    <ItemOption 
                        icon={'/images/icons/batary.svg'}
                        description={'До 27 часов воспроизведения видео.'}
                    />
                    <ItemOption 
                        icon={'/images/icons/cameraBtn.svg'}
                        description={'кнопка контроля камеры'}
                    />
                </div>
                

                <div className="colors_flex">
                    <div className="color" style={{background: '#8DA0EC'}}></div>
                    <p className="memory">4/256 гб.</p>
                </div>

                <button className="fake_button">Заказать</button> 
            </div>
        </div>
    )
}