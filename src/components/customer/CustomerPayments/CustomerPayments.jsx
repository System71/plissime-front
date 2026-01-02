import styles from "./customer-payments.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

const CustomerPayments = ({ token, id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `/sessions/topaid/customer/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPayments(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la recherche de clients :", error);
      }
    };
    fetchData();
  }, [token, id]);

  if (isLoading) {
    return <p>En chargement</p>;
  } else {
    return (
      <div className={styles["customer-payments"]}>
        {payments.map((payment) => {
          const formatedDate = format(payment.start, "dd/LL/yyyy");

          return (
            <div className={styles["payment-item"]} key={payment._id}>
              <p className={styles["date"]}>{formatedDate}</p>
              <p className={styles["title"]}>{payment.title}</p>
              <p className={styles["price"]}>{payment.price}€</p>
            </div>
          );
        })}
      </div>
    );
  }
};

export default CustomerPayments;
