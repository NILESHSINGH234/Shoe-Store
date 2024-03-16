import React from 'react'
import "./Footer.css";
import { FaGithub, FaTwitter, FaLinkedinIn } from "react-icons/fa";
export const Footer = () => {
  return (
    <div>
         <footer className="footer">
      <div className="footer-title">Nilesh Kumar</div>
      <div className="footer-social-icons">
        <a
          target="_blank"
          className="link"
          href="https://github.com/NILESHSINGH234/"
          rel="noreferrer"
        >
          <FaGithub className="social-icon" />
        </a>
        <a
          target="_blank"
          className="link"
          href="https://x.com/NileshKuma8595?t=ieLk1RvhhObSkI5QtLgeIA&s=08"
          rel="noreferrer"
        >
          <FaTwitter className="social-icon" />
        </a>
        <a
          target="_blank"
          className="link"
          href="https://www.linkedin.com/in/nilesh-kumar-477582294/"
          rel="noreferrer"
        >
          <FaLinkedinIn className="social-icon" />
        </a>
      </div>
    </footer>
    </div>
  )
}
