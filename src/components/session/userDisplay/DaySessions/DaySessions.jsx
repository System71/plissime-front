/* eslint-disable react/prop-types */
import styles from "./day-sessions.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import SessionItemMin from "../SessionItemMin/SessionItemMin";

const DaySessions = ({
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
          `${import.meta.env.VITE_API_URL}/sessions/daily`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
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
    <div className={styles["container"]}>
      <h2>SESSIONS DU JOUR</h2>
      {isLoading ? (
        <p>En chargement</p>
      ) : data[0] ? (
        <div className={styles["session-item-list"]}>
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
        <p>Pas de session ce jour</p>
      )}
    </div>
  );
};

export default DaySessions;
