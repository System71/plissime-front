/* eslint-disable react/prop-types */
import styles from "./program-item.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProgramItem = ({ title, duration, notes, nbCustomer, onClick }) => {
  return (
    <div className={styles["program-item"]} onClick={onClick}>
      <div className={styles["title"]}>
        <p>{title}</p>
      </div>
      <div className={styles["info"]}>
        <p>{duration} sessions</p>
      </div>
      <div className={styles["info"]}>
        <p>
          Élèves attachés à ce programme :&nbsp;
          <span style={{ color: "#e67e22", fontWeight: 600 }}>
            {nbCustomer}
          </span>
        </p>
      </div>
      <div className={styles["info"]}>
        <p>Voir / Modifier</p>
      </div>
    </div>
  );
};

export default ProgramItem;
