import './Admin.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

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
        fetch('https://e-kaksha.vercel.app/users/signup', {
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
        fetch('https://e-kaksha.vercel.app/users/login', {
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
        <div id="signup-container">
            <Card id='card'>
                <div id='signup-option'>
                    <Button onClick={enableSignup} className='button' variant="text" >Signup</Button>
                    <Button onClick={enableLogin} className='button' variant="text" >Login</Button>
                </div>
                {signup &&
                    <>
                        <TextField id="signupEmail" label="Email" variant="outlined" className='card-component' value={signupEmail} onChange={handleSignupEmail} autoComplete="off" />
                        <br />
                        <TextField id="signupPassword" label="Password" variant="outlined" className='card-component' value={signupPassword} onChange={handleSignupPassword} autoComplete="off" />
                        <br />
                        <Button className='button card-component neumorphism signup-btn' variant="contained" onClick={handleSignup}>Signup</Button>
                        <br />
                    </>
                }

                {login &&
                    <>
                        <TextField id="LoginEmail" label="Email" variant="outlined" className='card-component' value={loginEmail} onChange={handleLoginEmail} autoComplete="off" />
                        <br />
                        <TextField id="LoginPassword" label="Password" variant="outlined" className='card-component' value={loginPassword} onChange={handleLoginPassword} autoComplete="off" />
                        <br />
                        <Button className='button card-component neumorphism signup-btn' variant="contained" onClick={handleLogin}>Login</Button>
                        <br />
                    </>
                }
            </Card>


        </div>
    )
}

export default Signup