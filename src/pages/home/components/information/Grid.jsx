import React, { useEffect, useState } from 'react';
import Api from '../../../../utils/Api';

const Grid = () => {

    const [visits, setVisits] = useState({
        today: 0,
        all: 0
    })

    useEffect(() => {

        (async () => {

            let res = await Api.get('api/visits/today')

            if(res !== 'error') {
                return setVisits(res)
            }

        })()

    }, [])

    return (
        <div className="statistic_grid">
            <div className="statistic_item visits shadow">
                <h2>Посещение</h2>
                <div className="count">{visits.today} чел.</div>
                <div className="all">Всего: {visits.all} чел.</div>
            </div>
            <div className="statistic_item shadow">
                <h2>Продано товара</h2>
                <div className="count">345 ед.</div>
                <div className="all">Прибыль:: 24344 руб.</div>
            </div>
            <div className="statistic_item shadow">
                <h2>Заказы</h2>
                <div className="count">23</div>
                <div className="all">Всего:: 24344.</div>
            </div>
        </div>
    );
};

export default Grid;