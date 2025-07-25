/* eslint-disable react/prop-types */
import styles from "./session-paid.module.css";
import { format } from "date-fns";

const SessionPaid = ({ title, name, firstName, date, price }) => {
  const formatedDate = format(date, "dd/LL/yyyy");

  return (
    <div className={styles["content"]}>
      <div className={styles["date"]}>{formatedDate}</div>
      <div className={styles["name"]}>
        {name} {firstName}
      </div>
      <div className={styles["title"]}>{title}</div>
      <div className={styles["price"]}>{price} euros</div>
    </div>
  );
};

export default SessionPaid;
