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
            style={{ backgroundColor: choice == "payable" && "#a8c6cc" }}
          >
            En attente
          </button>
          <button
            type="button"
            onClick={() => setChoice("paid")}
            style={{ backgroundColor: choice == "paid" && "#a8c6cc" }}
          >
            Encaissés
          </button>
          <button
            type="button"
            onClick={() => setChoice("subscription")}
            style={{ backgroundColor: choice == "subscription" && "#a8c6cc" }}
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
          />
        )}
      </div>
    );
  } else {
    return <Unregistered />;
  }
};

export default Payments;
