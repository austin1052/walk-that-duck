import { isAlreadySelected } from '../utils/index.js';
import styles from '../styles/Form/Dropdown.module.css';

export default function ListItem({ queen, setQueensList, checkCount, category, max }) {

  let selectedInCategory = queen.selected[category];
  const alreadySelected = isAlreadySelected(queen);

  function toggleChecked() {
    if (!selectedInCategory && checkCount < max && !alreadySelected) {
      queen.selected[category] = true;
    }
    if (selectedInCategory) {
      queen.selected[category] = false;
    }
    setQueensList((queensList) => {
      return [...queensList]
    });
  }

  function setListItemStyle(queen) {
    let listStyle = `${styles.listItem}`;
    if (alreadySelected) {
      listStyle = `${styles.listItem} ${styles.disabled}`;
    }
    if (queen.selected[category]) {
      listStyle = `${styles.listItem} ${styles.checked}`;
    }
    if (checkCount >= max && !queen.selected[category]) {
      listStyle = `${styles.listItem} ${styles.disabled}`;
    }
    return listStyle;
  }

  const listStyle = setListItemStyle(queen);


  return (
    <li className={listStyle} onClick={toggleChecked} aria-label={queen.name} role="option" aria-selected={queen.selected[category]}>
      <span className={styles.checkbox}></span>
      <span className={styles.itemText}>{queen.name}</span>
    </li >
  );
};