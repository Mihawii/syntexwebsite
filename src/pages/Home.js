import React from 'react';
import SyntexLogo from '../components/SyntexLogo';
import ScrollFloat from '../ScrollFloat';
import WaitlistForm from '../components/WaitlistForm';

const Home = () => {
  return (
    <>
      <header className="App-header">
        <SyntexLogo />
      </header>
      <div className="scroll-section">
        <ScrollFloat animationDuration={0.8} ease="power2.out">
          Immersive.
        </ScrollFloat>
      </div>
      <div className="scroll-section">
        <ScrollFloat animationDuration={0.8} ease="power2.out">
          fast.
        </ScrollFloat>
      </div>
      <div className="scroll-section">
        <ScrollFloat animationDuration={0.8} ease="power2.out">
          your career begins here.
        </ScrollFloat>
      </div>
      <WaitlistForm />
    </>
  );
};

export default Home;
