/* eslint-disable react/prop-types */
import styles from "./sessions-paid.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import CustomerSessionItemMin from "../CustomerSessionItemMin/CustomerSessionItemMin";

const SessionsPaid = ({
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
          `${import.meta.env.VITE_API_URL}/sessions/customer/paid`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
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
    <div className={styles.container}>
      <h2>Sessions réglées</h2>
      {isLoading ? (
        <p>En chargement</p>
      ) : data[0] ? (
        <div className={styles.content}>
          {data.map((session, index) => {
            return (
              <CustomerSessionItemMin
                setSessionID={setSessionID}
                openSessionDisplay={openSessionDisplay}
                setOpenSessionDisplay={setOpenSessionDisplay}
                id={session._id}
                title={session.title}
                name={session.coach.name}
                date={session.start}
                price={session.price}
                state={session.state}
                coachId={session.coach}
                key={String(session._id)}
                index={index}
              />
            );
          })}
        </div>
      ) : (
        <p>Pas de session réglée à ce jour</p>
      )}
    </div>
  );
};

export default SessionsPaid;
