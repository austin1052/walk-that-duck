import { db } from '../config/index.js';
import { ref, onValue } from "firebase/database";
import { currentSeason } from '../utils/data.js';

export function getQueensTotalPoints(data, queens) {
  const queenIDs = Object.keys(data)
  queenIDs.forEach((id) => {
    const weeklyPoints = data[id]
    const pointsList = Object.values(weeklyPoints)
    if (pointsList.length === 1) {
      const totalPoints = pointsList[0]
      queens[id] = {
        ...queens[id],
        totalPoints: totalPoints,
        prevWeekTotalPoints: totalPoints
      }
    }
    if (pointsList.length === 2) {
      const totalPoints = pointsList[0] + pointsList[1]
      const prevWeekTotalPoints = pointsList[0]
      queens[id] = {
        ...queens[id],
        totalPoints,
        prevWeekTotalPoints
      }
    }
    if (pointsList.length > 2) {
      const curWeekPoints = pointsList.pop();
      const prevWeekPointTotal = pointsList.reduce((acc, cur) => acc + cur)
      const allWeekPointTotal = prevWeekPointTotal + curWeekPoints
      queens[id] = {
        ...queens[id],
        totalPoints: allWeekPointTotal,
        prevWeekTotalPoints: prevWeekPointTotal
      }
    }
  })
  return queens
}

export function calculatePlayerPoints(queenData) {
  console.log("AHHH");
  const playersRef = ref(db, currentSeason + "/players/")
  const playerQueensRef = ref(db, currentSeason + "/playerQueens/")

  let playerData;

  onValue(playersRef, (snapshot) => {
    if (snapshot.exists()) {
      playerData = snapshot.val();
    }
  }
  )
  console.log("Hey", playerData);

  const players = {};

  onValue(playerQueensRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val()
      // data = array of {queenId: multiplier}
      const playerIDs = Object.keys(data)
      playerIDs.forEach(playerID => {
        let playerTotalPoints = 0
        const playerQueens = []
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
              playerQueens[queenID] = adjustedPoints
            }
          })
        }
        players[playerID] = { totalPoints: playerTotalPoints, playerQueens }
      })
    }
  })

  console.log(players);
  return "hey"
}

// export function calculatePlayerPoints(queenData) {
//   const playerQueensRef = ref(db, currentSeason + "/playerQueens/")
//   const players = {};
//   onValue(playerQueensRef, (snapshot) => {
//     if (snapshot.exists()) {
//       const data = snapshot.val()
//       // data = array of {queenId: multiplier}
//       const playerIDs = Object.keys(data)
//       playerIDs.forEach(playerID => {
//         let playerTotalPoints = 0
//         const playerQueens = []
//         if (queenData === undefined) {
//           playerTotalPoints = 0
//         } else {
//           const queens = data[playerID]
//           const queenIDs = Object.keys(queens)
//           queenIDs.forEach(queenID => {
//             if (queenData[queenID] === undefined) {
//               playerTotalPoints = 0
//             } else {
//               const multiplier = queens[queenID]
//               const queenTotalPoints = queenData[queenID].totalPoints
//               const adjustedPoints = queenTotalPoints * multiplier
//               playerTotalPoints += adjustedPoints
//               playerQueens[queenID] = adjustedPoints
//             }
//           })
//         }
//         players[playerID] = { totalPoints: playerTotalPoints, playerQueens }
//       })
//     }
//   })
//   console.log(players);
//   return players
// }

export function getPlayerInfo() {
  const players = {}
  const playersRef = ref(db, currentSeason + "/players/")
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
  })
  console.log(players);
  return players
}