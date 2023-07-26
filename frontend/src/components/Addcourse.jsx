import { useState } from 'react'
import './Addcourse.css'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const Addcourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imagelink, setImagelink] = useState('');

    function handleTitle(e) {
        setTitle(e.target.value);
    }

    function handleDescription(e) {
        setDescription(e.target.value);
    }

    function handlePrice(e) {
        setPrice(e.target.value);
    }

    function handleImagelink(e) {
        setImagelink(e.target.value);
    }

    function Addcoursefunc() {
        console.log('inside add course');
        console.log(title)
        console.log(description)
        console.log(price)
        console.log(imagelink)
        fetch('https://e-kaksha.vercel.app/admin/courses',{
            method:"POST",
            body:JSON.stringify({
                "title":title,
                "description":description,
                "price":price,
                "linkImage":imagelink,
                "published":true
            }),
            headers:{
                "Authorization": "Bearer " + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((data) =>{
            console.log(data)
        })
     }

    return (<>
        <div id="addcourse-div">
        <h1>Add Course</h1>
            <Card id='card'>
            <br />
                <TextField id="title" label="Title" variant="outlined" className='card-component' value={title} onChange={handleTitle} />
                <br />
                <TextField id="description" label="Description" variant="outlined" className='card-component' value={description} onChange={handleDescription} />
                <br />
                <TextField id="price" label="Price" variant="outlined" className='card-component' value={price} onChange={handlePrice} />
                <br />
                <TextField id="imagelink" label="Image Link" variant="outlined" className='card-component' value={imagelink} onChange={handleImagelink} />
                <br />
                <Button className='button card-component' variant="contained" onClick={Addcoursefunc}>Add Course</Button>
            <br />
            </Card>
        </div>
    </>
    )
}

export default Addcourse