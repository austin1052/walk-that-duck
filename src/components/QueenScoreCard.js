import Image from './Image.js';
import styles from '../styles/QueenScoreCard.module.css';
import PointBar from './PointBar.js';

export default function QueenScoreCard({ queen, setAllQueens }) {

  const { id, name, points, menuOpen } = queen;

  function toggleMenu() {
    // if (!queen.menuOpen) {
    const updatedQueen = { ...queen, menuOpen: !menuOpen }
    setAllQueens(queens => {
      return queens.map((q) => {
        if (q.id !== id) return q
        return updatedQueen
      })
    })
    // }
  }

  return (
    <>
      <div className={menuOpen ? `${styles.scoreCardContainer} ${styles.menuOpen}` : `${styles.scoreCardContainer}`}>
        <div className={styles.infoContainer} onClick={toggleMenu}>
          <div className={styles.imageContainer}>
            {
              queen.selected.eliminated &&
              <div className={styles.cross}></div>
            }
            <Image queen={queen} />
          </div>
          <div className={styles.queenName}>{name}</div>
        </div>
        {
          (points > 0 || queen.selected.bottom) &&
          <div className={styles.pointsContainer}>
            <div className={styles.points}>{points}</div>
          </div>
        }
        <div className={menuOpen ? `${styles.arrow} ${styles.open}` : `${styles.arrow}`}></div>
        <PointBar menuOpen={menuOpen} setAllQueens={setAllQueens} queen={queen} />
      </div>
    </>
  );
};