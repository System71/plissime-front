/* eslint-disable react/prop-types */
import "./sessions-to-paid.css";
import axios from "axios";
import { useState, useEffect } from "react";
import CustomerSessionItemMin from "../CustomerSessionItemMin/CustomerSessionItemMin";

const SessionsToPaid = ({
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
          `${import.meta.env.VITE_API_URL}/sessions/customer/topaid`,
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
    <div className="customer-upcoming-sessions-container">
      <h2>SESSIONS À RÉGLER</h2>
      {isLoading ? (
        <p>En chargement</p>
      ) : data[0] ? (
        <div className="customer-session-item-list">
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
        <p>Pas de session à régler à ce jour</p>
      )}
    </div>
  );
};

export default SessionsToPaid;
