"use client";

import { useState } from "react";
import { SortableList } from "@/app/team-selection/components/SortableList";
import { Queen } from "@/app/team-selection/components/SortableList";
import QueenInfoCard from "@/app/queen-info-card/components/QueenInfoCard";
import { queenData } from "@/test-data";
import styles from "../styles/index.module.css";

export default function QueenSelection() {
  const [queens, setQueens] = useState<Queen[]>(queenData);
  const numberOfQueens = queens.length;
  const placements = [...Array(numberOfQueens).keys()];

  function handleSubmit(e: any) {
    console.log("submit");
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.queenPlacement}>
          {placements.map((place) => (
            <div key={place}>{place + 1}</div>
          ))}
        </div>
        <SortableList
          items={queens}
          onChange={setQueens}
          renderItem={(queen) => (
            <SortableList.Item id={queen.id}>
              <QueenInfoCard queen={queen} />
              <SortableList.DragHandle />
            </SortableList.Item>
          )}
        />
      </div>
      <button onClick={handleSubmit}>Submit Team</button>
    </>
  );
}
