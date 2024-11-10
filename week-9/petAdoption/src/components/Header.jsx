import React from "react";

const Header = ({ message }) => {
  return (
    <nav
      style={{
        padding: "16px 32px",
        background: "#c59771bd",
      }}
    >
      <h1>{message}</h1>
    </nav>
  );
};

export default Header;
