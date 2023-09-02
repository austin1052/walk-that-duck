"use client";
import styles from "@/styles/Line.module.css";

export default function Line({
  height,
  width,
}: {
  height: number;
  width: number;
}) {
  // larger values make animation slower
  const timeMultiplier = 2;
  const delayMultiplier = 15;
  const timeList = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const time =
    timeList[Math.floor(Math.random() * timeList.length)] * timeMultiplier;
  const position = Math.floor(Math.random() * width);
  const delay = Math.random() * delayMultiplier;

  const style = {
    "--height": `-${height}px`,
    "--time": `${time}s`,
    left: `${position}px`,
    animationDelay: `${delay}s`,
  } as React.CSSProperties;

  return <div className={styles.line} style={style}></div>;
}
