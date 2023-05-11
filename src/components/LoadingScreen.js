// import logo from "../assets/ducky-that-walk-logo.png"
import logo from "../assets/walk-that-duck-logo.png"

import styles from "../styles/LoadingScreen.module.css"

export default function LoadingScreen() {
  return (
    <div className={styles.container}>
      <img src={logo} className={styles.logo} alt="ducky that walk" />
      <div className={styles.duck}>🦆</div>
    </div>
  )
}