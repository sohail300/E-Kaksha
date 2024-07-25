import { useState } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import { api } from "../../utils/config";

const GiveReview = ({
  courseid,
  onClose,
  getReviews,
}: {
  courseid: string;
  onClose: () => void;
  getReviews: () => Promise<void>;
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  async function submitReview() {
    try {
      const response = await api.post(
        "/course/review",
        {
          comment,
          courseid,
          rating,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
      alert("Review Submitted!");
      onClose();
      getReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Give Review</h2>
          <CloseIcon
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Rating:
          </label>
          <Rating
            name="rating"
            value={rating}
            precision={0.5}
            onChange={(_event, newValue) => {
              setRating(newValue as number);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Comment:
          </label>
          <TextareaAutosize
            minRows={5}
            placeholder="Share your thoughts about this course..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 bg-gray-200 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <Button
          variant="contained"
          onClick={submitReview}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit Review
        </Button>
      </div>
    </div>
  );
};

export default GiveReview;
