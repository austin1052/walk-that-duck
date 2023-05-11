import { useState, useEffect } from 'react';
import ListItem from "./ListItem.js";
import { countSelected } from '../utils/index.js';
import dropdownStyles from '../styles/Form/Dropdown.module.css'

export default function QueenSelection({ queensList, setQueensList, options }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [checkCount, setCheckCount] = useState(0);

  const { category, label, max } = options;

  function toggleSelectMenu() {
    setMenuOpen(!menuOpen)
  }

  useEffect(() => {
    setCheckCount(countSelected(queensList, category));
  }, [queensList, category])

  return (
    <>
      <label htmlFor="Select players"></label>
      <div className={dropdownStyles.selectButton} onClick={toggleSelectMenu} aria-label={label}>
        <div aria-label={label} className={dropdownStyles.buttonText}>{label}</div>
        <span className={menuOpen ? `${dropdownStyles.selectArrow} ${dropdownStyles.open}` : `${dropdownStyles.selectArrow}`}></span>
      </div>
      <div className={dropdownStyles.listContainer}>
        <ul className={menuOpen ? `${dropdownStyles.listItems} ${dropdownStyles.menuOpen}` : `${dropdownStyles.listItems}`} aria-label="list of queens">
          {
            queensList.map((queen) => {
              return <ListItem queen={queen} key={queen.id} setQueensList={setQueensList} checkCount={checkCount} max={max} category={category} />
            })
          }
        </ul>
      </div>
    </>

  );
};