/* eslint-disable react/prop-types */
import styles from "./year-sales.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

const YearSales = ({ token }) => {
  const [yearSales, setYearSales] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/sales/year`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setYearSales(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className={styles["container"]}>
      <div className={styles["title"]}>CA ANNEE EN COURS</div>
      <div className={styles["content"]}>
        <p className={styles["value"]}>{yearSales} €</p>
        <p>+15% sur année précédente</p>
      </div>
    </div>
  );
};

export default YearSales;
