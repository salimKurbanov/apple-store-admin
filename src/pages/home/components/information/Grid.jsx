import React, { useEffect, useState } from 'react';
import Store from '../../../../utils/Store';

const Grid = ({visits, statistics}) => {

    const [profit, setProfit] = useState(0)
    const [grid, setGrid] = useState({
        profit: 0,
        sold: 0,
        current: 0
    })
    

    useEffect(() => {

        if(statistics) {
            setGrid(prev => ({...prev, profit: (statistics.profit / 100).toFixed(2), sold: statistics.sold, current: statistics.current}))
        }

    }, [statistics])

    Store.useListener('profit', (data) => {
        setGrid(prev => ({...prev, profit: (Number(prev.profit) + Number(data)).toFixed(2), sold: Number(prev.sold) + 1, current: Number(prev.current) - 1}))
    })

    return (
        <div className="statistic_grid">
            <div className="statistic_item visits shadow">
                <h2>Посещение</h2>
                <div className="count">{visits.today} чел.</div>
                <div className="all">Всего: {visits.all} чел.</div>
            </div>
            <div className="statistic_item shadow">
                <h2>Заказы</h2>
                <div className="count">{grid.current}</div>
                <div className="all">Всего: {statistics.all}.</div>
            </div>
            <div className="statistic_item shadow">
                <h2>Продано товара</h2>
                <div className="count">{grid.sold} ед.</div>
                {/* <div className="all">Прибыль: <span>{grid.profit} руб.</span></div> */}
            </div>
            <div className="statistic_item shadow profit">
                <h2>Прибыль</h2>
                <div className="profit_count">{grid.profit} руб.</div>
            </div>
        </div>
    );
};

export default Grid;