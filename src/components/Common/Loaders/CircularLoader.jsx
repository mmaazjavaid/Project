import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function CircularLoader({ open }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: "18px",
      }}
    >
      <CircularProgress color="inherit" />
    </div>
  );
}
