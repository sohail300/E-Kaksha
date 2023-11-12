import { useEffect, useState } from 'react'
import './AllCourses.css'
import Cards from './Cards.js'
import baseURL from './config.js'
import axios from 'axios'

const Allcourse = () => {
  const [courseArray, setCoursearray] = useState([]);

  const api = axios.create({
    baseURL
  });

  useEffect(() => {
    async function call() {
      const data = await api.get('/admin/courses',
        {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
          }
        })
      console.log(data.data.course)
      setCoursearray(data.data.course);
    }
    call();
  }, []);

  return (
    <>
    <main>
      <h1 id="allcourse-heading" style={{color: "#000"}}>All courses</h1>
      <div id="allcourse-div">
        {
          courseArray.map((item, index) => {
            return (
              <>
                <Cards key={index} id={item._id} title={item.title} description={item.description} price={item.price} imagelink={item.imagelink} />
              </>
            )
          })
        }
      </div>
        </main>
    </>
  )
}

export default Allcourse