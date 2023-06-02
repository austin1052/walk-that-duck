// need to comment out styles import and pointButtonStyles in data.js for this to run 

import { ref, set } from "firebase/database"
import { db } from "../src/config/index.js"
// import { db } from "../src/config/local.js"
import { queenData, players, currentSeason, episodeDates } from "../src/utils/data.js";
import { createNewPlayer } from "../src/utils/db.js";

function buildDB() {
  createInitialQueens(queenData);
  createTestPlayers(players);
  // addPreviousWeeksPoints(previousWeeksPoints);
}

function createInitialQueens(queenData) {
  const queenIDs = Object.keys(queenData);
  queenIDs.forEach((queenID) => {
    const { name, active } = queenData[queenID]
    const firstEpisodeDate = episodeDates[0]
    set(ref(db, currentSeason + '/queens/' + queenID), {
      name,
      active,
    })
    set(ref(db, currentSeason + '/queenPoints/' + queenID), {
      [firstEpisodeDate]: 0
      // 1: 0
    })
  }
  )
}

function createTestPlayers(players) {
  console.log(players);
  players.forEach(playerData => {
    createNewPlayer(playerData)
  })
}

// function addPreviousWeeksPoints(previousWeeksPoints) {
//   // loop through array of weeks and queen points 
//   // [ ["027", [{id, points}, {id, points}, {id, points}] ] ]
//   previousWeeksPoints.forEach(week => {
//     const date = week[0]
//     const queens = week[1]
//     const updatedQueens = updateWeeklyPoints(queens, date)
//     console.log(updatedQueens);
//   })
// }

buildDB();