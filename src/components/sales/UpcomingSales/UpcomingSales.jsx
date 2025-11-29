/* eslint-disable react/prop-types */
import styles from "./upcoming-sales.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

const UpcomingSales = ({ token }) => {
  const [upcomingSales, setUpcomingSales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/sales/upcoming`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setUpcomingSales(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className={styles["container"]}>
      <div className={styles["title"]}>CA A VENIR</div>
      <div className={styles["content"]}>
        <p className={styles["value"]}>{upcomingSales} €</p>
        <p>2 paiements en attentes</p>
      </div>
    </div>
  );
};

export default UpcomingSales;
