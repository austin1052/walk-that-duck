import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { updateWeeklyPoints } from '../../utils/db.js'
import { parseDate } from '../../utils/index.js'
import styles from "../../styles/Admin/Header.module.css"

export default function AdminHeader({ allQueens, setAllQueens, setConfirmScoresOpen }) {

  const week = useQuery()
  const formatedWeek = parseDate(week)

  function useQuery() {
    const { search } = useLocation();
    const query = useMemo(() => new URLSearchParams(search), [search]);
    return query.get("week")
  }

  function submitPoints() {
    const updatedQueensList = updateWeeklyPoints(allQueens, week)
    console.log({ updatedQueensList });
    setAllQueens(updatedQueensList)
    // setConfirmScoresOpen(true)
  }

  return (
    <div className={styles.container}>
      <h1>Episode Date: {formatedWeek}</h1>
      <div className={styles.submit} onClick={submitPoints} role="button" aria-label="submit points">Submit Points</div>
    </div>
  )
}
