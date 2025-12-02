/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import styles from "./year-sales.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

const YearSales = ({ token }) => {
  const [yearSales, setYearSales] = useState([]);
  const [diffPrevYear, setDiffPrevYear] = useState(0);

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
        setYearSales(response.data.yearSales);
        setDiffPrevYear(response.data.diffPrevYear);
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
        <p>
          <span style={{ color: diffPrevYear >= 0 ? "green" : "red" }}>
            {diffPrevYear >= 0 && "+"}
            {diffPrevYear}%
          </span>{" "}
          de l'année dernière
        </p>
      </div>
    </div>
  );
};

export default YearSales;
