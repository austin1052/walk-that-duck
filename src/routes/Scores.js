import { useState, useEffect, useContext } from 'react';
import Card from "../components/Scores/Card.js"
import List from "../components/Scores/List.js"
import { db } from '../config/index.js';
// import { db } from '../config/local.js';
import { ref, onValue } from "firebase/database";
import styles from '../styles/Scores/Scores.module.css'
import { mergeSort } from "../utils/index.js";
import { MobileContext } from "../context/MobileContext.js"
import { getQueensTotalPoints } from '../utils/scores.js';

export default function Scores({ allQueensData }) {
  const [allQueens, setAllQueens] = useState()
  const [playerInfo, setPlayerInfo] = useState()
  const [playerPoints, setPlayerPoints] = useState()
  const [topThreePlayers, setTopThreePlayers] = useState([])
  const [otherPlayers, setOtherPlayers] = useState([])
  const isMobile = useContext(MobileContext)


  // creates queen list, gets list and their total points
  useEffect(() => {
    const queenIDs = Object.keys(allQueensData)
    const queens = {}
    queenIDs.forEach((id) => {
      const { name, active } = allQueensData[id]
      queens[id] = {
        name, active
      }
    })

    const queensRef = ref(db, "queenPoints/")
    onValue(queensRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const queenData = getQueensTotalPoints(data, queens)
        calculatePlayerPoints(queenData)
        setAllQueens(queenData)
      }
    })

  }, [allQueensData])

  // gets and sets playerInfo
  useEffect(() => {
    const players = {}
    const playersRef = ref(db, "players/")
    onValue(playersRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        const playerIDs = Object.keys(data)
        playerIDs.forEach(id => {
          const { name, houseName } = data[id]
          players[id] = {
            name, houseName
          }
        })
      }
      setPlayerInfo(players)
    })
  }, [])

  // combines playerInfo and playerPoints, set allPlayers, set topThree and otherPlayers
  useEffect(() => {
    if (playerInfo !== undefined && playerPoints !== undefined) {
      const combinedPlayers = {};
      const playerIDs = Object.keys(playerInfo)
      playerIDs.forEach(id => {
        const updatedPlayer = { ...playerInfo[id], ...playerPoints[id] }
        combinedPlayers[id] = updatedPlayer
      })
      const array = Object.entries(combinedPlayers)
      const sortedData = mergeSort(array)
      setTopThreePlayers(sortedData.slice(0, 3))
      setOtherPlayers(sortedData.slice(3))
    }
  }, [playerInfo, playerPoints, isMobile, allQueens])

  // gets players queen list, calculates their total points, sets playerPoints
  function calculatePlayerPoints(queenData) {
    const playerQueensRef = ref(db, "playerQueens/")
    onValue(playerQueensRef, (snapshot) => {
      const players = {};
      if (snapshot.exists()) {
        const data = snapshot.val()
        const playerIDs = Object.keys(data)
        playerIDs.forEach(playerID => {
          let playerTotalPoints = 0
          if (queenData === undefined) {
            playerTotalPoints = 0
          } else {
            const queens = data[playerID]
            const queenIDs = Object.keys(queens)
            queenIDs.forEach(queenID => {
              if (queenData[queenID] === undefined) {
                playerTotalPoints = 0
              } else {
                const multiplier = queens[queenID]
                const queenTotalPoints = queenData[queenID].totalPoints
                const adjustedPoints = queenTotalPoints * multiplier
                playerTotalPoints += adjustedPoints
              }
            })
          }
          players[playerID] = { totalPoints: playerTotalPoints }
        })
        setPlayerPoints(players)
      }
    })
  }

  return (
    <div className="page-container">
      <div className={styles.container}>
        {/* <div className={styles.headerContainer}>
          <h1>Top Three</h1>
        </div> */}
        <div className={styles.topThreeContainer}>
          {
            (topThreePlayers && !isMobile) &&
            topThreePlayers.map((player, idx) => {
              return (
                <Card player={player} key={player[0]} idx={idx} />
              )
            })
          }
        </div>
        <div className={`${styles.listContainer} ${styles.topThreeListContainer}`}>
          {
            (topThreePlayers && isMobile) &&
            topThreePlayers.map((player, idx) => {
              idx = idx + 1
              return (
                <List player={player} key={player[0]} idx={idx} isMobile={isMobile} />
              )
            })
          }
        </div>
        {/* <div className={styles.headerContainer}>
          <h1>Losers</h1>
        </div> */}
        <div className={styles.listContainer}>
          {
            (otherPlayers) &&
            otherPlayers.map((player, idx) => {
              idx = idx + 4;
              return (
                <List player={player} key={player[0]} idx={idx} isMobile={isMobile} />
              )
            })
          }
        </div>

      </div>
    </div>
  );
};