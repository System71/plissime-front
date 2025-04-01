/* eslint-disable react/prop-types */
import "./sessions.css";
import axios from "axios";
import { useState, useEffect } from "react";
import SessionItem from "../../components/SessionItem/SessionItem";

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
      <h1>Sessions</h1>
      <div className="addSessions">
        <button
          onClick={() => {
            setAddSessionDisplay(!addSessionDisplay);
          }}
        >
          Ajouter une session
        </button>
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
