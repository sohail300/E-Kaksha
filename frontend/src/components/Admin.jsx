import './Admin.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate();
    const [signup, setSignup] = useState(true);
    const [login, setLogin] = useState(false);
    const [signupEmail, setSignupEmail] = useState('')
    const [signupPassword, setSignupPassword] = useState('')
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    function enableLogin() {
        setSignup(false);
        setLogin(true);
    }

    function enableSignup() {
        setSignup(true);
        setLogin(false);
    }

    function handleSignupEmail(e) {
        setSignupEmail(e.target.value)
    }

    function handleSignupPassword(e) {
        setSignupPassword(e.target.value)
    }

    function handleLoginEmail(e) {
        setLoginEmail(e.target.value)
    }

    function handleLoginPassword(e) {
        setLoginPassword(e.target.value)
    }

    function handleSignup() {
        fetch('http://localhost:3000/admin/signup', {
            method: 'POST',
            body: JSON.stringify({
                "username": signupEmail,
                "password": signupPassword
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                localStorage.setItem('token', data);
                navigate('/allcourse')
            })
    }

    function handleLogin() {
        fetch('http://localhost:3000/admin/login', {
            method: 'POST',
            body: JSON.stringify({
                "username": loginEmail,
                "password": loginPassword
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                localStorage.setItem('token', data);
                navigate('/allcourse')
            })
    }

    return (
        <div className="reg-container">
            <div className='card'>
                <div className='reg-option'>
                    <a onClick={enableSignup} className='' >SIGNUP</a>
                    <a onClick={enableLogin} className='' >LOGIN</a>
                </div>
                {signup &&
                    <>
                        <input type="text" className='signupEmail card-component' placeholder="Email" value={signupEmail} onChange={handleSignupEmail} autoComplete="off" />
                        <br />
                        <input type="password" className='signupPassword card-component' placeholder="Password" value={signupPassword} onChange={handleSignupPassword} autoComplete="off" />
                        <br />
                        <button className='signup-btn' onClick={handleSignup}>SIGNUP</button>
                        <br />
                    </>
                }

                {login &&
                    <>
                        <input type="text" className='LoginEmail card-component' placeholder="Email" value={loginEmail} onChange={handleLoginEmail} autoComplete="off" />
                        <br />
                        <input type="password" className='LoginPassword card-component' placeholder="Password" value={loginPassword} onChange={handleLoginPassword} autoComplete="off" />
                        <br />
                        <button className='login-btn' onClick={handleLogin}>LOGIN</button>
                        <br />
                    </>
                }
            </div>
        </div>
    )
}

export default Signup