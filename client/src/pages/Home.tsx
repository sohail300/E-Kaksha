import "./Home.css";
import imageurl from "../assets/images/character.png";

const Home = () => {
  return (
    <main id="main-div">
      <div className="content-wrapper lg:px-40">
        <div className="text-content">
          <h1 className="heading font-semibold">E-Kaksha</h1>
        </div>
        <div className="image-container">
          <img
            src={imageurl}
            alt="E-Kaksha character"
            className="character-image"
          />
        </div>
      </div>
      <div className="bg"></div>
      <div className="star-field">
        <div className="layer"></div>
        <div className="layer"></div>
        <div className="layer"></div>
      </div>
    </main>
  );
};

export default Home;
