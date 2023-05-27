import React from "react";
import { Modal } from "@mui/material";
import { DeleteIcon } from "@mui/icons-material";
function ConscentModal({ open, type, category, action }) {
  const formattedType = type.charAt(0).toUpperCase() + type.slice(1);
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  return (
    <Modal
      open={open}
      onClose={() => 0}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ border: "none !important", outline: "none" }}
    >
      <div
        className="resellerAccountModalContainer"
        style={{ border: "none !important", outline: "none" }}
      >
        <div className="resellerAccountModal">
          <div className="resellerAccountModalHeader">
            <DeleteIcon
              style={{
                fontSize: "40px",
                padding: "0px !important",
                marginTop: "10px",
                marginBottom: "0px",
              }}
            />
            <p style={{ padding: "0px !important", marginTop: "5px" }}>
              {formattedType + " " + formattedCategory} Alert
            </p>
          </div>
          <div className="resellerAccountModalSearch">
            <p>
              Do you want to {formattedType} this {formattedCategory}?
            </p>
          </div>
          <div className="resellerAccountDeleteButtons">
            <a
              href="link"
              style={{
                color: "blue",
                marginTop: "5px",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Cancel
            </a>
            <a href="link" style={{ textDecoration: "none " }}>
              {" "}
              <DeleteIcon style={{ fontSize: "20px", margin: "0 5px 0 0" }} />{" "}
              <p> {formattedType}</p>
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ConscentModal;
