/* eslint-disable react/prop-types */
import "./planning.css";
import Calendar from "../../components/Calendar/Calendar";
import { useState } from "react";
import Sessions from "../Sessions/Sessions";

const Planning = ({
  token,
  addSessionDisplay,
  setAddSessionDisplay,
  openSessionDisplay,
  setOpenSessionDisplay,
  setSessionID,
  sessionsList,
  setSessionsList,
}) => {
  const [choice, setChoice] = useState("planning");

  return (
    <div className="planning-sessions">
      <div className="button-choice">
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
        <Calendar />
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
};

export default Planning;
