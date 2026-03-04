/* eslint-disable react/prop-types */
import styles from "./to-paid.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import SessionItemPayment from "../../session/userDisplay/SesssionItemPayment/SessionItemPayment";

const ToPaid = ({ token, setOpenSessionDisplay, setSessionID }) => {
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
            },
          );
          setSessionsToPaid(response.data);
          console.log(response.data);
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
          id={session._id}
          title={session.title}
          name={session.customer.name}
          firstName={session.customer.firstName}
          date={session.start}
          price={session.price}
          key={session._id}
          setOpenSessionDisplay={setOpenSessionDisplay}
          setSessionID={setSessionID}
        />
      ))}
    </div>
  );
};

export default ToPaid;
