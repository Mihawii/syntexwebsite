import React, { useRef, useState } from 'react';
import './WaitlistForm.css';
import { Confetti } from './ui/confetti';
import ShinyText from './ShinyText';

const WaitlistForm = () => {
  const confettiRef = useRef(null);
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
          const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1001 };
          const randomInRange = (min, max) => Math.random() * (max - min) + min;
          confettiRef.current.fire({ ...defaults, particleCount: 50, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
          confettiRef.current.fire({ ...defaults, particleCount: 50, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
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
        <div className="waitlist-container" style={{ position: 'relative' }}>
      <Confetti
        ref={confettiRef}
        manualstart
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000, pointerEvents: 'none' }}
      />
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
