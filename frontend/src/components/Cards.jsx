/* eslint-disable react/prop-types */
import './Cards.css'

const Cards = (props) => {
  const title = props.title;
  const description = props.description;
  const price = props.price;
  const linkImage = props.linkImage;


  function buyCourse() {

  }

  return (
    <>
      <div className="cards">
        <img src={linkImage} alt="image link"/>
        <h2>{title}</h2>
        <p>Price: ₹{price}</p>
        <p>{description}</p>
        <button className='purchase-btn' onClick={buyCourse}>Purchase</button>
      </div>
    </>
  )
}

export default Cards