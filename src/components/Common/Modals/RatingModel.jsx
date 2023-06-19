import React, { useState } from "react";
import { Modal, TextField, Box, Rating, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function RatingModal({ open, type, category, action }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const formattedType = type.charAt(0).toUpperCase() + type.slice(1);
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    action.onAction(review, rating);
  };

  return (
    <Modal
      open={open}
      onClose={() => action.onModalClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div className="resellerAccountModalContainer">
        <div className="resellerAccountModal">
          <div className="resellerAccountModalHeader">
            {formattedType === "Delete" && (
              <DeleteIcon
                style={{
                  fontSize: "40px",
                  padding: "0px !important",
                  marginTop: "10px",
                  marginBottom: "0px",
                }}
              />
            )}
            <p style={{ padding: "0px !important", marginTop: "5px" }}>
              {formattedType + " " + formattedCategory} Alert
            </p>
          </div>
          <div
            className="resellerAccountModalReview"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <TextField
              label="Write your review"
              multiline
              rows={4}
              value={review}
              onChange={handleReviewChange}
              style={{ width: "90%", margin: "20px auto 20px auto" }}
            />
          </div>
          <div className="resellerAccountModalRating">
            <Box component="fieldset" borderColor="transparent" style={{ marginLeft: "25px" }}>
              <Rating
                name="rating"
                value={rating}
                onChange={(event, value) => handleRatingChange(value)}
              />
            </Box>
          </div>
          <div className="resellerAccountDeleteButtons">
            <a
              onClick={() => action.onModalClose()}
              style={{
                color: "blue",
                marginTop: "5px",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Cancel
            </a>
            <a
              onClick={() => handleSubmit()}
              className="resellermodaldelete"
              style={{ textDecoration: "none " }}
            >
              <p> {formattedType}</p>
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default RatingModal;
