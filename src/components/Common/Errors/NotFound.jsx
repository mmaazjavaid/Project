import React from "react";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.text}>Oops! The page you are looking for does not exist.</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "16px",
  },
  text: {
    fontSize: "18px",
    color: "#888",
  },
};

export default NotFound;
