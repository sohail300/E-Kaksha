import { useNavigate } from "react-router-dom";
import "./Cards.css";

const Cards = (props) => {
  const navigate = useNavigate();
  const id = props.id;
  const title = props.title;
  const description = props.description;
  const price = props.price;
  const imagelink = props.imagelink;

  async function viewCourse() {
    console.log(id);
    navigate(`/course/${id}`);
  }

  return (
    <>
      <div
        className="cards"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <img src={imagelink} alt="image link" />
        <h2
          style={{
            display: "flex",
            alignSelf: "flex-start",
            marginLeft: "16px",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            display: "flex",
            alignSelf: "flex-start",
            marginLeft: "16px",
            marginTop: "0px",
          }}
        >
          Price: <span style={{ color: "green" }}>₹{price}</span>
        </p>
        <p className="description">{description}</p>
        <button
          className="purchase-btn"
          onClick={viewCourse}
          style={{
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          {" "}
          <span style={{ display: "flex", alignSelf: "center" }}>
            View Course
          </span>
        </button>
      </div>
    </>
  );
};

export default Cards;
