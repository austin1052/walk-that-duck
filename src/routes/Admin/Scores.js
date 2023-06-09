import { useEffect, useState, useContext } from 'react'
import { db } from '../../config/index.js';
// import { db } from '../../config/local.js';
import { ref, onValue } from "firebase/database";
import { currentSeason } from '../../utils/data.js';
import AdminHeader from '../../components/Admin/Header.js'
import QueenColumn from "../../components/QueenColumn.js"
import ConfirmScores from '../../components/Admin/ConfirmScores.js'
import { MobileContext } from "../../context/MobileContext.js"
import { createColumnGroups } from '../../utils/index.js'
import styles from "../../styles/Admin/Dashboard.module.css"

export default function UpdateScores({ allQueensData }) {
  // console.log("scores", allQueensData);

  const [allQueens, setAllQueens] = useState()
  const [columnGroups, setColumnGroups] = useState()
  const [confirmScoresOpen, setConfirmScoresOpen] = useState(false)
  const [queenPoints, setQueenPoints] = useState()

  console.log(queenPoints);
  const isMobile = useContext(MobileContext)

  useEffect(() => {
    if (queenPoints !== undefined) {
      // console.log(queenPoints);
      const queenIDs = Object.keys(allQueensData)
      const queens = [];
      queenIDs.forEach((id) => {
        const pointsList = Object.values(queenPoints[id])
        const currentWeekPoints = pointsList.pop()
        console.log(currentWeekPoints);
        const { name, active } = allQueensData[id]
        if (active) {
          queens.push({
            id,
            name,
            points: 0,
            currentWeekPoints,
            menuOpen: false,
            selected: {
              winner: false,
              mini: false,
              top: false,
              safe: false,
              low: false,
              bottom: false,
              eliminated: false
            }
          })
        }
      })
      setAllQueens(queens)
    }
  }, [allQueensData, queenPoints])


  useEffect(() => {
    const columns = createColumnGroups(allQueens, isMobile)
    setColumnGroups(columns)
  }, [allQueens, isMobile])

  useEffect(() => {
    const queensRef = ref(db, currentSeason + "/queenPoints/")
    onValue(queensRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        setQueenPoints(data)
      }
    })
  }, [])


  return (
    <>
      <AdminHeader allQueens={allQueens} setAllQueens={setAllQueens} setConfirmScoresOpen={setConfirmScoresOpen} />
      {/* background-pink */}
      <div className="page-container">
        {
          confirmScoresOpen &&
          <ConfirmScores setConfirmScoresOpen={setConfirmScoresOpen} allQueens={allQueens} setAllQueens={setAllQueens} />
        }
        <div className={styles.container}>
          <div className={styles.columnContainer}>
            {columnGroups &&
              Object.keys(columnGroups).map((group, i) => {
                return (
                  <QueenColumn queens={columnGroups[group]} key={i} setAllQueens={setAllQueens} />
                )
              })}
          </div>
        </div>
      </div>
    </>

  )
}
