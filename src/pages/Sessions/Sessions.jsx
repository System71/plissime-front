/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import styles from "./sessions.module.css";
import { useState, useEffect } from "react";
import SessionItem from "../../components/session/userDisplay/UserSessionItem/UserSessionItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import arrow from "../../assets/arrow_button.png";
import circle from "../../assets/circle.png";
import { updateSessionsList } from "../../../utils/updateData";

const Sessions = ({
  token,
  addSessionDisplay,
  setAddSessionDisplay,
  openSessionDisplay,
  setOpenSessionDisplay,
  setSessionID,
  sessionsList,
  setSessionsList,
}) => {
  const [searchCustomer, setSearchCustomer] = useState("");
  const [sessionFilter, setSessionFilter] = useState("");

  useEffect(() => {}, [token, searchCustomer, addSessionDisplay]);

  const handleChange = (event) => {
    setSessionFilter(event.target.value);
  };

  return (
    <div className={styles["content"]}>
      <div
        className={styles["addSessions"]}
        onClick={() => {
          setAddSessionDisplay(!addSessionDisplay);
        }}
      >
        <p>Ajouter une session</p>
        <div className={styles["arrow-circle"]}>
          <img className={styles["arrow"]} src={arrow} alt="arrow" />
          <div className={styles["plus-container"]}>
            <img className={styles["circle"]} src={circle} alt="circle" />
            <FontAwesomeIcon
              className={styles["plus-circle"]}
              icon="plus-circle"
              color="#E67E22"
              size="4x"
            />
          </div>
        </div>
      </div>
      <div className={styles["session-filter"]}>
        <input
          type="search"
          placeholder="Rechercher par nom"
          name="searchCustomer"
          id="searchCustomer"
          value={searchCustomer}
          onChange={(event) => {
            setSearchCustomer(event.target.value);
          }}
        />
        <FontAwesomeIcon icon="magnifying-glass" color="#E67E22" />
        <select
          name="sessionFilter"
          id="sessionFilter"
          onChange={handleChange}
        ></select>
      </div>
      <div className={styles["session-list"]}>
        {sessionsList.map((session) => {
          return (
            <SessionItem
              openSessionDisplay={openSessionDisplay}
              setOpenSessionDisplay={setOpenSessionDisplay}
              setSessionID={setSessionID}
              id={session._id}
              title={session.title}
              name={session.customer.name}
              firstName={session.customer.firstName}
              date={session.start}
              content={session.content}
              key={String(session._id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sessions;
