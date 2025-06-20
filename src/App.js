import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';
import Navbar from './Navbar';
import SmoothScroll from './SmoothScroll';
import ClickSpark from './ClickSpark';
import SyntexLogo from './components/SyntexLogo';
import SplitText from './components/SplitText';
import WaitlistForm from './components/WaitlistForm';
import InfinityLoader from './components/InfinityLoader';
import TextPressure from './components/TextPressure';
import ParticleEffect from './components/ParticleEffect';
import SpotlightCard from './components/SpotlightCard';
import FloatingLogo from './components/FloatingLogo';
import syntexLogo from './assets/syntex-logo.png';
import cogentLogo from './assets/cogent-logo.png';

const partners = [
      { image: cogentLogo, name: 'Cogent' }
];

function App() {
  const smoothScrollRef = useRef(null);
  const [appState, setAppState] = useState('loading'); // loading, main
  const [minFontSize, setMinFontSize] = useState(128);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setMinFontSize(64);
      } else if (window.innerWidth <= 768) {
        setMinFontSize(96);
      } else {
        setMinFontSize(128);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const minDisplayTime = 3000;
    const startTime = Date.now();

    const finishLoading = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = minDisplayTime - elapsedTime;
      setTimeout(() => {
        setAppState('main');
      }, Math.max(0, remainingTime));
    };

    if (document.readyState === 'complete') {
      finishLoading();
    } else {
      window.addEventListener('load', finishLoading, { once: true });
    }

    return () => {
      window.removeEventListener('load', finishLoading);
    };
  }, []);

  useEffect(() => {
    if (appState === 'main' && smoothScrollRef.current?.lenis) {
      const lenis = smoothScrollRef.current.lenis;
      const defaultLerp = lenis.options.lerp;
      const slowLerp = 0.05;

      const slowScrollSections = gsap.utils.toArray('.scroll-section');

      slowScrollSections.forEach(section => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          onEnter: () => (lenis.options.lerp = slowLerp),
          onLeave: () => (lenis.options.lerp = defaultLerp),
          onEnterBack: () => (lenis.options.lerp = slowLerp),
          onLeaveBack: () => (lenis.options.lerp = defaultLerp),
        });
      });
    }
  }, [appState]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    type: 'tween',
    ease: [0.33, 1, 0.68, 1], // easeOutQuart-like
    duration: 1.0,
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {appState === 'loading' && <InfinityLoader key="loader" />}

        {appState === 'main' && (
          <motion.div
            key="main"
            initial="initial"
            animate="in"
            variants={pageVariants}
            transition={pageTransition}
          >
            <SmoothScroll ref={smoothScrollRef}>
              <ClickSpark>
                                <div className="App">
                  <Navbar />
                  <header className="App-header">
                    <SyntexLogo />
                  </header>
                  <div className="scroll-section">
                    <SplitText text="Immersive." className="hero-text" />
                  </div>
                  <div className="scroll-section">
                    <SplitText text="fast." className="hero-text" />
                  </div>
                  <div className="scroll-section">
                    <SplitText text="your career begins here." className="hero-text" />
                  </div>
                  <section id="about" className="about-section">
                    <div className="about-heading-container">
                      <TextPressure
                        text="About Syntex"
                        scale={true}
                        flex={true}
                        alpha={false}
                        stroke={false}
                        width={false}
                        weight={true}
                        italic={false}
                        textColor="#ffffff"
                        minFontSize={minFontSize}
                        interactionRadius={120}
                      />
                    </div>
                    <div className="about-cards-container">
                      <SpotlightCard className="about-card" spotlightColor="rgba(255, 255, 255, 0.15)">
                        <ParticleEffect />
                        <p className="about-card-text">
                          Syntex is what school forgot to build — a space to actually practice.
                        </p>
                      </SpotlightCard>
                      <SpotlightCard className="about-card" spotlightColor="rgba(255, 255, 255, 0.15)">
                        <ParticleEffect />
                        <p className="about-card-text">
                          Choose a course. Dive in. Get feedback from multi-agent AI simulations.
                        </p>
                      </SpotlightCard>
                      <SpotlightCard className="about-card" spotlightColor="rgba(255, 255, 255, 0.15)">
                        <ParticleEffect />
                        <p className="about-card-text">
                          From resume checks to immersive roleplays — Syntex gets you ready for what actually matters.
                        </p>
                      </SpotlightCard>
                    </div>
                  </section>
                  <section id="partners" className="internships-section">
                    <div className="about-heading-container">
                      <TextPressure
                        text="Our Partners"
                        scale={true}
                        flex={true}
                        alpha={false}
                        stroke={false}
                        width={false}
                        weight={true}
                        italic={false}
                        textColor="#ffffff"
                        minFontSize={minFontSize}
                        interactionRadius={120}
                      />
                    </div>
                    <FloatingLogo logo={partners[0]} />
                  </section>
                  <WaitlistForm />
                </div>
              </ClickSpark>
            </SmoothScroll>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
