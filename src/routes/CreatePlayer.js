import { useState, useEffect } from 'react';
import styles from '../styles/CreatePlayer.module.css';
import { createNewPlayer } from '../utils/db.js';
import QueenSelection from '../components/QueenSelection.js'
import { options } from '../utils/data.js'
import { useNavigate } from 'react-router-dom';

export default function CreatePlayer({ allQueensData }) {
  const [queensList, setQueensList] = useState([]);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [houseName, setHouseName] = useState("");
  const [userFormActive, setUserFormActive] = useState(true);
  const [menuOpen, setMenuOpen] = useState({ player: false, slayer: false, winner: false })

  const navigate = useNavigate();

  let userFormCSS, queenFormCSS;

  useEffect(() => {
    const queenIDs = Object.keys(allQueensData);
    const queens = []
    queenIDs.forEach((id) => {
      queens.push({
        id,
        name: allQueensData[id].name,
        selected: {
          winner: false,
          slayer: false,
          player: false
        }
      });
    })
    setQueensList(queens);
  }, [allQueensData])

  //returns [[queenID, multiplier]] ---> [["marciax3", 2], ["mbdf", 1]]
  function setPlayerQueens() {
    const playerQueens = [];
    queensList.forEach(queen => {
      Object.keys(options).forEach(option => {
        const category = options[option].category
        if (queen.selected[category]) {
          playerQueens.push([queen.id, options[option].multiplier])
        }
      })
    })
    return playerQueens;
  }

  function resetForm() {
    setUsername("");
    setName("");
    setHouseName("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const queens = setPlayerQueens();
    const playerData = {
      username, name, houseName, queens
    }

    createNewPlayer(playerData);
    resetForm();
    navigate("/scores")
  }

  function usernameChangeHandler(event) {
    event.preventDefault();
    setUsername(event.target.value);
  };

  function nameChangeHandler(event) {
    event.preventDefault();
    setName(event.target.value);
  };

  function houseNameChangeHandler(event) {
    event.preventDefault();
    setHouseName(event.target.value);
  };

  function setFormPosition() {
    if (userFormActive) {
      userFormCSS = `${styles.inputContainer}`;
      queenFormCSS = `${styles.inputContainer} ${styles.queenForm} ${styles.hiddenRight}`
    }
    if (!userFormActive) {
      userFormCSS = `${styles.inputContainer} ${styles.hiddenLeft}`;
      queenFormCSS = `${styles.inputContainer} ${styles.queenForm}`
    }
  }

  function toggleForm(event) {
    event.preventDefault();
    setUserFormActive(!userFormActive);
  }

  setFormPosition();

  return (
    <div className="page-container">
      <div className={styles.container} >
        <form className={styles.form}>
          <div className={userFormCSS}>
            <label htmlFor="username" aria-label="username"></label>
            <input type="text" id="username" name="username" value={username} onChange={usernameChangeHandler} placeholder="Username" />
            <label htmlFor="first-name" aria-label="first name"></label>
            <input type="text" id="first-name" name="first-name" value={name} onChange={nameChangeHandler} placeholder="First Name" />
            <label htmlFor="house-name" aria-label="house name"></label>
            <input type="text" id="house-name" name="house-name" value={houseName} onChange={houseNameChangeHandler} placeholder="House Name" />
            <div className={styles.buttons}>
              <div className={styles.submitButton} onClick={toggleForm} role="button" aria-label="team selection">Choose Team</div>
            </div>
          </div>
          <div className={queenFormCSS}>
            <QueenSelection queensList={queensList} setQueensList={setQueensList} options={options.playerOptions} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <QueenSelection queensList={queensList} setQueensList={setQueensList} options={options.slayerOptions} />
            <QueenSelection queensList={queensList} setQueensList={setQueensList} options={options.winnerOptions} />
            <div className={styles.buttons}>
              <div className={styles.backButton} onClick={toggleForm}></div>
              <div className={styles.submitButton} onClick={handleSubmit} role="button" aria-label="create team">Create Team</div>
            </div>
          </div>
        </form>
      </div >
    </div>
  );
};