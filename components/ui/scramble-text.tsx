"use client";

import { useEffect, useRef, useState } from "react";

export interface ScrambleTextProps {
  text: string;
  duration?: number; // duration in seconds
  speed?: number; // interval in ms
  characters?: string;
  className?: string;
}

const DEFAULT_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function ScrambleText({
  text,
  duration = 0.6,
  speed = 30,
  characters = DEFAULT_CHARS,
  className,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const prevTextRef = useRef(text);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip animation on initial mount so page loads clean
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevTextRef.current = text;
      return;
    }

    const startText = prevTextRef.current;
    const targetText = text;
    prevTextRef.current = text;

    if (startText === targetText) return;

    const startTime = performance.now();
    const durationMs = duration * 1000;
    let timerId: NodeJS.Timeout;

    const update = () => {
      const now = performance.now();
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);

      const currentLen = Math.round(
        startText.length + (targetText.length - startText.length) * progress
      );

      let scrambled = "";
      for (let i = 0; i < currentLen; i++) {
        // Stagger reveal from left to right
        const charThreshold = (i + 1) / Math.max(1, currentLen);
        if (progress >= charThreshold) {
          scrambled += targetText[i] ?? "";
        } else if (targetText[i] === " ") {
          scrambled += " ";
        } else {
          scrambled += characters[Math.floor(Math.random() * characters.length)];
        }
      }

      setDisplayText(scrambled);

      if (progress < 1) {
        timerId = setTimeout(update, speed);
      } else {
        setDisplayText(targetText);
      }
    };

    update();

    return () => {
      clearTimeout(timerId);
    };
  }, [text, duration, speed, characters]);

  return <span className={className}>{displayText}</span>;
}
