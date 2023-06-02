import { useState } from "react";
import QueenInfoCard from '../QueenInfoCard.js';
import styles from '../../styles/Scores/List.module.css';
// import queenInfoStyles from '../../styles/Scores/QueenInfoCard.module.css'

export default function ScoreList({ player, idx, isMobile, delay }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const { name, houseName, totalPoints, playerQueens } = player[1];
  // console.log(player);

  const options = Object.keys(playerQueens)
  // console.log(option);
  // options.forEach(option => {
  //   playerQueens[option].forEach(queen => console.log(option, queen.name))
  // })

  function toggleMenu() {
    setMenuOpen(!menuOpen)
  }

  return (
    <div className={menuOpen ? `${styles.container} ${styles.menuOpen}` : `${styles.container}`} style={{ animationDelay: delay + "ms" }}>
      <div className={styles.listItem} onClick={toggleMenu}>
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
      {menuOpen && options &&
        <div className={styles.playerQueensContainer}>
          {
            isMobile &&
            <div className={styles.houseContainer}>
              <div className={styles.houseName}>{houseName}</div>
            </div>
          }
          {
            options.map(option => (
              <div key={option}>
                <h2 className={styles.categoryHeader}>{option}</h2>
                {playerQueens[option].map((queen, i) => (
                  <div className={styles.queenInfoCardContainer}>
                    {
                      !queen.active &&
                      <div className={styles.cross}></div>
                    }
                    <QueenInfoCard queen={queen} key={i} />
                    {
                      queen.points && <div className={styles.queenPoints}>{queen.points}</div>
                    }
                  </div>
                ))}
              </div>
            ))
          }
        </div>
      }
    </div>
  );
};