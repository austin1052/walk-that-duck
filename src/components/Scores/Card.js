import React from 'react';
import styles from '../../styles/Scores/Card.module.css'

export default function ScoreCard({ player, idx }) {
  idx = idx + 1;

  const { name, totalPoints, houseName } = player[1]

  return (
    <div className={styles.container}>
      <h1 className={styles.name}>{name}</h1>
      <div className={styles.points}>{totalPoints}</div>
      <div className={styles.houseContainer}>
        <div className={styles.label}>haus of</div>
        <div className={styles.houseName}>{houseName}</div>
      </div>
    </div>
  );
};