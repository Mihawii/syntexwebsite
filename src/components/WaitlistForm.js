import React, { useRef, useState } from 'react';
import './WaitlistForm.css';
import ShinyText from './ShinyText';

const WaitlistForm = ({ confettiRef }) => {
  const formRef = useRef(null);
  const [status, setStatus] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://formspree.io/f/movwleod', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: new FormData(formRef.current)
      });
      const data = await res.json();
      if (data?.ok || res.ok) {
                setStatus('success');
        if (confettiRef.current) {
          console.log('Firing confetti!');
          confettiRef.current.fire();
        }
        formRef.current.reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
                <div className="waitlist-container">
      <h2 className="waitlist-title">Join the Waitlist</h2>
      <p className="waitlist-subtitle">Be the first to know when we launch.</p>
      <form className="waitlist-form" ref={formRef} onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          className="waitlist-input"
          name="email"
          required
        />
        <button type="submit" className="waitlist-button">
          <ShinyText text="Join Now" speed={3} />
        </button>
            </form>
      {status === 'success' && <p className="waitlist-message success">Thank you! We'll be in touch soon.</p>}
      {status === 'error' && <p className="waitlist-message error">Oops! Something went wrong. Please try again later.</p>}
    </div>
  );
};

export default WaitlistForm;
