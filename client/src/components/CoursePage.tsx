import { useParams } from "react-router-dom";
import {AccordianComp, Course} from "./Components";
import DoughnutComp from './DoughnutComp.jsx'
import Button from "@mui/material/Button";
import axios from "axios";
import baseURL from './config.js'
import { useEffect,useState } from "react";

function CoursePage() {
  const [course, setCourse]=useState({});
  const {id}=useParams();

  const api=axios.create({
    baseURL
  })

  useEffect(()=>{
    async function callFunc(){
      console.log("1")
      console.log(id)
      const response=await api.get(`admin/courses/${id}`,{
        headers:{
          Authorization: "bearer "+localStorage.getItem('token')
        }
      })
      setCourse(response.data.course);
      console.log(course);
    }
    callFunc();
  },[])

  async function getCert(){
    const response=await api.get('user/certificate',{
      headers: {
        Authorization:"Bearer "+localStorage.getItem('token')
      }
    })

    console.log(response.data);
  }

  async function checkout(){
    const priceid=course.priceid;
      const response= await api.post('user/checkout',{
        priceid
      }, {
        headers: {
          Authorization: "Bearer "+ localStorage.getItem('item')
        }
      })

      console.log(response.data);
  }
  
  return (
    <>
      <div
        style={{
          background: "#161616",
          width: "99vw",
          height: "50vh",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <img
          src={course.imagelink}
          alt=""
          style={{ margin: "16px 80px 16px 80px" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            color:"#fff",
            width:"700px"
          }}
        >
          <p style={{fontWeight:"bold", fontSize:"24px"}}>{course.title}</p>
          <p>Price: <span style={{color:"#00ff00", fontWeight:"bold"}}>₹{course.price}</span></p>
          <p style={{textAlign:"justify"}}>{course.description}</p>
          <p>Ratings <a href="" style={{marginLeft:"8px"}}>See all reviews</a></p>
          <div>
          <Button variant="contained" style={{marginRight: "24px"}} onClick={checkout}>Buy Course</Button>
          <Button variant="contained">Give Review</Button>
          </div>
        </div>
      </div>

      <div style={{width: "100vw", display:"flex"}}>
        <div style={{width: "70%"}}>
        <h2 style={{textAlign:"start", marginLeft:"16px"}}>Syllabus</h2>
        <div style={{overflowY: "scroll",maxHeight:"75vh"}}>
        <AccordianComp />
        <AccordianComp />
        <AccordianComp />
        <AccordianComp />
        <AccordianComp />
        <AccordianComp />
        <AccordianComp />
        <AccordianComp />
        <AccordianComp />
        <AccordianComp />
        </div>
        </div>
        <div style={{marginRight:"16px", border:"2px solid red", width: "30%"}}>
        <h2 style={{textAlign:"start", marginLeft:"16px"}}>Details</h2>
        <Course duration={course.duration} resources={course.resource} />
          <h3 style={{textAlign:"left", margin:"4px 12px"}}>Course Completion</h3>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
          <DoughnutComp/>
          <p style={{textAlign:"center"}}>You have completed 15 out of 25 modules.</p>          
          <Button variant="contained" onClick={getCert}>Get Completion Certificate</Button>
        </div>
        </div>
      </div>
    </>
  );
}

export default CoursePage;
