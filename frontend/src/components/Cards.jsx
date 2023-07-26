/* eslint-disable react/prop-types */
import './Cards.css'
// import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

const Cards = (props) => {
  const title = props.title;
  const description = props.description;
  const price = props.price;

  // const title = props.details.title;
  // const description = props.details.description;
  // const price = props.details.price;
  // const imagelink = props.details.imagelink;

  function buyCourse() {

  }

  return (
    <>
      <Card sx={{ maxWidth: 345 }} className="cards">

        <h2>Title: {title}</h2>
        <p>Description: {description}</p>
        <p>Price: ₹{price}</p>
        {/* <p>{imagelink}</p> */}

        <Button className='button card-component signup-btn' variant="contained" onClick={buyCourse}>Signup</Button>
        <br />
        <br />

      </Card>

    </>
  )
}

// Cards.propTypes = {
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   // imagelink: PropTypes.string.isRequired,
// };

export default Cards