/* eslint-disable react/prop-types */
import styles from "./coachs.module.css";
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
    <div className={styles.coachs}>
      <h1>Mes coachs</h1>
      <div className={styles["coach-item-list"]}>
        {myCoachs.map((coach) => (
          <CoachItem
            name={coach.id.name}
            firstName={coach.id.firstName}
            phone={coach.id.phone}
            email={coach.id.email}
            key={coach.id._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Coachs;
