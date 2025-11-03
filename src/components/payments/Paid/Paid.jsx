import styles from "./paid.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const Paid = ({ token }) => {
  const [sessionsPaid, setSessionsPaid] = useState([]);

  useEffect(() => {
    if (token) {
      const fetchSessionsPaid = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/sessions/paid`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              "Content-Type": "multipart/form-data",
            }
          );
          setSessionsPaid(response.data);
        } catch (error) {
          console.log(error.response);
        }
      };
      fetchSessionsPaid();
    }
  }, [token]);

  return <p>PAID</p>;
};

export default Paid;
