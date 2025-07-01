/* eslint-disable react/prop-types */
import "./coachs.css";
import { useEffect, useState } from "react";
import axios from "axios";
import CoachItem from "../../components/coach/coachItem/CoachItem";

const Coachs = ({ token }) => {
  const [myCoachs, setMyCoachs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/mycoachs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setMyCoachs(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token]);

  return (
    <>
      <h1>Mes coachs</h1>
      <div className="coach-item-list">
        {myCoachs.map((coach) => (
          <CoachItem
            name={coach.name}
            firstName={coach.firstName}
            phone={coach.phone}
            email={coach.email}
            key={coach._id}
          />
        ))}
      </div>
    </>
  );
};

export default Coachs;
