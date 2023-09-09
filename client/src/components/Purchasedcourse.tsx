import { useEffect, useState } from 'react'
import './Purchasedcourse.css'
import Cards from './Cards'
import baseURL from './config.js'
import axios from 'axios';

const Purchasedcourse = () => {
    const [purchasedcourseArray, setPurchasedcoursearray] = useState([]);

    const api = axios.create({
        baseURL
      });

    useEffect(() => {
        async function call(){
            const data= await api.get('/users/purchasedCourses',
            {headers:{
                "Authorization": "Bearer " + localStorage.getItem('token')
            }})
            // console.log(data.data);
            setPurchasedcoursearray(data.data.purchasedCourses);
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
                        <Cards key={index} title={item.title} description={item.description} price={item.price} linkImage={item.linkImage} />
                    )
                })
            }
      </div>
        </>
    )
}

export default Purchasedcourse