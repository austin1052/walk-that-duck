import QueenImage from "./QueenImage";
import styles from "../styles/index.module.css";

const QueenInfoCard = ({ queen }: any) => {
  // console.log(queen);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <QueenImage queen={queen} />
        </div>
        <div className={styles.queenName}>
          <div>{queen.name}</div>
        </div>
      </div>
    </>
  );
};

export default QueenInfoCard;
