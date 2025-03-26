/* eslint-disable react/prop-types */
import "./day-sessions.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import SessionItem from "../SessionItem/SessionItem";

const DaySessions = ({ token }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/daysessions`,
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
    <div className="day-sessions-container">
      <h2>SESSIONS DU JOUR</h2>
      <div className="day-sessions-list">
        {data.map((session) => {
          return <SessionItem title={session.title} key={session.id} />;
        })}
      </div>
    </div>
  );
};

export default DaySessions;
