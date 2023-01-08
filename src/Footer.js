import React from "react";

const Footer = ({ value }) => {
  return <footer className="footer">{value.join("  ")}</footer>;
};

export default Footer;
