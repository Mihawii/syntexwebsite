import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactPage.css';

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <div className="contact-page">
      <div className="contact-card">
        <h1 className="contact-heading">Contact Us</h1>
        <p className="contact-text">
          For general and business inquiries, reach us at{' '}
          <a href="mailto:aerthea.branch@gmail.com" className="contact-link">
            aerthea.branch@gmail.com
          </a>
        </p>
        <p className="contact-text">
          For personal inquiries, connect on LinkedIn:{' '}
          <a
            href="https://www.linkedin.com/in/issa-geisendorfer"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            Issa Geisendorfer
          </a>
        </p>
        <button onClick={() => navigate(-1)} className="go-back-button">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ContactPage;

