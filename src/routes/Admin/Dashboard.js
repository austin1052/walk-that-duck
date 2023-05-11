import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { weekValues } from '../../utils/data.js'
import styles from '../../styles/CreatePlayer.module.css'
import dropdownStyles from '../../styles/Form/Dropdown.module.css'
import WeeklistItem from '../../components/Admin/WeekListItem.js'

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(['Select Week'])

  const navigate = useNavigate()

  function toggleSelectMenu() {
    setMenuOpen(!menuOpen)
  }

  function handleSubmit() {
    if (selectedWeek[1]) {
      const route = `/admin/scores?week=${selectedWeek[1]}`
      navigate(route)
    } else {
      alert("Please select a week")
    }
  }

  const label = "select week"

  return (
    <div className="page-container">
      <div className={styles.container} >
        <form className={styles.form}>
          <div className={styles.inputContainer}>
            <label htmlFor="Select week"></label>
            <div className={dropdownStyles.selectButton} onClick={toggleSelectMenu} aria-label={label}>
              <div aria-label={label} className={dropdownStyles.buttonText}>{selectedWeek[0]}</div>
              <span className={menuOpen ? `${dropdownStyles.selectArrow} ${dropdownStyles.open}` : `${dropdownStyles.selectArrow}`}></span>
            </div>
            <div className={dropdownStyles.listContainer}>
              <ul className={menuOpen ? `${dropdownStyles.listItems} ${dropdownStyles.weekListItems} ${dropdownStyles.menuOpen}` : `${dropdownStyles.listItems} ${dropdownStyles.weekListItems}`} aria-label="list of queens">
                {
                  weekValues.map((week) => {
                    return (
                      <WeeklistItem week={week} selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek} setMenuOpen={setMenuOpen} />
                    )
                  })
                }
              </ul>
            </div>
            <div className={styles.buttons}>
              <div className={styles.submitButton} onClick={handleSubmit} role="button" aria-label="create team">Adjust Points</div>
            </div>
          </div>
        </form>
      </div>

    </div>
  )
}

// className={dropdownStyles.selectButton}
// aria-selected={queen.selected[category]}
// role="option"