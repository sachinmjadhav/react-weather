import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      &copy; 2019 | OpenWeather-API | Developed by{" "}
      <a
        href="https://github.com/sachinmjadhav"
        target="_blank"
        rel="noopener noreferrer"
        className="footer_link"
      >
        Sachin Jadhav
      </a>
    </div>
  );
}

export default Footer;
