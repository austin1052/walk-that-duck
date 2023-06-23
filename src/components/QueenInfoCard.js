import Image from '../components/Image.js';
// import styles from '../styles/CreatePlayer.module.css';
import styles from '../styles/Scores/QueenInfoCard.module.css'

const QueenInfoCard = ({ queen }) => {

  // console.log(queen);
  return (
    <>
      <div className={styles.queenConfirmCard}>
        <div className={styles.imageContainer}>
          <Image queen={queen} />
        </div>
        <div className={styles.queenInfo}>
          <div>
            {queen.name}
          </div>
        </div>
      </div>
    </>
  );
};

export default QueenInfoCard;