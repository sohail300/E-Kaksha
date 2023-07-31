import { useEffect, useState } from 'react'
import './Purchasedcourse.css'
import Cards from './Cards'
import axios from 'axios';

const Purchasedcourse = () => {
    const [purchasedcourseArray, setPurchasedcoursearray] = useState([]);

    useEffect(() => {
        async function call(){
            const data= await axios.get('http://localhost:3000/users/purchasedCourses',
            {headers:{
                "Authorization": "Bearer " + localStorage.getItem('token')
            }})
            console.log(data.purchasedCourses);
            setPurchasedcoursearray(data.purchasedCourses);
        }
        call();
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