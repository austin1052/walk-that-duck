import { useState, useEffect, useContext } from 'react';
// import Card from "../components/Scores/Card.js"
import List from "../components/Scores/List.js"
import { db } from '../config/index.js';
// import { db } from '../config/local.js';
import { ref, onValue } from "firebase/database";
import { currentSeason } from '../utils/data.js';
import styles from '../styles/Scores/Scores.module.css'
import { mergeSort } from "../utils/index.js";
import { MobileContext } from "../context/MobileContext.js"
import { getQueensTotalPoints } from '../utils/scores.js';

export default function Scores({ allQueensData }) {
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

    if (playerInfo !== undefined) {

      const queensRef = ref(db, currentSeason + "/queenPoints/")
      onValue(queensRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          const queenData = getQueensTotalPoints(data, queens)
          calculatePlayerPoints(queenData)
        }
      })
    }

    function calculatePlayerPoints(queenData) {
      const playerQueensRef = ref(db, currentSeason + "/playerQueens/")

      onValue(playerQueensRef, (snapshot) => {
        const players = {};
        if (snapshot.exists()) {
          const data = snapshot.val()
          // data = array of {queenId: multiplier}
          const playerIDs = Object.keys(data)
          playerIDs.forEach(playerID => {
            let queenPoints = 0
            // const playerQueens = []
            const playerQueens = { winner: [], slayers: [], players: [] }
            if (queenData !== undefined) {
              const queens = data[playerID]
              const queenIDs = Object.keys(queens)
              queenIDs.forEach(queenID => {
                if (queenData[queenID] !== undefined) {
                  const multiplier = queens[queenID]
                  const { name, active, totalPoints } = queenData[queenID]
                  const adjustedPoints = totalPoints * multiplier
                  queenPoints += adjustedPoints
                  const cardData = { points: adjustedPoints, name, id: queenID, active }

                  // create list of queens for dropdown
                  if (multiplier === 1.5) {
                    playerQueens.winner.push(cardData)
                  }
                  if (multiplier === 1.25) {
                    playerQueens.slayers.push(cardData)
                  }
                  if (multiplier === 1) {
                    playerQueens.players.push(cardData)
                  }

                }
              })
            }
            const bonusPoints = playerInfo[playerID]?.bonusPoints || 0;
            const totalPoints = queenPoints + bonusPoints
            players[playerID] = { playerQueens, queenPoints, bonusPoints, totalPoints }
          })
          setPlayerPoints(players)
        }
      })
      // }
    }

  }, [allQueensData, playerInfo])

  // gets and sets playerInfo
  useEffect(() => {
    let players
    const playersRef = ref(db, currentSeason + "/players/")
    onValue(playersRef, (snapshot) => {
      if (snapshot.exists()) {
        players = snapshot.val()
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

      // turns object {playerID: {data}} into array ["playerID", {data}]
      const array = Object.entries(combinedPlayers)
      const sortedData = mergeSort(array)
      setTopThreePlayers(sortedData.slice(0, 3))
      setOtherPlayers(sortedData.slice(3))
    }
  }, [playerInfo, playerPoints, isMobile]) //allQueens

  let animationDelay = 0;

  return (
    <div className="page-container">
      <div className={styles.container}>
        <div className={styles.headerContainer}>
          <h1>Top 3 All Stars</h1>
        </div>
        {/* <div className={styles.topThreeContainer}>
          {
            (topThreePlayers && !isMobile) &&
            topThreePlayers.map((player, idx) => {
              return (
                <Card player={player} key={player[0]} idx={idx} />
              )
            })
          }
        </div> */}
        <div className={`${styles.listContainer} ${styles.topThreeListContainer}`}>
          {
            (topThreePlayers) &&
            topThreePlayers.map((player, idx) => {
              animationDelay += 100
              idx = idx + 1
              return (
                <List player={player} key={player[0]} idx={idx} isMobile={isMobile} delay={animationDelay} />
              )
            })
          }
        </div>
        <div className={styles.headerContainer} style={{ animationDelay: "400ms" }}>
          <h1>Sashay Away</h1>
        </div>
        <div className={styles.listContainer}>
          {
            (otherPlayers) &&
            otherPlayers.map((player, idx) => {
              animationDelay += 100
              idx = idx + 4;
              return (
                <List player={player} key={player[0]} idx={idx} isMobile={isMobile} delay={animationDelay} />
              )
            })
          }
        </div>

      </div>
    </div>
  );
};