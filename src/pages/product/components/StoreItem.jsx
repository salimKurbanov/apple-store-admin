'use client'
import ItemOption from "./ItemOption";

export default function StoreItem () {

    return (
        <div className="store_item shadow">
            <img className="store_item_image" src="/images/iphone_16_pro.svg" alt="" />

            <div className="store_item_content">
                <div className="head">
                    <div className="name">iPhone 16</div>

                    <div className="price">70 000 руб.</div>
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