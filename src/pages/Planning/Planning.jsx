/* eslint-disable react/prop-types */
import styles from "./planning.module.css";
import Calendar from "../../components/Calendar/Calendar";
import { useState } from "react";
import Sessions from "../Sessions/Sessions";
import Unregistered from "../../components/Unregistered/Unregistered";

const Planning = ({
  token,
  addSessionDisplay,
  setAddSessionDisplay,
  openSessionDisplay,
  setOpenSessionDisplay,
  setSessionID,
  sessionsList,
  setSessionsList,
  sub,
}) => {
  const [choice, setChoice] = useState("planning");

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
    return <Unregistered />;
  }
};

export default Planning;
