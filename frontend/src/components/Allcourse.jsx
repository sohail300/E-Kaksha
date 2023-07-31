import { useEffect, useState } from 'react'
import './Allcourse.css'
import Cards from './Cards'
import axios from 'axios'

const Allcourse = () => {
  const [courseArray, setCoursearray] = useState([]);

  useEffect(() => {

    async function call() {
      const data = await axios.get('http://localhost:3000/admin/courses',
        {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
          }
        })
      setCoursearray(data.course);
    }
    call();
  }, []);

  return (
    <>
      <h1 id="allcourse-heading">All courses</h1>
      <div id="allcourse-div">
        {
          courseArray.map((item, index) => {
            return (
              <>
                <Cards key={index} title={item.title} description={item.description} price={item.price} />
              </>
            )
          })
        }
      </div>
    </>
  )
}

export default Allcourse