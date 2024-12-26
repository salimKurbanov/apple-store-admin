import React from 'react';

const Grid = () => {
    return (
        <div className="statistic_grid">
            <div className="statistic_item visits shadow">
                <h2>Посещение</h2>
                <div className="count">1200 чел.</div>
                <div className="all">Всего: 24344 чел.</div>
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