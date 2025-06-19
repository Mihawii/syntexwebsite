import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollFloat.css';

// Register ScrollTrigger once
if (typeof window !== 'undefined' && gsap && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ScrollFloat
 * -------------
 * A simple component that splits its text children into characters and animates
 * them upward & fades them in when the element scrolls into view. This prevents
 * the initial flash of static text because each char starts hidden (opacity 0 &
 * translateY) until the animation kicks in.
 */
const ScrollFloat = ({
  children,
  animationDuration = 0.8,
  ease = 'power2.out',
  stagger = 0.05,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const chars = el.querySelectorAll('.char');

    // Set initial state so there's no flash of un-animated text
    gsap.set(chars, { y: 60, opacity: 0 });

    const tl = gsap.to(chars, {
      y: 0,
      opacity: 1,
      duration: animationDuration,
      ease,
      stagger,
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none reset',
      },
    });

    return () => {
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [animationDuration, ease, stagger]);

  // If the child isn't a string, just render it directly.
  if (typeof children !== 'string') {
    return <div ref={containerRef}>{children}</div>;
  }

  return (
    <div className="scroll-float" ref={containerRef}>
      <span className="scroll-float-text">
        {children.split('').map((c, idx) => (
          <span key={idx} className="char">
            {c === ' ' ? '\u00A0' : c}
          </span>
        ))}
      </span>
    </div>
  );
};

export default ScrollFloat;
