/* eslint-disable react/prop-types */
import styles from "./customer-subscription-item.module.css";
import { format } from "date-fns";

const CustomerSubscriptionItem = ({
  statut,
  title,
  name,
  firstName,
  date,
  sessionPrice,
  sessionUsed,
  sessionInitial,
  isPaid,
  id,
  setOpenCustomerSubscriptionDisplay,
  setSubscriptionID,
}) => {
  const formatedDate = format(date, "dd/LL/yyyy");

  return (
    <div
      className={styles["content"]}
      onClick={() => {
        setOpenCustomerSubscriptionDisplay(true);
        setSubscriptionID(id);
      }}
    >
      <div className={styles["date"]}>{formatedDate}</div>
      <div className={styles["name"]}>
        {name} <span className={styles["first-name"]}>{firstName}</span>
      </div>
      <div className={styles["title"]}>{title}</div>
      <div className={styles["price"]}>
        {sessionPrice} / {sessionPrice * sessionInitial}€{" "}
      </div>
      <div className={styles["session"]}>
        {sessionUsed} / {sessionInitial} sessions
      </div>
      <div className={styles["view"]}>Voir</div>
    </div>
  );
};

export default CustomerSubscriptionItem;
