import React, { useEffect, useState } from 'react';
import Grid from './Grid';
import Head from './Head';
import Graphic from './Graphic';
import Api from '../../../../utils/Api';

const Information = () => {

    const [visits, setVisits] = useState({
        today: 0,
        all: 0,
        list: []
    })
    const [statistics, setStatistics] = useState({
        all: 0,
        current: 0,
        sold: 0,
        profit: 0
    })

    useEffect(() => {

        (async () => {

            let res = await Api.get('api/visits/today')
            let statistics = await Api.get(`api/orders/statistics`)

            if(res !== 'error') {
                setVisits(prev => ({...prev, today: res.today, all: res.all, list: res.list}))
            }

            if(statistics !== 'error') {
                setStatistics(statistics)
            }

        })()

    }, [])

    return (
        <div className="information">

            <div className="statistic">
                <Head />
                <Grid visits={visits} statistics={statistics}/>
            </div>
            
            <Graphic list={visits.list}/>
        </div>
    );
};

export default Information;