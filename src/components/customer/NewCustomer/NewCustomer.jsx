import styles from "./new-customer.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

const NewCustomer = ({ token }) => {
  const [newCustomersMonth, setNewCustomersMonth] = useState(0);
  const [diffPrevMonth, setDiffPrevMonth] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/mycustomers/new`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNewCustomersMonth(response.data.newCustomersMonth);
        setDiffPrevMonth(response.data.diffPrevMonth);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className={styles["container"]}>
      <div className={styles["title"]}>NOUVEAUX CLIENTS</div>
      <div className={styles["content"]}>
        <p className={styles["value"]}>{newCustomersMonth}</p>
        <p>
          <span style={{ color: diffPrevMonth >= 0 ? "green" : "red" }}>
            {diffPrevMonth >= 0 && "+"}
            {diffPrevMonth}
          </span>{" "}
          du mois dernier
        </p>
      </div>
    </div>
  );
};

export default NewCustomer;
