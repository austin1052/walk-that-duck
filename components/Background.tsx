"use client";

import { useState, useEffect, useRef } from "react";
import Line from "@/components/Line";
import styles from "@/styles/Line.module.css";

export default function Background({ children }: any) {
  const [lines, setLines] = useState<any[]>([]);
  const [componentLoaded, setComponentLoaded] = useState(false);
  const linesRef = useRef<HTMLDivElement | null>(null);

  // determines number of lines, bigger number = fewer lines
  const numberOfElements = 50;

  useEffect(() => {
    if (linesRef.current && componentLoaded) {
      const height = linesRef.current.offsetHeight;
      const width = linesRef.current.offsetWidth;
      // const numberOfLines = (height + width) / lineDivider;
      let _lines = [];
      for (let i = 0; i < numberOfElements; i++) {
        _lines.push(<Line key={i} height={height} width={width} />);
      }
      setLines(_lines);
    }
  }, [componentLoaded]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setComponentLoaded(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div ref={linesRef} className={styles.background}>
      <div className={styles.middleLine}></div>
      {lines.length > 0 && lines}
    </div>
  );
}
