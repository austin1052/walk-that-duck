import styles from '../../styles/Admin/ConfirmScores.module.css'

export default function ConfirmScores({ setConfirmScoresOpen, allQueens }) {
  // console.log(allQueens);
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        {
          allQueens && allQueens.map((queen) => {
            const { name, currentWeekPoints, points } = queen
            console.log(queen);
            const updatedPoints = currentWeekPoints + points
            if (points > 0) {
              return (
                <div className={styles.queenContainer}>
                  <div>{name}</div>
                  {/* <div>{currentWeekPoints}</div> */}
                  <div>+{points}</div>
                  <div>{updatedPoints}</div>
                </div>
              )
            }
            return null
          })
        }
        {/* <h1>confirm scores</h1> */}
      </div>
    </div>
  )
}