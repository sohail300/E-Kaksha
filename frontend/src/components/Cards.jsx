/* eslint-disable react/prop-types */
import './Cards.css'

const Cards = (props) => {
  const title = props.title;
  const description = props.description;
  const price = props.price;

  function buyCourse() {

  }

  return (
    <>
      <div className="cards">

        <h2>Title: {title}</h2>
        <p>Description: {description}</p>
        <p>Price: ₹{price}</p>
        {/* <p>{imagelink}</p> */}

        <button className='purchase-btn' onClick={buyCourse}>Purchase</button>
        <br />
        <br />
      </div>

    </>
  )
}

export default Cards