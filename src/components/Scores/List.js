import React from 'react';
import styles from '../../styles/Scores/List.module.css';

export default function ScoreList({ player, idx, isMobile }) {

  const { name, houseName, totalPoints } = player[1];
  return (
    <div className={styles.listItem}>
      <div className={styles.number}>{idx}</div>
      <div className={styles.nameContainer}>
        <div className={styles.name}>{name}</div>
        {
          !isMobile &&
          <div className={styles.houseContainer}>
            <div className={styles.houseName}>{houseName}</div>
          </div>
        }
      </div>
      <div className={styles.points}>{totalPoints}</div>
    </div >
  );
};