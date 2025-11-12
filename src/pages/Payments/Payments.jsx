/* eslint-disable react/prop-types */
import Paid from "../../components/payments/Paid/Paid";
import ToPaid from "../../components/payments/ToPaid/ToPaid";
import styles from "./payments.module.css";
import { useState } from "react";

const Payments = ({ token }) => {
  const [choice, setChoice] = useState("payable");

  return (
    <div className={styles["payments"]}>
      <h1>VOS PAIEMENTS</h1>

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
};

export default Payments;
