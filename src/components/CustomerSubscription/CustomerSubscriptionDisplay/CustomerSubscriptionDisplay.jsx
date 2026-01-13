import styles from "./customer-subscription-display.module.css";
import arrow from "../../../assets/arrow_button.png";
import circle from "../../../assets/circle.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import axios from "axios";
import CustomerSubscriptionItem from "../CustomerSubscriptionItem/CustomerSubscriptionItem";

const CustomerSubscriptionDisplay = ({
  token,
  setAddCustomerSubscriptionDisplay,
  setOpenCustomerSubscriptionDisplay,
  refreshCustomerSubscription,
  setSubscriptionID,
}) => {
  const [customerSubscriptions, setCustomerSubscription] = useState([]);

  useEffect(() => {
    if (token) {
      const fetchSessionsPaid = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/subscriptions`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              "Content-Type": "multipart/form-data",
            }
          );
          setCustomerSubscription(response.data);
        } catch (error) {
          console.log(error.response);
        }
      };
      fetchSessionsPaid();
    }
  }, [token, refreshCustomerSubscription]);

  return (
    <div className={styles.CustomerSubscription}>
      <div
        className={styles["addCustomerSubsription"]}
        onClick={() => {
          setAddCustomerSubscriptionDisplay(true);
        }}
      >
        <p>Créer un nouvel abonnement</p>
        <div className={styles["arrow-circle"]}>
          <img className={styles["arrow"]} src={arrow} alt="arrow" />
          <div className={styles["plus-container"]}>
            <img className={styles["circle"]} src={circle} alt="circle" />
            <FontAwesomeIcon
              className={styles["plus-circle"]}
              icon="plus-circle"
              color="#E67E22"
              size="4x"
            />
          </div>
        </div>
      </div>
      <div className={styles.customerSubscriptionList}>
        {customerSubscriptions.map((sub) => (
          <CustomerSubscriptionItem
            statut={sub.statut}
            title={sub.title}
            name={sub.customer.name}
            firstName={sub.customer.firstName}
            date={sub.date}
            sessionPrice={sub.sessionPrice}
            sessionUsed={sub.sessionUsed}
            sessionInitial={sub.sessionInitial}
            isPaid={sub.isPaid}
            id={sub._id}
            key={sub._id}
            setOpenCustomerSubscriptionDisplay={
              setOpenCustomerSubscriptionDisplay
            }
            setSubscriptionID={setSubscriptionID}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomerSubscriptionDisplay;
