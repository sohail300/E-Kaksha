import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const ViewReviews = (props) => {
  const placeholderPhoto =
    "https://firebasestorage.googleapis.com/v0/b/e-kaksha-2001.appspot.com/o/Portrait_Placeholder.png?alt=media&token=c73e56ba-6a59-45b5-b328-26cafc0d9a56";
  const reviews = props.reviews;
  console.log(reviews);

  return (
    <div className="px-4">
      <h2 className="text-left text-2xl font-medium">Reviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8">
        {reviews.map((item, index) => (
          <div
            key={index}
            className="rounded-lg bg-gray-200 border border-gray-500 p-4 flex flex-col justify-between shadow-md"
          >
            <div className="flex justify-between items-center">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={item.photoUrl || placeholderPhoto}
                alt={item.username}
              />
              <div className="flex flex-col items-end">
                <p className="font-medium">{item.username}</p>
                <Rating
                  value={item.rating}
                  precision={0.5}
                  emptyIcon={
                    <StarIcon
                      style={{ opacity: 0.2, color: "#fff" }}
                      fontSize="small"
                    />
                  }
                  readOnly
                  size="small"
                />
              </div>
            </div>
            <p className="text-justify mt-4">{item.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewReviews;
