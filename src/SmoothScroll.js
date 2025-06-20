import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    // We still need to register the plugin for the animations to work.
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return children;
};

export default SmoothScroll;
