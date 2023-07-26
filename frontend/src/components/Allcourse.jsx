import { useEffect, useState } from 'react'
import './Allcourse.css'
import Cards from './Cards'

const Allcourse = () => {
  const [courseArray, setCoursearray] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/admin/courses', {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setCoursearray(data.course);
      })
  }, []);

  // useEffect(() => {
  //   console.log('Updated courseArray');
  //   console.log(courseArray);
  // }, [courseArray]);

  return (
    <>
      <h1 id="allcourse-heading">All courses</h1>
      <div id="allcourse-div">
      {
        courseArray.map((item ,index) => {
          return(
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