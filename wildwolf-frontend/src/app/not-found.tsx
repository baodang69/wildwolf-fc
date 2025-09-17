import React from "react";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <img
        src="/background/notfound_wolf.png"
        alt="Not Found"
        style={{ maxWidth: "30%", height: "auto", marginBottom: "1rem" }}
      />
      <h1 style={{ fontSize: "2rem", color: "#647082" }}>
        Oops - Page Not Found
      </h1>
    </div>
  );
}
