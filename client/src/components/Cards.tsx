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
      <div className="cards" style={{display:"flex", flexDirection:"column"}}>
        <img src={linkImage} alt="image link"/>
        <h2 style={{display:"flex", alignSelf:"flex-start", marginLeft:"16px"}}>{title}</h2>
        <p style={{display:"flex", alignSelf:"flex-start", marginLeft:"16px", marginTop:"0px"}}>Price: <span style={{color:"green"}}>₹{price}</span></p>
        <p style={{display:"flex", alignSelf:"flex-start", textAlign:"justify", margin:"0px 16px"}}>{description}</p>
        <button className='purchase-btn' onClick={buyCourse} style={{display:"flex", alignSelf:"center", textAlign:"center"}}>
          <span style={{textAlign:"center"}}>Purchase</span></button>
      </div>
    </>
  )
}

export default Cards