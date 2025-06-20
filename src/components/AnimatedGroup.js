import React from 'react';
import { motion } from 'framer-motion';

/**
 * Utility to concatenate css class names conditionally (tailwind style).  
 * Accepts any number of arguments (string or falsy) and joins them with space.
 */
export function cn(...args) {
  return args.filter(Boolean).join(' ');
}

const defaultContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const defaultItem = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const buildVariants = () => ({
  fade: {
    container: defaultContainer,
    item: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  },
  slide: {
    container: defaultContainer,
    item: { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  },
  scale: {
    container: defaultContainer,
    item: { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } },
  },
  'blur-slide': {
    container: defaultContainer,
    item: {
      hidden: { opacity: 0, filter: 'blur(4px)', y: 20 },
      visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
    },
  },
});

const presets = buildVariants();

export default function AnimatedGroup({
  children,
  className,
  variants,
  preset = 'fade',
}) {
  const selected = presets[preset] || {};
  const containerVariants = variants?.container || selected.container || defaultContainer;
  const itemVariants = variants?.item || selected.item || defaultItem;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(className)}
    >
      {React.Children.map(children, (child, idx) => (
        <motion.div variants={itemVariants} key={idx}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
