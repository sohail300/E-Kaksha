import Skeleton from "@mui/material/Skeleton";

const CardSkeleton = () => {
  const style1 = {
    width: "25%",
    height: "100vh",
    margin: "0px",
    // position: 'relative',
    color: "#000",
    // display: 'block',
    borderRadius: "8px",
  };
  return <Skeleton animation="wave" style={style1} />;
};

export default CardSkeleton;
