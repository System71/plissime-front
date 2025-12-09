/* eslint-disable react/prop-types */
import Paid from "../../components/payments/Paid/Paid";
import ToPaid from "../../components/payments/ToPaid/ToPaid";
import styles from "./payments.module.css";
import { useState } from "react";
import Unregistered from "../../components/Unregistered/Unregistered";

const Payments = ({ token, sub }) => {
  const [choice, setChoice] = useState("payable");

  if (sub) {
    return (
      <div className={styles["payments"]}>
        <div className={styles["message"]}>
          <p>Gérez vos paiements en 1 clic</p>
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
        </div>
        {choice == "paid" ? <Paid token={token} /> : <ToPaid token={token} />}
      </div>
    );
  } else {
    return <Unregistered />;
  }
};

export default Payments;
