"use client";

import { useState, useEffect, useRef } from "react";
import Line from "@/components/Line";
import styles from "@/styles/Line.module.css";

export default function Background() {
  const [dots, setDots] = useState<any[]>([]);
  const [componentLoaded, setComponentLoaded] = useState(false);
  const dotsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setComponentLoaded(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  // determines number of lines, bigger number = fewer lines
  const divider = 8;

  useEffect(() => {
    if (dotsRef.current && componentLoaded) {
      const height = dotsRef.current.offsetHeight;
      const width = dotsRef.current.offsetWidth;
      const numberOfElements = width / divider;
      let dots = [];
      for (let i = 0; i < numberOfElements; i++) {
        dots.push(<Line key={i} height={height} width={width} />);
      }
      setDots(dots);
    }
  }, [componentLoaded]);

  return (
    <div ref={dotsRef} className={styles.background}>
      <div className={styles.middleLine}></div>
      {dots.length > 0 && dots}
      <div className={styles.backdrop}></div>
    </div>
  );
}
