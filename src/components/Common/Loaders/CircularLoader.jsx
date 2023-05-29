import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function CircularIndeterminate({ open }) {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        position: "absolute",
        background: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </div>
  );
}
