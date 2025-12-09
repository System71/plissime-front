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
        <div className={styles["button-choice"]}>
          <button
            type="button"
            className="planning-button"
            onClick={() => setChoice("planning")}
            style={{ backgroundColor: choice == "planning" && "#a8c6cc" }}
          >
            Planning
          </button>
          <button
            type="button"
            className="sessions-button"
            onClick={() => setChoice("sessions")}
            style={{ backgroundColor: choice == "sessions" && "#a8c6cc" }}
          >
            Sessions
          </button>
        </div>
        {choice == "planning" ? (
          <Calendar
            token={token}
            openSessionDisplay={openSessionDisplay}
            setOpenSessionDisplay={setOpenSessionDisplay}
            setSessionID={setSessionID}
          />
        ) : (
          <Sessions
            token={token}
            addSessionDisplay={addSessionDisplay}
            setAddSessionDisplay={setAddSessionDisplay}
            openSessionDisplay={openSessionDisplay}
            setOpenSessionDisplay={setOpenSessionDisplay}
            setSessionID={setSessionID}
            sessionsList={sessionsList}
            setSessionsList={setSessionsList}
          />
        )}
      </div>
    );
  } else {
    return <Unregistered />;
  }
};

export default Planning;
