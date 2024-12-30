import React, { useEffect, useState } from 'react';
import './css/headers.css';
import Store from '../../utils/Store';
import Api from '../../utils/Api';
import Notice from '../notice/Notice';

const Headers = () => {

    const [title, setTitle] = useState('Главная')
    const [id, setId] = useState(0)
    const [input, setInput] = useState()

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
        let req = await Api.put({value: input * 100}, `api/course/update/${id}`)

        if(req !== 'error') {
            return Notice.Send({type: 'success', text: 'Курс успешно обновлён'})
        } else {
            return Notice.Send({type: 'error', text: 'Ошибка, попробуйте ещё раз'})
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