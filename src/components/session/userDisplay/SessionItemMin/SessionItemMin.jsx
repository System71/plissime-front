/* eslint-disable react/prop-types */
import styles from "./session-item-min.module.css";
import { format } from "date-fns";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SessionItemMin = ({
  setSessionID,
  openSessionDisplay,
  setOpenSessionDisplay,
  id,
  title,
  name,
  date,
  index,
}) => {
  const heure = format(date, "HH:mm");
  const formatedDate = format(date, "dd/LL/yyyy");

  return (
    <div className={styles["container"]} key={index}>
      <p>{name}</p>
      <p>{title}</p>
      <p style={{ fontWeight: 600 }}>
        {formatedDate} à {heure}
      </p>
      <div
        className={styles["session-icon"]}
        onClick={() => {
          setOpenSessionDisplay(!openSessionDisplay);
          setSessionID(id);
        }}
      >
        {/* <FontAwesomeIcon icon="magnifying-glass" color="#E67E22" /> */}
      </div>
    </div>
  );
};

export default SessionItemMin;
