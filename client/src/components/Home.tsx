import "./Home.css";
import imageurl from "../images/character.png";
// import About from './About'

const Home = () => {
  return (
    <>
      <main id="main-div">
        <div className="heading">
          <h1>Welcome to </h1>
          <h1>E-Kaksha</h1>
        </div>
        <div>
          <div className="bg"></div>

          <div className="star-field">
            <div className="layer"></div>
            <div className="layer"></div>
            <div className="layer"></div>
          </div>

          <img
            src={imageurl}
            alt="not loaded"
            style={{ transform: "scaleX(-1)", height: "520px", marginRight:"10px" }}
          />
          {/* <Book></Book> */}
        </div>
      </main>
    </>
  );
};

export default Home;
