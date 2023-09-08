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
    const [signupfontcolor, setSignupfontcolor] = useState('#fff')
    const [signupbgcolor, setSignupbgcolor] = useState('#e91965')
    const [loginfontcolor, setLoginfontcolor] = useState('#e91965')
    const [loginbgcolor, setLoginbgcolor] = useState('#fff')

    function enableLogin() {
        setSignup(false);
        setLogin(true);
        setLoginfontcolor('#fff');
        setLoginbgcolor('#e91965')
        setSignupfontcolor('#e91965')
        setSignupbgcolor('#fff');
    }

    function enableSignup() {
        setSignup(true);
        setLogin(false);
        setLoginfontcolor('#e91965');
        setLoginbgcolor('#fff')
        setSignupfontcolor('#fff')
        setSignupbgcolor('#e91965');
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
        const data = await axios.post('http://localhost:3000/admin/signup', {
            "username": signupEmail,
            "password": signupPassword
        })
        localStorage.setItem('token', data.data);
        navigate('/allcourse')
    }

    async function handleLogin() {
        const data = await axios.post('http://localhost:3000/admin/login', {
            "username": loginEmail,
            "password": loginPassword
        })
        localStorage.setItem('token', data.data);
        navigate('/allcourse')
    }

    return (
        <div className="reg-container admin-section">
            <h1>Admin Login</h1>
            <div className='card'>
                <div className='reg-option'>
                    <a onClick={enableSignup} style={{color: signupfontcolor, backgroundColor: signupbgcolor }} className='card-signup' >SIGNUP</a>
                    <a onClick={enableLogin} style={{color: loginfontcolor, backgroundColor: loginbgcolor }} className='card-login' >LOGIN</a>
                </div>
                {signup &&
                    <>
                        <input type="text" className='signupEmail card-component' placeholder="Email" value={signupEmail} onChange={handleSignupEmail} autoComplete="off" />
                        <input type="password" className='signupPassword card-component' placeholder="Password" value={signupPassword} onChange={handleSignupPassword} autoComplete="off" />
                        <br />
                        <button className='signup-btn' onClick={handleSignup}>SIGNUP</button>
                        <br />
                    </>
                }

                {login &&
                    <>
                        <input type="text" className='LoginEmail card-component' placeholder="Email" value={loginEmail} onChange={handleLoginEmail} autoComplete="off" />
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