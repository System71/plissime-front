/* eslint-disable react/prop-types */
import styles from "./program-item-customer.module.css";

const ProgramItemCustomer = ({ title, duration, progress, onClick }) => {
  return (
    <div className={styles["program-item"]} onClick={onClick}>
      <div className={styles["title"]}>
        <p>{title}</p>
      </div>
      <div className={styles["info"]}>
        <p>
          {progress} / {duration} sessions terminées
        </p>
      </div>
      <div className={styles["info"]}>
        <p>Voir</p>
      </div>
    </div>
  );
};

export default ProgramItemCustomer;
