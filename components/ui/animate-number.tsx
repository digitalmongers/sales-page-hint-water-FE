"use client";

import { useRef } from "react";
import { motion, AnimatePresence, type Transition } from "motion/react";

export interface AnimateNumberProps {
  children: number;
  className?: string;
  transition?: Transition;
}

const variants = {
  enter: (dir: number) => ({
    y: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    y: dir > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

export function AnimateNumber({
  children,
  className,
  transition,
}: AnimateNumberProps) {
  const prevRef = useRef(children);
  const direction = children >= prevRef.current ? 1 : -1;
  prevRef.current = children;

  return (
    <span className="relative inline-flex h-[1.25em] items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.span
          key={children}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={
            transition ?? {
              y: { type: "spring", stiffness: 200, damping: 22, mass: 0.9 },
              opacity: { duration: 0.3, ease: "easeOut" },
            }
          }
          className={`inline-block tabular-nums select-none ${className ?? ""}`}
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
