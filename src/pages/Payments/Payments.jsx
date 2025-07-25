/* eslint-disable react/prop-types */
import styles from "./payments.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import SessionPaid from "../../components/session/userDisplay/SessionPaid/SessionPaid";

const Payments = ({ token }) => {
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

  return (
    <>
      <h1>PAIEMENTS RECUS</h1>
      <div className={styles["session-paid-list"]}>
        {sessionsPaid.map((session) => {
          return (
            <SessionPaid
              id={session._id}
              title={session.title}
              name={session.customer.name}
              firstName={session.customer.firstName}
              date={session.start}
              price={session.price}
              key={String(session._id)}
            />
          );
        })}
      </div>
    </>
  );
};

export default Payments;
