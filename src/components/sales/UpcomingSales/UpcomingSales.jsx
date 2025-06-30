/* eslint-disable react/prop-types */
import "./upcoming-sales.css";
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
    <div className="upcomingsales-container">
      <h2>CA A VENIR</h2>
      <div>
        <p>{upcomingSales} €</p>
      </div>
    </div>
  );
};

export default UpcomingSales;
