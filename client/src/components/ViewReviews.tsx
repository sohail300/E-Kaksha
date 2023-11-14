import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const ViewReviews = (props) => {
  const reviews = props.reviews;
  console.log(reviews);

  return (
    <>
      <h2
        style={{ textAlign: "start", marginLeft: "16px", marginBottom: "8px" }}
      >
        Reviews
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: "16px",
          margin: "0px",
          justifyContent: "space-around",
        }}
      >
        {reviews.map((item, index) => {
          return (
            <>
              <div
                style={{
                  width: "40%",
                  height: "30%",
                  border: "2px solid red",
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  marginBottom: "40px",
                }}
              >
                <div style={{ display: "flex" , justifyContent:"space-around", alignItems:"center"}}>
                  <div
                    style={{
                      backgroundColor: "#000",
                      borderRadius: "50%",
                      height: "15vh",
                      width: "35%",
                      border: "2px solid red",
                      display: "flex",
                      alignSelf: "center",
                      justifySelf:"center"
                    }}
                  >
                  </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <p>{item.username}</p>
                      <Rating
                        value={item.rating}
                        precision={0.5}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.2, color: "#fff" }}
                            fontSize="inherit"
                          />
                        }
                        readOnly
                      />
                    </div>
                </div>
                <p style={{ textAlign: "justify", border: "2px solid red" }}>
                  {item.comment}
                </p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default ViewReviews;
