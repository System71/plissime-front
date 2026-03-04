/* eslint-disable react/prop-types */
import styles from "./paid.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import SessionItemPayment from "../../session/userDisplay/SesssionItemPayment/SessionItemPayment";

const Paid = ({ token, setOpenSessionDisplay, setSessionID }) => {
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
            },
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
    <div className={styles["sessions-paid"]}>
      {sessionsPaid.map((session) => (
        <SessionItemPayment
          id={session._id}
          title={session.title}
          name={session.customer.name}
          firstName={session.customer.firstName}
          sessionDate={session.start}
          paymentDate={session.payment.date}
          paymentType={session.payment.type}
          price={session.price}
          key={session._id}
          setOpenSessionDisplay={setOpenSessionDisplay}
          setSessionID={setSessionID}
        />
      ))}
    </div>
  );
};

export default Paid;
