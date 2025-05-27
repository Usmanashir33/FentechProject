import React, { useRef } from "react";
import "./Support.css";
import { FaWhatsapp, FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import { BiChat } from "react-icons/bi";

const Support = () => {
    const navigate = useRef()
  return (
    <div className="support-container">
      {/* Navigation Bar */}
      <header className="support-header">
        <nav className="support-nav">
          <ul>
            <li><BiChat /> Live Chat</li>
            <li><FaWhatsapp /> WhatsApp</li>
            <li><FaFacebook /> Facebook</li>
            <li><FaTwitter /> Twitter</li>
            <li><FaInstagram /> Instagram</li>
            <li><FaEnvelope /> Email</li>
          </ul>
        </nav>
      </header>

      {/* Content Section */}
      <main className="support-content">
        <h1>How can we help you?</h1>
        <p>Choose a support option from the navigation above to get started.</p>
        <div className="support-links">
            <button className="chat-btn" >Start Live Chat</button>

            <a href="https://wa.me/2347046008523" target="_blank" rel="noopener noreferrer">
                <button className="whatsapp-btn">Chat on WhatsApp</button>
            </a>
        </div>
      </main>
    </div>
  );
};

export default Support;
