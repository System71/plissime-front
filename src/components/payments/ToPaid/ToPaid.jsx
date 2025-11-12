/* eslint-disable react/prop-types */
import styles from "./to-paid.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import SessionItemPayment from "../../session/userDisplay/SesssionItemPayment/SessionItemPayment";

const ToPaid = ({ token }) => {
  const [sessionsToPaid, setSessionsToPaid] = useState([]);

  useEffect(() => {
    if (token) {
      const fetchSessionsPaid = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/sessions/topaid`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              "Content-Type": "multipart/form-data",
            }
          );
          console.log("session a payer=", response.data);
          setSessionsToPaid(response.data);
        } catch (error) {
          console.log(error.response);
        }
      };
      fetchSessionsPaid();
    }
  }, [token]);

  return (
    <div className={styles["sessions-to-paid"]}>
      {sessionsToPaid.map((session) => (
        <SessionItemPayment
          title={session.title}
          name={session.customer.name}
          firstName={session.customer.firstName}
          date={session.start}
          price={session.price}
          key={session._id}
        />
      ))}
    </div>
  );
};

export default ToPaid;
