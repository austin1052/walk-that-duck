
import styles from "../../styles/Form/Dropdown.module.css"

export default function WeeklistItem({ week, selectedWeek, setSelectedWeek, setMenuOpen }) {

  const itemStyle = selectedWeek[1] === week[1] ? `${styles.listItem} ${styles.checked}` : `${styles.listItem}`

  function toggleChecked() {
    console.log('click');
    if (selectedWeek[1] === week[1]) {
      setSelectedWeek(['Select Week'])
    } else {
      setSelectedWeek(week)
    }
    setMenuOpen(false)
  }
  console.log(selectedWeek);
  return (
    <li className={itemStyle} onClick={toggleChecked} aria-label={week[0]}>
      <span className={styles.checkbox}></span>
      <span className={styles.itemText}>{week[0]}</span>
    </li >
  )
}