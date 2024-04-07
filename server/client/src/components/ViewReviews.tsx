import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const ViewReviews = (props) => {
  const placeholderPhoto='https://firebasestorage.googleapis.com/v0/b/e-kaksha-2001.appspot.com/o/Portrait_Placeholder.png?alt=media&token=c73e56ba-6a59-45b5-b328-26cafc0d9a56'
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
        {reviews.map((item) => {
          return (
            <>
              <div
                style={{
                  width: "40%",
                  height: "30%",
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  marginBottom: "40px",
                  backgroundColor:"#fff",
                  padding:"16px 4px"
                }}
              >
                <div style={{ display: "flex" , justifyContent:"space-around", alignItems:"center"}}>
                  {/* <div
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
                  > */}
                  {/* </div> */}

                  <img src={item.photoUrl || placeholderPhoto} alt={item.photoUrl} style={{width:"6vw", height:"12vh", borderRadius:"50%"}}/>
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
                <p style={{ textAlign: "justify", padding:"0px 16px", margin:"0px", marginTop:"16px" }}>
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
