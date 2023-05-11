import styles from '../../styles/Admin/ConfirmScores.module.css'

export default function ConfirmScores({ setConfirmScoresOpen, allQueens }) {

  console.log(allQueens);
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        {/* {
          allQueens && allQueens.map(queen => {
            const { id, name, currentWeekPoints, points } = queen
            if (currentWeekPoints > 0) {
              return (
                <div className={styles.queenContainer}>
                  <div>{name}</div>
                  <div>{currentWeekPoints}</div>
                  <div>{points}</div>
                </div>
              )
            }
          })
        } */}
        <h1>confirm scores</h1>
      </div>
    </div>
  )
}