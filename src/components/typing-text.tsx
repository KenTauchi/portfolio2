import React from "react";
import { motion, useAnimationControls } from "framer-motion";

export const TypingText = ({
  text = "Hello, I'm a typing animation!",
  speed = 0.02,
  className = "",
}) => {
  const cursorControls = useAnimationControls();

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: speed,
        delayChildren: speed * i,
        onComplete: () => {
          cursorControls.start({
            opacity: [0, 1, 0],
            transition: {
              duration: 0.8,
              repeat: Infinity,
              repeatType: "reverse",
            },
          });
        },
      },
    }),
  };

  const child = {
    visible: {
      opacity: 0.8,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div className={className} variants={container} initial="hidden" animate="visible">
      {Array.from(text).map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{
            marginRight: char === " " ? "0.25em" : "0.05em",
          }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        className="inline-block w-2 h-4 bg-white ml-1 "
        initial={{ opacity: 0 }}
        animate={cursorControls}
      />
    </motion.div>
  );
};
