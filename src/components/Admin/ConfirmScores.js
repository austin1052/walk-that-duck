import { useMemo } from 'react'
import QueenInfoCard from "../QueenInfoCard.js"
import { updateWeeklyPoints } from '../../utils/db.js'
import { useLocation } from 'react-router-dom'
import styles from '../../styles/Admin/ConfirmScores.module.css'

export default function ConfirmScores({ setConfirmScoresOpen, setAllQueens, allQueens }) {

  const week = useQuery()

  function useQuery() {
    const { search } = useLocation();
    const query = useMemo(() => new URLSearchParams(search), [search]);
    return query.get("week")
  }

  function submitPoints() {
    const updatedQueensList = updateWeeklyPoints(allQueens, week);
    console.log({ updatedQueensList });
    setAllQueens(updatedQueensList);
    setConfirmScoresOpen(false);
  }

  function closeReviewPoints() {
    setConfirmScoresOpen(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={`${styles.queenContainer} ${styles.header}`}>
          <div>Queen</div>
          <div></div>
          <div>Total</div>
        </div>
        {
          allQueens && allQueens.map((queen) => {
            const { currentWeekPoints, points } = queen
            console.log(queen);
            const updatedPoints = currentWeekPoints + points
            if (points > 0 || queen.selected.bottom) {
              return (
                <div className={styles.queenContainer}>
                  {/* <div className={styles.queenName}>{name}</div> */}
                  <QueenInfoCard queen={queen} />
                  {/* <div>{currentWeekPoints}</div> */}
                  <div className={`${styles.points} ${styles.newPoints}`}>+ {points}</div>
                  <div className={`${styles.points} ${styles.totalPoints}`}>{updatedPoints}</div>
                </div>
              )
            }
            if (queen.selected.eliminated) {
              return (
                <>
                  <div className={styles.queenContainer}>
                    <div className={styles.cross}></div>
                    <QueenInfoCard queen={queen} />
                    <div></div>
                    <div className={`${styles.points} ${styles.totalPoints}`}>{updatedPoints}</div>
                  </div>
                </>
              )
            }
            return null
          })
        }
        {/* <h1>confirm scores</h1> */}
        <footer className={styles.footer}>
          <div className={`${styles.button} ${styles.cancel}`} onClick={closeReviewPoints} role="button" aria-label="close review points">Cancel</div>
          <div className={`${styles.button} ${styles.submit}`} onClick={submitPoints} role="button" aria-label="submit points">Submit Points</div>
        </footer>

      </div>
    </div>
  )
}