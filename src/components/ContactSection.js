import React from 'react';
import './ContactSection.css';

const ContactSection = () => {
  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-title">Contact Us</h2>
      <p className="contact-text">
        For general and business inquiries, reach us at
        {' '}<a href="mailto:aerthea.branch@gmail.com" className="contact-link">aerthea.branch@gmail.com</a>
      </p>
      <p className="contact-text">
        For personal inquiries, connect on LinkedIn:
        {' '}<a href="https://www.linkedin.com/in/issa-geisendorfer" target="_blank" rel="noopener noreferrer" className="contact-link">Issa Geisendorfer</a>
      </p>
    </section>
  );
};

export default ContactSection;
