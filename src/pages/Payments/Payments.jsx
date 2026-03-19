/* eslint-disable react/prop-types */
import Paid from "../../components/payments/Paid/Paid";
import ToPaid from "../../components/payments/ToPaid/ToPaid";
import styles from "./payments.module.css";
import { useState } from "react";
import Unregistered from "../../components/Unregistered/Unregistered";
import CustomerSubscription from "../../components/CustomerSubscription/CustomerSubscriptionDisplay/CustomerSubscriptionDisplay";
import paymentPreview from "../../assets/payment_preview.png";

const Payments = ({
  token,
  sub,
  setAddCustomerSubscriptionDisplay,
  setOpenCustomerSubscriptionDisplay,
  refreshSessions,
  refreshCustomerSubscription,
  setSubscriptionID,
  setOpenSessionDisplay,
  setSessionID,
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
            className={`button-choice ${choice === "payable" ? styles.active : ""}`}
          >
            En attente
          </button>
          <button
            type="button"
            onClick={() => setChoice("paid")}
            className={choice === "paid" ? styles.active : ""}
          >
            Encaissés
          </button>
          <button
            type="button"
            onClick={() => setChoice("subscription")}
            className={choice === "subscription" ? styles.active : ""}
          >
            Abonnements
          </button>
        </div>
        <div className={styles.content}>
          {choice == "payable" && (
            <ToPaid
              token={token}
              setOpenSessionDisplay={setOpenSessionDisplay}
              setSessionID={setSessionID}
              refreshSessions={refreshSessions}
            />
          )}
          {choice == "paid" && (
            <Paid
              token={token}
              setOpenSessionDisplay={setOpenSessionDisplay}
              setSessionID={setSessionID}
              refreshSessions={refreshSessions}
            />
          )}
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
      </div>
    );
  } else {
    return (
      <div className={styles.preview}>
        <Unregistered />
        <img
          src={paymentPreview}
          alt="payment preview"
          className={styles.imgPreview}
        />
      </div>
    );
  }
};

export default Payments;
