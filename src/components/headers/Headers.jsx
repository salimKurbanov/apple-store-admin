import React, { useEffect, useState } from 'react';
import './css/headers.css';
import Store from '../../utils/Store';
import Api from '../../utils/Api';

const Headers = ({course}) => {

    const [title, setTitle] = useState('Главная')
    const [input, setInput] = useState((course.value / 100).toFixed(2))

    Store.useListener('title', setTitle)

    const onSubmit = async (e) => {
        e.preventDefault()
        let req = await Api.put({value: input}, `api/course/update/${course.courseid}`)
    }

    return (
        <header>
            <div className="header_wrapper">
                <h2>{title}</h2>
                <div className="course_block">
                    <p className='course_title'>Курс доллара </p>
                    <form action="" onSubmit={onSubmit}>
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
                        <span>р.</span>
                    </form>
                </div>
            </div>
        </header>
    );
};

export default Headers;