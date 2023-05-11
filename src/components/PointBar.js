// import { useState } from 'react'
import { isAlreadySelected } from '../utils/index.js'
import styles from '../styles/PointBar.module.css'
import { pointValues, pointButtonStyles as button } from '../utils/data.js'

export default function PointBar({ queen, setAllQueens, menuOpen }) {

  const { winner, mini, top, bottom, low, safe, eliminated } = queen.selected

  let containerStyle = menuOpen ? `${styles.container} ${styles.visible}` : `${styles.container}`

  let winnerStyle = !winner && isAlreadySelected(queen, "winner") ?
    button.winner.disabled :
    winner ? button.winner.selected :
      button.winner.normal

  let miniStyle = !mini && isAlreadySelected(queen, "mini") ?
    button.mini.disabled :
    mini ? button.mini.selected :
      button.mini.normal

  let topStyle = !top && isAlreadySelected(queen, "top") ?
    button.top.disabled :
    top ? button.top.selected :
      button.top.normal

  let bottomStyle = !bottom && isAlreadySelected(queen, "bottom") ?
    button.bottom.disabled :
    bottom ? button.bottom.selected :
      button.bottom.normal


  let lowStyle = !low && isAlreadySelected(queen, "low") ?
    button.low.disabled :
    low ? button.low.selected :
      button.low.normal

  let safeStyle = !safe && isAlreadySelected(queen, "safe") ?
    button.safe.disabled :
    safe ? button.safe.selected :
      button.safe.normal

  let eliminatedStyle = !eliminated && isAlreadySelected(queen, "eliminated") ?
    button.eliminated.disabled :
    eliminated ? button.eliminated.selected :
      button.eliminated.normal


  // function closeMenu() {
  //   const updatedQueen = { ...queen, menuOpen: false }
  //   setAllQueens((allQueens) => {
  //     return allQueens.map(q => {
  //       if (q.id !== queen.id) return q;
  //       return updatedQueen
  //     })
  //   })
  // }

  // function submitPoints() {
  //   const updatedQueen = { ...queen, menuOpen: false }
  //   setAllQueens((allQueens) => {
  //     return allQueens.map(q => {
  //       if (q.id !== queen.id) return q;
  //       return updatedQueen
  //     })
  //   })
  // }

  function updateQueen(category, selected, points) {
    const updatedSelectionValue = { ...queen.selected, [category]: selected }
    const updatedQueen = { ...queen, selected: updatedSelectionValue, points }
    return updatedQueen
  }

  function toggleButton(category) {
    let alreadySelected = isAlreadySelected(queen, category)
    let points, updatedQueen
    if (!queen.selected[category] && !alreadySelected) {
      points = queen.points + pointValues[category]
      updatedQueen = updateQueen(category, true, points)
    } else if (queen.selected[category]) {
      points = queen.points - pointValues[category]
      updatedQueen = updateQueen(category, false, points)
    } else if (alreadySelected) {
      return
    }
    setAllQueens((allQueens) => {
      return allQueens.map((q) => {
        if (q.id !== queen.id) return q
        return updatedQueen
      })
    })
  }

  return (
    <div className={containerStyle}>
      <div className={safeStyle} onClick={() => toggleButton("safe")}>
        Safe
      </div>
      <div className={topStyle} onClick={() => toggleButton("top")}>
        Top
      </div>
      <div className={winnerStyle} onClick={() => toggleButton("winner")}>
        Winner
      </div>
      <div className={lowStyle} onClick={() => toggleButton("low")}>
        Low
      </div>
      <div className={miniStyle} onClick={() => toggleButton("mini")}>
        Mini
      </div>
      <div className={bottomStyle} onClick={() => toggleButton("bottom")}>
        Bottom
      </div>
      <div className={eliminatedStyle} onClick={() => toggleButton("eliminated")}>
        Eliminated
      </div>
      {/* <div className={`${styles.submitButton} ${styles.button} `} onClick={submitPoints} role="button" aria-label="confirm adjust points">
        <div></div>
      </div>
      <div className={`${styles.cancelButton} ${styles.button} `} onClick={closeMenu} role="button" aria-label="cancel adjust points">
        <div></div>
      </div> */}
    </div >
  )
}