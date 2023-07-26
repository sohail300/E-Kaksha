import './Appbar.css'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Appbar = () => {
    const navigate = useNavigate();
    const [currUser, setCurruser] = useState(null);

    useEffect(() => {
        fetch('https://e-kaksha.vercel.app/profile', {
            method: 'GET',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log('data role: ' + data.role);
                if (data.role == 'admin') {
                    setCurruser('admin')
                } else if (data.role == 'user') {
                    setCurruser('user')
                }
            })
    })

    function openAdmin() {
        navigate('/admin');
    }

    function openStudent() {
        navigate('/student');
    }

    function openAllcourses() {
        navigate('/allcourse');
    }

    function openAddcourses() {
        navigate('/addcourse');
    }

    function openPurchasedcourses() {
        navigate('/purchasedcourse');
    }

    function logout() {
        localStorage.setItem('token', null);
        setCurruser(null);
        navigate('/')
    }

    if (currUser == 'admin') {
        console.log('inside admin');
        return (
            <nav className="navbar">
                <p className="logo">
                    E-Kaksha
                </p>
                <div className="nav-links">
                    <Button onClick={openAllcourses} className='button navlink-btn' variant="text" >All Courses</Button>
                    <Button onClick={openAddcourses} className='button navlink-btn' variant="text" >Add Course</Button>
                    <Button onClick={logout} className='button navlink-btn' variant="text" >Logout</Button>
                </div>
            </nav>
        )
    } else if (currUser == 'user') {
        console.log('inside student');
        return (
            <nav className="navbar">
                <p className="logo">
                    E-Kaksha
                </p>
                <div className="nav-links">
                    <Button onClick={openAllcourses} className='button navlink-btn' variant="text" >All Courses</Button>
                    <Button onClick={openPurchasedcourses} className='button navlink-btn' variant="text" >Purchased Courses</Button>
                    <Button onClick={logout} className='button navlink-btn' variant="text" >Logout</Button>
                </div>
            </nav>
        )
    } else if (currUser == null) {
        console.log('inside others');
        return (
            <nav className="navbar">
                <p className="logo">
                    E-Kaksha
                </p>
                <div className="nav-links">
                    <Button onClick={openAdmin} className='button navlink-btn' variant="text">Admin</Button>
                    <Button onClick={openStudent} className='button navlink-btn' variant="text" >Student</Button>
                </div>
            </nav>
        )
    }
}
// sx={{ color: 'black' }}
export default Appbar;