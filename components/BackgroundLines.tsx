"use client";

import { useState, useEffect, useRef } from "react";
import Line from "./Line";
import styles from "@/styles/Line.module.css";

export default function BackgroundLines() {
  const [lines, setLines] = useState<any[]>([]);
  const [componentLoaded, setComponentLoaded] = useState(false);
  const linesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (linesRef.current && componentLoaded) {
      const height = linesRef.current.offsetHeight;
      const width = linesRef.current.offsetWidth;
      const numberOfLines = (height + width) / 40;
      let _lines = [];
      for (let i = 0; i < numberOfLines; i++) {
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
    <div ref={linesRef} className={styles.backgroundLines}>
      <div className={styles.middleLine}></div>
      {lines.length > 0 && lines}
    </div>
  );
}
