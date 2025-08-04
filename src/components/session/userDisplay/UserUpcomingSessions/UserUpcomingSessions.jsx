/* eslint-disable react/prop-types */
import "./user-upcoming-sessions.css";
import axios from "axios";
import { useState, useEffect } from "react";
import SessionItemMin from "../SessionItemMin/SessionItemMin";

const UserUpcomingSessions = ({
  token,
  setSessionID,
  openSessionDisplay,
  setOpenSessionDisplay,
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/sessions/user/upcoming`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="user-upcoming-sessions-container">
      <h2>SESSIONS À VENIR</h2>
      {isLoading ? (
        <p>En chargement</p>
      ) : data[0] ? (
        <div className="user-session-item-list">
          {data.map((session, index) => {
            return (
              <SessionItemMin
                setSessionID={setSessionID}
                openSessionDisplay={openSessionDisplay}
                setOpenSessionDisplay={setOpenSessionDisplay}
                id={session._id}
                title={session.title}
                name={session.customer.name}
                date={session.start}
                key={String(session._id)}
                index={index}
              />
            );
          })}
        </div>
      ) : (
        <p>Pas de session à venir</p>
      )}
    </div>
  );
};

export default UserUpcomingSessions;
