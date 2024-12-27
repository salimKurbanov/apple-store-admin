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

    useEffect(() => {

        (async () => {

            let res = await Api.get('api/visits/today')

            if(res !== 'error') {
                return setVisits(prev => ({...prev, today: res.today, all: res.all, list: res.list}))
            }

        })()

    }, [])

    return (
        <div className="information">

            <div className="statistic">
                <Head />
                <Grid visits={visits}/>
            </div>
            
            <Graphic list={visits.list}/>
        </div>
    );
};

export default Information;