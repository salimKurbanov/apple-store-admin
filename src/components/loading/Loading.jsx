import React from 'react';
import './css/loading.css';


const Loading = () => {
    return (
        <div className='main_loading'>
            <svg width={'50px'} height={'50px'}>
                <circle cx="25" cy="25" r="20" />
            </svg>
        </div>
    );
};

export default Loading;