import React, {useEffect} from 'react';
import './LoginModal.css'

function LoginModal ({url, forgotUrl}) {
    useEffect( () => {
        const modal = document.getElementById('modal-login-id');
        window.onclick = (event) => {
            if (event.target == modal)
                modal.style.display = 'none'
        }
    }, [])

    return (
        <div>
            <button onClick={e => e.target.nextElementSibling.style.display = 'block'}>Login</button>

            <div id={'id-modal-login'} className={'modal-login'}>
            <span onClick={() => document.getElementById(id).style.display = 'none'}
                  className={'modal-login-close'}
                  title={'Close Modal'}>
                &times;
            </span>

                <form className={'modal-login-content modal-login-animate'} action={url}>
                    <div className={'modal-login-container'}>
                        <label htmlFor={'username'}><b>Username</b></label>
                        <input type={'text'} placeholder={'Enter Username'} name={'username'} required/>

                        <label htmlFor={'psw'}><b>Password</b></label>
                        <input typeof={'password'} placeholder={'Enter Password'} name={'psw'} required/>

                        <button type={'submit'}>Login</button>
                        <label>
                            <input type={'checkbox'} checked={'checked'} name={'remember'}/> Remember me
                        </label>
                    </div>

                    <div className={'modal-login-container'} style={{backgroundColor: '#f1f1f1'}}>
                        <button type={'button'}
                                onClick={e => document.getElementById('id-modal-login')}
                                className={'modal-login-cancelbtn'}>Concel
                        </button>
                        <span className={'modal-login-forgot'}>Forgot <a href={forgotUrl}>password?</a></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginModal
