import { useEffect, useState } from 'react'
import './PurchasedCourses.css'
import Cards from './Cards.js'
import baseURL from './config.js'
import axios from 'axios';

const Purchasedcourse = () => {
    const [purchasedcourseArray, setPurchasedcoursearray] = useState([]);

    const api = axios.create({
        baseURL
      });

    useEffect(() => {
        console.log("print");
        async function call(){
            const data= await api.get('/user/purchasedcourses',
            {headers:{
                "Authorization": "Bearer " + localStorage.getItem('token')
            }})
            console.log(data.data.purchasedCourses);
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
                        <Cards key={index} title={item.title} description={item.description} price={item.price} imagelink={item.imagelink} />
                    )
                })
            }
      </div>
        </>
    )
}

export default Purchasedcourse