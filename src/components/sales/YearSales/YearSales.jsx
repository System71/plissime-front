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
      <h2>CA ANNEE EN COURS</h2>
      <div>
        <p>{yearSales} €</p>
      </div>
    </div>
  );
};

export default YearSales;
