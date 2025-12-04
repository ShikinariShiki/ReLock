import { motion } from "framer-motion";

// Container for staggered children animations
export const AnimatedContainer = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: delay,
          staggerChildren: 0.1,
        },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Individual animated items
export const AnimatedItem = ({ children, className = "" }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Fade in from different directions
export const FadeIn = ({ 
  children, 
  direction = "up", 
  delay = 0, 
  duration = 0.5,
  className = "" 
}) => {
  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scale animation for buttons/cards
export const ScaleIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// Hover animation wrapper for interactive elements
export const HoverScale = ({ children, scale = 1.02, className = "" }) => (
  <motion.div
    whileHover={{ scale }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.2 }}
    className={className}
  >
    {children}
  </motion.div>
);

// Card animation for lists
export const AnimatedCard = ({ children, index = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.4, 
      delay: index * 0.1,
      ease: "easeOut" 
    }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className={className}
  >
    {children}
  </motion.div>
);
