import React from 'react';

const Grid = ({visits, statistics}) => {

    return (
        <div className="statistic_grid">
            <div className="statistic_item visits shadow">
                <h2>Посещение</h2>
                <div className="count">{visits.today} чел.</div>
                <div className="all">Всего: {visits.all} чел.</div>
            </div>
            <div className="statistic_item shadow">
                <h2>Продано товара</h2>
                <div className="count">{statistics.sold} ед.</div>
                <div className="all">Прибыль: <span>{(statistics.profit / 100).toFixed(2)} руб.</span></div>
            </div>
            <div className="statistic_item shadow">
                <h2>Заказы</h2>
                <div className="count">{statistics.current}</div>
                <div className="all">Всего: {statistics.all}.</div>
            </div>
        </div>
    );
};

export default Grid;