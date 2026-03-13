/* eslint-disable react/prop-types */
import styles from "./planning.module.css";
import Calendar from "../../components/Calendar/Calendar";
import Unregistered from "../../components/Unregistered/Unregistered";
import planningPreview from "../../assets/planning_preview.png";

const Planning = ({
  token,
  addSessionDisplay,
  setAddSessionDisplay,
  openSessionDisplay,
  setOpenSessionDisplay,
  setSessionID,
  sub,
}) => {
  if (sub) {
    return (
      <div className={styles["planning-sessions"]}>
        <Calendar
          token={token}
          openSessionDisplay={openSessionDisplay}
          setOpenSessionDisplay={setOpenSessionDisplay}
          setSessionID={setSessionID}
          addSessionDisplay={addSessionDisplay}
          setAddSessionDisplay={setAddSessionDisplay}
        />
      </div>
    );
  } else {
    return (
      <div className={styles.preview}>
        <Unregistered />
        <img
          src={planningPreview}
          alt="planning preview"
          className={styles.imgPreview}
        />
      </div>
    );
  }
};

export default Planning;
