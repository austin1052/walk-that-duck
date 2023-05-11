import { episodeDates } from "./data.js"

export function getWeek(currentWeek) {
  const weeks = Object.keys(episodeDates)
  let week
  weeks.forEach((w) => {
    if (episodeDates[w] === currentWeek) {
      week = w
    }
  }
  )
  return week
}

export function getDate() {
  const newDate = new Date()
  const day = newDate.getDate().toString()
  const month = newDate.getMonth().toString()
  const date = month + day
  return date
}