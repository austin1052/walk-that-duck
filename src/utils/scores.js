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