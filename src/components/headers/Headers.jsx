import React, { useEffect, useState } from 'react';
import './css/headers.css';
import Store from '../../utils/Store';
import Api from '../../utils/Api';
import Notice from '../notice/Notice';

const Headers = () => {

    const [title, setTitle] = useState('Главная')
    const [id, setId] = useState(0)
    const [input, setInput] = useState(1)

    Store.useListener('title', setTitle)

    useEffect(() => {

        (async () => {

            let req = await Api.get('api/course/dollar')

            if(req !== 'error') {
                setId(req.courseid)
                setInput((req.value / 100).toFixed(2))
            }

        })()

    }, [])

    const onSubmit = async (e) => {
        e.preventDefault()
        let body = {
            value: input * 100
        }
        let req = await Api.put(body, `api/course/update/${id}`)

        if(req !== 'error') {
            Store.setListener('notice', {type: 'success', text: req.message})
            return
        } else {
            return
        }
    }

    return (
        <header>
            <div className="header_wrapper">
                <h2>{title}</h2>
                <div className="course_block">
                    <p className='course_title'>Курс доллара </p>
                    <form action="" onSubmit={onSubmit}>
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onBlur={onSubmit}/>
                        <span>р.</span>
                    </form>
                </div>
            </div>
        </header>
    );
};

export default Headers;