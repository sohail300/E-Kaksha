import { useState } from 'react'
import './Addcourse.css'

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
        fetch('http://localhost:3000/admin/courses',{
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
            <br />
            <div id='card'>
                <input id="title" placeholder="Title" className='card-component' value={title} onChange={handleTitle} />
                <br />
                <input id="description" placeholder="Description" className='card-component' value={description} onChange={handleDescription} />
                <br />
                <input id="price" placeholder="Price" className='card-component' value={price} onChange={handlePrice} />
                <br />
                <input id="imagelink" placeholder="Image Link" className='card-component' value={imagelink} onChange={handleImagelink} />
                <br />
                <button className='button card-component' onClick={Addcoursefunc}>Add Course</button>
            <br />
            </div>
        </div>
    </>
    )
}

export default Addcourse