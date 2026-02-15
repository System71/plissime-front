/* eslint-disable react/prop-types */
import Paid from "../../components/payments/Paid/Paid";
import ToPaid from "../../components/payments/ToPaid/ToPaid";
import styles from "./payments.module.css";
import { useState } from "react";
import Unregistered from "../../components/Unregistered/Unregistered";
import CustomerSubscription from "../../components/CustomerSubscription/CustomerSubscriptionDisplay/CustomerSubscriptionDisplay";

const Payments = ({
  token,
  sub,
  setAddCustomerSubscriptionDisplay,
  setOpenCustomerSubscriptionDisplay,
  refreshCustomerSubscription,
  setSubscriptionID,
}) => {
  const [choice, setChoice] = useState("payable");

  if (sub) {
    return (
      <div className={styles["payments"]}>
        <div className={styles["message"]}>
          <p>Gérez vos paiements et abonnements en 1 clic</p>
        </div>
        <div className={styles["button-choice"]}>
          <button
            type="button"
            onClick={() => setChoice("payable")}
            className={`button-choice ${choice === "payable" ? "active" : ""}`}
          >
            En attente
          </button>
          <button
            type="button"
            onClick={() => setChoice("paid")}
            className={choice === "paid" ? "active" : ""}
          >
            Encaissés
          </button>
          <button
            type="button"
            onClick={() => setChoice("subscription")}
            className={choice === "subscription" ? "active" : ""}
          >
            Abonnements
          </button>
        </div>
        {choice == "payable" && <ToPaid token={token} />}
        {choice == "paid" && <Paid token={token} />}
        {choice == "subscription" && (
          <CustomerSubscription
            token={token}
            setAddCustomerSubscriptionDisplay={
              setAddCustomerSubscriptionDisplay
            }
            setOpenCustomerSubscriptionDisplay={
              setOpenCustomerSubscriptionDisplay
            }
            refreshCustomerSubscription={refreshCustomerSubscription}
            setSubscriptionID={setSubscriptionID}
          />
        )}
      </div>
    );
  } else {
    return <Unregistered />;
  }
};

export default Payments;
