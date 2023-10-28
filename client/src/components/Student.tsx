import './Admin.css'
import './Student.css'
import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import baseURL from './config.js'
import axios from 'axios'

const Signup = () => {
    // const navigate = useNavigate();
    const [signup, setSignup] = useState(true);
    const [login, setLogin] = useState(false);
    const [signupEmail, setSignupEmail] = useState('')
    const [signupPassword, setSignupPassword] = useState('')
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [userSignupfontcolor, setUsersignupfontcolor] = useState('#fff')
    const [userSignupbgcolor, setUsersignupbgcolor] = useState('#1976d2')
    const [userLoginfontcolor, setUserloginfontcolor] = useState('#1976d2')
    const [userLoginbgcolor, setUserloginbgcolor] = useState('#fff')

    const api = axios.create({
        baseURL
      });

    function enableLogin() {
        setSignup(false);
        setLogin(true);
        setUserloginfontcolor('#fff');
        setUserloginbgcolor('#1976d2')
        setUsersignupfontcolor('#1976d2')
        setUsersignupbgcolor('#fff');
    }

    function enableSignup() {
        setSignup(true);
        setLogin(false);
        setUserloginfontcolor('#1976d2');
        setUserloginbgcolor('#fff')
        setUsersignupfontcolor('#fff')
        setUsersignupbgcolor('#1976d2');
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
        const data = await api.post('/users/signup', {
            "username": signupEmail,
            "password": signupPassword
        })

        localStorage.setItem('token', data.data);
        window.location.href='/allcourse'
    }

    async function handleLogin() {
        const data = await api.post('/users/login', {
            "username": loginEmail,
            "password": loginPassword
        })

        console.log(data)
        localStorage.setItem('token', data.data);
        window.location.href='/allcourse'
    }

    return (
        <div className="reg-container user-section">
        <h1>Student Login</h1>
            <div className='card'>
                <div className='reg-option'>
                    <a onClick={enableSignup} style={{color: userSignupfontcolor, backgroundColor: userSignupbgcolor }} className='card-signup' >SIGNUP</a>
                    <a onClick={enableLogin} style={{color: userLoginfontcolor, backgroundColor: userLoginbgcolor }} className='card-login' >LOGIN</a>
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
                        <input type="text" className='LoginEmail card-component' value={loginEmail} onChange={handleLoginEmail} placeholder="Email" autoComplete="off" />
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