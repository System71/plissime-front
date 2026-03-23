/* eslint-disable react/prop-types */
import Paid from "../../components/payments/Paid/Paid";
import ToPaid from "../../components/payments/ToPaid/ToPaid";
import styles from "./payments.module.css";
import { useState } from "react";
import Unregistered from "../../components/Unregistered/Unregistered";
import CustomerSubscription from "../../components/CustomerSubscription/CustomerSubscriptionDisplay/CustomerSubscriptionDisplay";
import paymentPreview from "../../assets/payment_preview.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/Button/Button";

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
  const [frequency, setFrequency] = useState("year");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(currentPage);

  const handleChangeFrequency = (event) => {
    setFrequency(event.target.value);
  };

  if (sub) {
    return (
      <div className={styles.container}>
        <div className={styles.message}>
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
        <div className={styles.filter}>
          <select
            name="frequency"
            id="frequency"
            onChange={handleChangeFrequency}
          >
            <option value="year">Année en cours</option>
            <option value="year">Mois en cours</option>
          </select>
          <div className={styles.paginationContainer}>
            <FontAwesomeIcon
              icon="circle-chevron-left"
              color="#E67E22"
              size="xl"
              fixedWidth
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            />
            <input
              name="currentPage"
              id="currentPage"
              value={currentPage}
              onChange={(event) => setCurrentPage(event.target.value)}
            />
            <p> / {totalPage}</p>
            <FontAwesomeIcon
              icon="circle-chevron-right"
              color="#E67E22"
              size="xl"
              fixedWidth
              onClick={() => setCurrentPage((prev) => prev + 1)}
            />
          </div>
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
