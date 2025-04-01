/* eslint-disable react/prop-types */
import "./sessions.css";
import axios from "axios";
import { useState, useEffect } from "react";
import SessionItem from "../../components/SessionItem/SessionItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import arrow from "../../assets/arrow_button.png";
import circle from "../../assets/circle.png";

const Sessions = ({ token, addSessionDisplay, setAddSessionDisplay }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/sessions`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="content">
      <h1>VOS SESSIONS</h1>
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
      <div className="session-list">
        {data.map((session, index) => {
          return (
            <SessionItem
              title={session.title}
              name={session.customer.name}
              firstName={session.customer.firstName}
              date={session.start}
              key={String(session._id)}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sessions;
