import React from 'react';

const Graphic = () => {
    return (
        <div className="graphic">
            <div className="title">График</div>
            <div className="graphic_grid">
                <div className="day">
                    <div className="scale" style={{height: '100px'}}>
                        <div className="label">36532 чел.</div>
                    </div>
                    <div className="day_name">ПН</div>
                </div>
                <div className="day">
                    <div className="scale" style={{height: '200px'}}>
                        <div className="label">365 чел.</div>
                    </div>
                    <div className="day_name">ВТ</div>
                </div>
                <div className="day">
                    <div className="scale" style={{height: '150px'}}>
                        <div className="label">365 чел.</div>
                    </div>
                    <div className="day_name">СР</div>
                </div>
                <div className="day">
                    <div className="scale" style={{height: '143px'}}>
                        <div className="label">365 чел.</div>
                    </div>
                    <div className="day_name">ЧТ</div>
                </div>
                <div className="day">
                    <div className="scale" style={{height: '110px'}}>
                        <div className="label">365 чел.</div>
                    </div>
                    <div className="day_name">ПТ</div>
                </div>
                <div className="day weekend">
                    <div className="scale" style={{height: '110px'}}>
                        <div className="label">365 чел.</div>
                    </div>
                    <div className="day_name">СБ</div>
                </div>
                <div className="day weekend">
                    <div className="scale" style={{height: '10px'}}>
                        <div className="label">365 чел.</div>
                    </div>
                    <div className="day_name">ВС</div>
                </div>
            </div>
        </div>
    );
};

export default Graphic;