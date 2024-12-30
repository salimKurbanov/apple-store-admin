import React, { useEffect, useState } from 'react';

const Graphic = ({list}) => {

    const [top, setTop] = useState(0)
    const [date, setDate] = useState(new Date())

    useEffect(() => {

        (async () => {
            let count = 0;
    
            for (const el of list) {
                const value = await Promise.resolve(el.count)
                if (value > count) {
                    count = value;
                }
            }
    
            setTop(count)
        })()

    }, [list])

    return (
        <div className="graphic">
            <div className="title">График</div>
            <div className="graphic_grid">
                {list?.length ? 
                    list.map((el, i) => (
                        <div className={`day ${el.weekday === 'СБ' || el.weekday === 'ВС' ? 'weekend' : ''}`} key={i}>
                            <div className="scale" style={{height: `${el.count/top*100}%`}}>
                                <div className={`label ${el.day === date.getDate() ? 'current' : ''}`}>{el.count} чел.</div>
                            </div>
                            <div className="day_name">{el.weekday}</div>
                        </div>
                    ))
                :<></>}
            </div>
        </div>
    );
};

export default Graphic;