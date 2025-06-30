/* eslint-disable react/prop-types */
import "./sessions-paid.css";
import axios from "axios";
import { useState, useEffect } from "react";
import CustomerSessionItem from "../CustomerSessionItem/CustomerSessionItem";

const SessionsPaid = ({token,  setSessionID,
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
              }
            );
            console.log("response=", response.data);
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
        <h2>SESSIONS RÉGLÉE</h2>
        {isLoading ? (
          <p>En chargement</p>
        ) : data[0] ? (
          <div className="customer-session-item-list">
            {data.map((session) => {
              return (
                <CustomerSessionItem
                setSessionID={setSessionID}
                openSessionDisplay={openSessionDisplay}
                setOpenSessionDisplay={setOpenSessionDisplay}
                id={session._id}
                title={session.title}
                name={session.name}
                firstName={session.firstName}
                date={session.start}
                content={session.content}
                key={String(session._id)}
                />
              );
            })}
          </div>
        ) : (
          <p>Pas de session réglée à ce jour</p>
        )}
      </div>  
    )
}

export default SessionsPaid;