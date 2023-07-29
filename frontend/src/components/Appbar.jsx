import './Appbar.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Appbar = () => {
    const navigate = useNavigate();
    const [currUser, setCurruser] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/profile', {
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
                    <a onClick={openAllcourses} className='navlink-btn' >All Courses</a>
                    <a onClick={openAddcourses} className='navlink-btn' >Add Course</a>
                    <a onClick={logout} className='navlink-btn' >Logout</a>
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
                    <a onClick={openAllcourses} className='navlink-btn' >All Courses</a>
                    <a onClick={openPurchasedcourses} className='navlink-btn' >Purchased Courses</a>
                    <a onClick={logout} className='navlink-btn' >Logout</a>
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
                    <a onClick={openAdmin} className='navlink-btn admin'>Admin</a>
                    <a onClick={openStudent} className='navlink-btn' >Student</a>
                </div>
            </nav>
        )
    }
}
// sx={{ color: 'black' }}
export default Appbar;