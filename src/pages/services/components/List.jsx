import React, { useEffect, useRef, useState } from 'react';
import '@splidejs/react-splide/css';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import Button from '../../../components/button/Button';
import Api from '../../../utils/Api';
import Store from '../../../utils/Store';
import Notice from '../../../components/notice/Notice';

const List = () => {

    const [list, setList] = useState([])
    const splideRef = useRef(null);

    Store.useListener('newService', (data) => {
        setList(prev => [...prev, data])
    })

    const handlePrev = () => {
      if (splideRef.current) {
        splideRef.current.splide.go('<'); // Перейти к предыдущему слайду
      }
    };
  
    const handleNext = () => {
      if (splideRef.current) {
        splideRef.current.splide.go('>'); // Перейти к следующему слайду
      }
    };

    const openModal = (el) => {
        document.body.style.overflow = 'hidden'
        Store.setListener('open_services_modal', {modal: true, el: el})
    }

    useEffect(() => {

        (async () => {

            let req = await Api.get('api/services/all')
            if(req !== 'error') {
                return setList(req)
            }

        })()

    }, [])

    const deleteService = async (id) => {
        
        let req = await Api.delete(`api/services/delete/${id}`)

        if(req !== 'error') {
            Store.setListener('notice', {type: 'success', text: 'Услуга удалена'})
            return setList(prev => prev.filter(el => el.servicesid !== id))
        }

        Notice.Send({type: 'error', text: 'Ошибка'})
    }

    return (
        <div className='price_list'>
            <h3>Прайс лист</h3>

            <Splide
                ref={splideRef}
                options={{
                    rewind: false,
                    padding: 'auto',
                    autoWidth: true,
                    width : '100%',
                    gap: '30px',
                    pagination: false,
                    drag: 'free',
                    arrows: false,
                }}
                
            >   
                {list.length ?
                    list.map((el) => (
                        <SplideSlide key={el.servicesid}>
                            <div className="head">
                                <div className="preview_image">
                                    <img src={`${Api.url}images/service/${el.image}`} alt="" />
                                </div>
                                
                                <div className="icon" onClick={() => openModal(el)}>
                                    <svg width="11.000977" height="11.016434" viewBox="0 0 11.001 11.0164" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <defs/>
                                        <path id="path" d="M2.24 7.1L8.58 0.82C9.02 0.39 9.73 0.39 10.17 0.82C10.61 1.25 10.61 1.96 10.17 2.39L3.73 8.77C3.43 9.07 3.28 9.22 3.11 9.34C2.96 9.46 2.81 9.56 2.64 9.65C2.46 9.75 2.26 9.82 1.86 9.97L0.5 10.5L0.94 9.19C1.08 8.74 1.16 8.52 1.26 8.31C1.36 8.13 1.47 7.95 1.59 7.79C1.73 7.6 1.9 7.44 2.24 7.1ZM4.21 7.79L4.23 7.77C4.51 7.77 4.73 7.99 4.73 8.27C4.73 8.55 4.51 8.77 4.23 8.77L4.21 8.75L4.21 7.79ZM2.26 6.63L2.24 6.61C2.24 6.33 2.46 6.11 2.74 6.11C3.02 6.11 3.24 6.33 3.24 6.61L3.22 6.63L2.26 6.63Z" fill="#000000" fillOpacity="0" fillRule="nonzero"/>
                                        <path id="path" d="M4.23 8.27L2.74 8.27L2.74 6.61M8.58 0.82C9.02 0.39 9.73 0.39 10.17 0.82C10.61 1.25 10.61 1.96 10.17 2.39L3.73 8.77C3.43 9.07 3.28 9.22 3.11 9.34C2.96 9.46 2.81 9.56 2.64 9.65C2.46 9.75 2.26 9.82 1.86 9.97L0.5 10.5L0.94 9.19C1.08 8.74 1.16 8.52 1.26 8.31C1.36 8.13 1.47 7.95 1.59 7.79C1.73 7.6 1.9 7.44 2.24 7.1L8.58 0.82Z" stroke="#FFFFFF" strokeOpacity="1.000000" strokeWidth="1.000000" strokeLinejoin="round" strokeLinecap="round"/>
                                    </svg>
                                </div>

                                <div className="icon" onClick={() => deleteService(el.servicesid)}>
                                    <svg width="10" height="10" viewBox="0 0 15.707 15.7071" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <defs/>
                                        <line id="Линия 2" x1="0.353516" y1="0.353546" x2="15.353516" y2="15.353546" stroke="#000000" strokeOpacity="1.000000" strokeWidth="1.000000"/>
                                        <line id="Линия 2" x1="15.353516" y1="0.353546" x2="0.353516" y2="15.353546" stroke="#000000" strokeOpacity="1.000000" strokeWidth="1.000000"/>
                                    </svg>
                                </div>

                            </div>
                            
                            <h4>{el.title}</h4>
        
                            <div className="description">
                                {el.description}
                            </div>
        
                            <div className="price">
                                Цена: <span>от {el.price} руб.</span>
                            </div>
                        </SplideSlide>
                    ))
                :<></>}
            </Splide>

            {list.length 
            ?<div className="custom_arrows">
                <button className="custom_arrow prev" onClick={handlePrev}>
                    <svg width="14.006104" height="19.982910" viewBox="0 0 14.0061 19.9829" fill="none" >
                        <defs/>
                        <path id="Vector 1" d="M5.12 8.49L12.5 8.49C13.34 8.49 14 9.15 14 9.99C14 10.83 13.34 11.49 12.5 11.49L5.12 11.49L11.05 17.41C11.64 18.01 11.64 18.94 11.05 19.53C10.45 20.13 9.52 20.13 8.93 19.53L0.44 11.05C-0.15 10.45 -0.15 9.52 0.44 8.93L8.93 0.44C9.52 -0.15 10.45 -0.15 11.05 0.44C11.64 1.03 11.64 1.97 11.05 2.56L5.12 8.49Z" fill="#000000" fillOpacity="1.000000" fillRule="evenodd"/>
                    </svg>
                </button>

                <button className="custom_arrow next" onClick={handleNext}>
                    <svg width="14.006104" height="19.982910" viewBox="0 0 14.0061 19.9829" fill="none">
                        <defs/>
                        <path id="Vector 1" d="M8.87 8.49L1.5 8.49C0.65 8.49 0 9.15 0 9.99C0 10.83 0.65 11.49 1.5 11.49L8.87 11.49L2.95 17.41C2.36 18.01 2.36 18.94 2.95 19.53C3.54 20.13 4.48 20.13 5.07 19.53L13.56 11.05C14.15 10.45 14.15 9.52 13.56 8.93L5.07 0.44C4.48 -0.15 3.54 -0.15 2.95 0.44C2.36 1.03 2.36 1.97 2.95 2.56L8.87 8.49Z" fill="#000000" fillOpacity="1.000000" fillRule="evenodd"/>
                    </svg>
                </button>
            </div>
            :<></>}
            
        </div>
    );
};

export default List;