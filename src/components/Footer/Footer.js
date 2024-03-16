import React from 'react'
import "./Footer.css";
import { FaGithub, FaTwitter, FaLinkedinIn } from "react-icons/fa";
export const Footer = () => {
  return (
    <div>
         <footer className="footer">
      <div className="footer-title">Abhishek Gautam</div>
      <div className="footer-social-icons">
        <a
          target="_blank"
          className="link"
          href="https://github.com/AbhishekkGautam"
          rel="noreferrer"
        >
          <FaGithub className="social-icon" />
        </a>
        <a
          target="_blank"
          className="link"
          href="https://twitter.com/helloAbhishekk"
          rel="noreferrer"
        >
          <FaTwitter className="social-icon" />
        </a>
        <a
          target="_blank"
          className="link"
          href="https://www.linkedin.com/in/abhishek-gautam-54684a167/"
          rel="noreferrer"
        >
          <FaLinkedinIn className="social-icon" />
        </a>
      </div>
    </footer>
    </div>
  )
}
