"use client"; 
import "./Footer.css"; 

export default function Footer(){
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">
           © {new Date().getFullYear()} Summarist. All rights reserved.
        </p>
      </div>
    </footer>
  )
}