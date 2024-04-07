import { useNavigate } from "react-router-dom";

const Cards = ({ id, title, description, price, imagelink }) => {
  const navigate = useNavigate();

  async function viewCourse() {
    console.log(id);
    navigate(`/course/${id}`);
  }

  return (
    <>
      <div
        className="cards"
        style={{
          width: "25%",
          margin: "30px",
          position: "relative",
          color: "#000",
          borderRadius: "8px",
          backgroundColor: "white",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.3) ",
          fontFamily: "Inter, Helvetica, sans-serif, Arial"
        }}
      >
        <img
          src={imagelink}
          alt="image link"
          style={{
            borderRadius: "8px 8px 0px 0px",
            width: "100%",
            height: "240px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 16px",
            paddingBottom: '16px'
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <p style={{fontFamily: "Manrope, Helvetica, sans-serif, Arial", fontWeight: 'bold'}}>{title}</p>
            <p>
              Price: <span style={{ color: "green" }}>₹{price}</span>
            </p>
          </div>
          <p
            className="description"
            style={{
              display: "flex",
              textAlign: "justify",
              height: "200px",
              overflowY: "scroll",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {description}
          </p>
          <button
            className="purchase-btn"
            onClick={viewCourse}
            style={{
              background: "#1976d2",
              borderRadius: "4px",
              padding: "10px 12px",
              fontFamily: "Inter, Helvetica, sans-serif, Arial",
              border: "none",
              cursor: "pointer",
            }}
          >
            View Course
          </button>
        </div>
      </div>
    </>
  );
};

export default Cards;
