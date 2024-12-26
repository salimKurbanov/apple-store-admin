import React from 'react';
import Grid from './Grid';
import Head from './Head';
import Graphic from './Graphic';

const Information = () => {
    return (
        <div className="information">

            <div className="statistic">
                <Head />
                <Grid />
            </div>
            
            <Graphic />
        </div>
    );
};

export default Information;