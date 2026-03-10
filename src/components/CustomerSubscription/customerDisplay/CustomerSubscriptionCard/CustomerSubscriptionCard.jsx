/* eslint-disable react/prop-types */
import styles from "./customer-subscription-card.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import CustomerSubscriptionItemDashboard from "../CustomerSubscriptionItemDashboard/CustomerSubscriptionItemDashboard";

const CustomerSubscriptionCard = ({ token }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/subscriptions/customer`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setData(response.data);
        console.log("abo=", response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className={styles.container}>
      <h2>Abonnements</h2>
      {isLoading ? (
        <p>En chargement</p>
      ) : data[0] ? (
        <div className={styles.content}>
          {data.map((sub) => (
            <CustomerSubscriptionItemDashboard
              token={token}
              sub={sub}
              key={sub._id}
            />
          ))}
        </div>
      ) : (
        <p>Aucun abonnement en cours</p>
      )}
    </div>
  );
};

export default CustomerSubscriptionCard;
