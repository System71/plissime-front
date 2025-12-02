/* eslint-disable react/prop-types */
import styles from "./session-item-payment.module.css";
import { format } from "date-fns";

const SessionItemPayment = ({ title, name, firstName, date, price }) => {
  const formatedDate = format(date, "dd/LL/yyyy");

  return (
    <div className={styles["content"]}>
      <div className={styles["date"]}>{formatedDate}</div>
      <div className={styles["name"]}>
        {name} <span className={styles["first-name"]}>{firstName}</span>
      </div>
      <div className={styles["title"]}>{title}</div>
      <div className={styles["price"]}>{price}€ </div>
      <div className={styles["view"]}>Voir</div>
    </div>
  );
};

export default SessionItemPayment;
