/* eslint-disable react/prop-types */
import "./month-sales.css";
import axios from "axios";
import { useState, useEffect } from "react";

const MonthSales = ({ token }) => {
  const [monthSales, setMonthSales] = useState([]);

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
          }
        );
        setMonthSales(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="monthsales-container">
      <h2>CA MOIS EN COURS</h2>
      <div>
        <p>{monthSales} €</p>
      </div>
    </div>
  );
};

export default MonthSales;
