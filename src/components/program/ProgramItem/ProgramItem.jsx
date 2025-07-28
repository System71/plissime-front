/* eslint-disable react/prop-types */
import styles from "./program-item.module.css";
import running from "../../../assets/running.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProgramItem = ({ title, duration, notes, onClick }) => {
  return (
    <div className={styles["program-item"]} onClick={onClick}>
      <div className={styles["program-content"]}>
        <div className={styles["title"]}>
          <p>{title}</p>
        </div>
        <div className={styles["info"]}>
          <FontAwesomeIcon
            className="info-picto"
            icon="calendar-days"
            color="#E67E22"
            size="xs"
          />
          <div>
            <p>{duration} sessions</p>
          </div>
        </div>
        <div className={styles["info"]}>
          <FontAwesomeIcon
            className="info-picto"
            icon="pen-to-square"
            color="#E67E22"
            size="xs"
          />
          <div>{notes}</div>
        </div>
      </div>
      <div className={styles["picto"]}>
        <img
          src={running}
          alt="session picto"
          className={styles["program-picture"]}
        />
      </div>
    </div>
  );
};

export default ProgramItem;
