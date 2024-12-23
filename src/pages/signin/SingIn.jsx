import React from 'react';
import './css/signin.css';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import useSignIn from './hooks/useSignIn';


const SingIn = () => {

    const signin = useSignIn()

    return (
        <div className='sign_in'>
            <form action="">
                <h2>Вход</h2>
                <div className="input_block">
                    <Input type={'text'} value={signin.inputs.name} onChange={(e) => signin.changeValue('name', e.target.value)} label={'логин'} mode={'full'}/>
                    <Input type={'password'} value={signin.inputs.password} onChange={(e) => signin.changeValue('password', e.target.value)} label={'пароль'} mode={'full'}/>
                </div>
                <div className="error">{signin.error}</div>

                <Button mode={'white'} callback={signin.signin}>
                    Войти
                </Button>
            </form>
        </div>
    );
};

export default SingIn;