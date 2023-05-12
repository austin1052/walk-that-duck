import { useState, useEffect } from 'react';
import { createNewPlayer } from '../utils/db.js';
import QueenSelection from '../components/QueenSelection.js'
import { options } from '../utils/data.js'
import { useNavigate } from 'react-router-dom';
import Image from '../components/Image.js';
import styles from '../styles/CreatePlayer.module.css';

export default function CreatePlayer({ allQueensData }) {
  const [queensList, setQueensList] = useState([]);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [houseName, setHouseName] = useState("");
  const [menuOpen, setMenuOpen] = useState({ player: false, slayer: false, winner: false })
  const [formStep, setFormStep] = useState(1)

  const navigate = useNavigate();

  let userFormCSS, queenFormCSS, confirmFormCSS;

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

  function handleChooseQueens(event) {
    event.preventDefault();
    setFormStep(2)
  }

  function handleReview(event) {
    event.preventDefault();
    const queens = setPlayerQueens();
    if (queens.length !== 6) {
      alert("check queen selection")
      return
    }
    setFormStep(3)
  }

  function handleSubmit(event) {
    event.preventDefault();
    const queens = setPlayerQueens();
    const playerData = {
      username, name, houseName, queens
    }
    createNewPlayer(playerData);
    resetForm();
    navigate("/create-player-success")
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
    if (formStep === 1) {
      userFormCSS = `${styles.inputContainer}`;
      queenFormCSS = `${styles.inputContainer} ${styles.hiddenRight}`;
      confirmFormCSS = `${styles.inputContainer} ${styles.hiddenRight}`;
    }
    if (formStep === 2) {
      userFormCSS = `${styles.inputContainer} ${styles.hiddenLeft}`;
      queenFormCSS = `${styles.inputContainer}`;
      confirmFormCSS = `${styles.inputContainer} ${styles.hiddenRight}`;
    }
    if (formStep === 3) {
      userFormCSS = `${styles.inputContainer} ${styles.hiddenLeft}`;
      queenFormCSS = `${styles.inputContainer} ${styles.hiddenLeft}`;
      confirmFormCSS = `${styles.inputContainer}`;
    }
  }

  function toggleForm(event) {

    event.preventDefault();
    setFormStep((current) => {
      return current - 1
    })
  }

  setFormPosition();

  return (
    <div className="page-container">
      <div className={styles.container} >
        <form className={styles.form}>

          <div className={userFormCSS}>
            <label htmlFor="username" aria-label="username">username</label>
            <input type="text" id="username" name="username" value={username} onChange={usernameChangeHandler} placeholder="username" />
            <label htmlFor="first-name" aria-label="first name">first name</label>
            <input type="text" id="first-name" name="first-name" value={name} onChange={nameChangeHandler} placeholder="first name" />
            <label htmlFor="house-name" aria-label="house name">house name</label>
            <input type="text" id="house-name" name="house-name" value={houseName} onChange={houseNameChangeHandler} placeholder="house name" />
            <div className={styles.buttons}>
              <div className={styles.submitButton} onClick={handleChooseQueens} role="button" aria-label="team selection">choose team</div>
            </div>
          </div>

          <div className={queenFormCSS}>
            <QueenSelection queensList={queensList} setQueensList={setQueensList} options={options.playerOptions} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <QueenSelection queensList={queensList} setQueensList={setQueensList} options={options.slayerOptions} />
            <QueenSelection queensList={queensList} setQueensList={setQueensList} options={options.winnerOptions} />
            <div className={styles.buttons}>
              <div className={styles.backButton} onClick={toggleForm}></div>
              <div className={styles.submitButton} onClick={handleReview} role="button" aria-label="create team">review team</div>
            </div>
          </div>

          <div className={confirmFormCSS}>
            <div className={styles.displayName}>{name}</div>
            <div className={styles.displayHouseName}>{houseName}</div>
            <div className={styles.categoryHeader}>Winner</div>
            {
              queensList && queensList.map(queen => {
                if (queen.selected.winner) {
                  return (
                    <div className={styles.queenConfirmCard}>
                      <Image queen={queen} />
                      <div>
                        {queen.name}
                      </div>
                    </div>
                  )
                }
                return null
              })
            }
            <div className={styles.categoryHeader}>Slayers</div>
            {
              queensList && queensList.map(queen => {
                if (queen.selected.slayer) {
                  return (
                    <div className={styles.queenConfirmCard}>
                      <Image queen={queen} />
                      <div>
                        {queen.name}
                      </div>
                    </div>
                  )
                }
                return null
              })
            }

            <div className={styles.categoryHeader}>Players</div>
            {
              queensList && queensList.map(queen => {
                if (queen.selected.player) {
                  return (
                    <div className={styles.queenConfirmCard}>
                      <Image queen={queen} />
                      <div>
                        {queen.name}
                      </div>
                    </div>
                  )
                }
                return null
              })
            }
            <div className={styles.buttons}>
              <div className={styles.backButton} onClick={toggleForm}></div>
              <div className={styles.submitButton} onClick={handleSubmit} role="button" aria-label="create team">create team</div>
            </div>
          </div>
        </form>
      </div >
    </div>
  );
};