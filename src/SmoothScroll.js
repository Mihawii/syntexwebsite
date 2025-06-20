import { useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SmoothScroll = forwardRef(({ children }, ref) => {
  const lenisRef = useRef(null);

  // Expose the lenis instance to the parent component
  useImperativeHandle(ref, () => ({
    get lenis() {
      return lenisRef.current;
    }
  }));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenisRef.current = lenis;

    // Sync GSAP ScrollTrigger with Lenis's scroll events
    lenis.on('scroll', ScrollTrigger.update);

    // Update Lenis on every animation frame
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return children;
});

SmoothScroll.displayName = 'SmoothScroll';

export default SmoothScroll;
