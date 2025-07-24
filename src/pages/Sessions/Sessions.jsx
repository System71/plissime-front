/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./sessions.css";
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

  useEffect(() => {
    if (token) {
      updateSessionsList(setSessionsList, token, searchCustomer);
    }
  }, [token, searchCustomer, addSessionDisplay]);

  return (
    <>
      <div
        className="addSessions"
        onClick={() => {
          setAddSessionDisplay(!addSessionDisplay);
        }}
      >
        <p>Ajouter une session</p>
        <div className="arrow-circle">
          <img className="arrow" src={arrow} alt="arrow" />
          <div className="plus-container">
            <img className="circle" src={circle} alt="circle" />
            <FontAwesomeIcon
              className="plus-circle"
              icon="plus-circle"
              color="#E67E22"
              size="4x"
            />
          </div>
        </div>
      </div>
      <div className="session-filter">
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
      </div>
      <div className="session-list">
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
    </>
  );
};

export default Sessions;
