/* eslint-disable react/prop-types */
import styles from "./month-sales.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

const MonthSales = ({ token }) => {
  const [monthSales, setMonthSales] = useState(0);
  const [diffPrevMonth, setDiffPrevMonth] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/sales/month`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          },
        );
        setMonthSales(response.data.monthSales);
        setDiffPrevMonth(response.data.diffPrevMonth);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>CA du mois</div>
      <div className={styles.content}>
        <p className={styles.value}>{monthSales} €</p>
        <p className={styles.progress}>
          <span style={{ color: diffPrevMonth >= 0 ? "green" : "red" }}>
            {diffPrevMonth >= 0 && "+"}
            {diffPrevMonth}%
          </span>
          <p>du mois dernier</p>
        </p>
      </div>
    </div>
  );
};

export default MonthSales;
