import './Admin.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

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

    async function handleSignup() {
        const data = await axios.post('http://localhost:3000/users/signup', {
            "username": signupEmail,
            "password": signupPassword
        })
        localStorage.setItem('token', data);
        navigate('/allcourse')
    }

    async function handleLogin() {
        const data = await axios.post('http://localhost:3000/users/login', {
            "username": loginEmail,
            "password": loginPassword
        })
        localStorage.setItem('token', data);
        navigate('/allcourse')
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
                        <input type="text" className='LoginEmail card-component' value={loginEmail} onChange={handleLoginEmail} placeholder="Email" autoComplete="off" />
                        <br />
                        <input type="password" className='LoginPassword card-component' value={loginPassword} placeholder="Password" onChange={handleLoginPassword} autoComplete="off" />
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