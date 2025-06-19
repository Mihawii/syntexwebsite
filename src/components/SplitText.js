import { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

const SplitText = ({
  text,
  className = "",
  delay = 50, // Slower, more elegant stagger
  duration = 0.8, // Slower animation
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40, filter: 'blur(8px)' },
  to = { opacity: 1, y: 0, filter: 'blur(0px)' },
  textAlign = "center",
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Inject raw text content before splitting
    el.textContent = text;

    const splitter = new GSAPSplitText(el, {
      type: splitType,
      absolute: splitType === "lines",
      linesClass: "split-line",
    });

    const targets = splitter.chars || splitter.words || splitter.lines;

    targets.forEach((t) => {
      t.style.willChange = "transform, opacity, filter";
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 3, // Creates an even heavier scroll effect
        onEnter: () => setVisible(true),
      },
    });

    tl.set(targets, { ...from, force3D: true });
    tl.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      force3D: true, // Enable hardware acceleration
    });

    // will reveal onEnter instead

    return () => {
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
      gsap.killTweensOf(targets);
      if (splitter.revert) splitter.revert();
    };
  }, [text, delay, duration, ease, splitType, from, to]);

  return (
    <p
      ref={ref}
      className={`split-parent ${className}`}
      aria-label={text}
      style={{
        visibility: visible ? 'visible' : 'hidden',
        textAlign,
        overflow: "hidden",
        display: "inline-block",
        whiteSpace: "normal",
        wordWrap: "break-word",
      }}
    />
  );
};

export default SplitText;
