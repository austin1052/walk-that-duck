import Image from '../components/Image.js';
import styles from '../styles/CreatePlayer.module.css';

const QueenInfoCard = ({ queen }) => {
  return (
    <div className={styles.queenConfirmCard}>
      <Image queen={queen} />
      <div>
        {queen.name}
      </div>
    </div>
  );
};

export default QueenInfoCard;