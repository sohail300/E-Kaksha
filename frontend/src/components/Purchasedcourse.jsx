import { useEffect, useState } from 'react'
import './Purchasedcourse.css'
import Cards from './Cards'

const Purchasedcourse = () => {
    const [purchasedcourseArray, setPurchasedcoursearray] = useState([]);

    // [
    //     {
    //         title: "Course1",
    //         description: "MERN Stack Course",
    //         price: 800
    //     },
    //     {
    //         title: "Course2",
    //         description: "JAVA Course",
    //         price: 1000
    //     }]

    useEffect(() => {
        fetch('http://localhost:3000/users/purchasedCourses', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data.purchasedCourses);
                setPurchasedcoursearray(data.purchasedCourses);
            })
    }, []);

    return (
        <>
      <h1 id="purchasedcourse-heading">Purchased courses</h1>
      <div id="purchasedcourse-div">
            {
                purchasedcourseArray.map((item, index) => {
                    return (
                        <Cards key={index} title={item.title} description={item.description} price={item.price} />
                    )
                })
            }
      </div>
        </>
    )
}

export default Purchasedcourse