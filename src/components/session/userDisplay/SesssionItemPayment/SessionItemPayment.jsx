/* eslint-disable react/prop-types */
import styles from "./session-item-payment.module.css";
import { format } from "date-fns";
import cash from "../../../../assets/cash_icon.png";
import card from "../../../../assets/card_icon.png";

const SessionItemPayment = ({
  title,
  name,
  firstName,
  sessionDate,
  paymentDate,
  paymentMethod,
  price,
  id,
  setOpenSessionDisplay,
  setSessionID,
}) => {
  if (paymentDate) {
    const formatedPaymentDate = format(paymentDate, "dd/LL/yyyy");
    const formatedSessionDate = format(sessionDate, "dd/LL/yyyy");

    return (
      <div
        className={styles.containerPaid}
        onClick={() => {
          setSessionID(id);
          setOpenSessionDisplay((prev) => !prev);
        }}
      >
        <div className={styles["date"]}>{formatedPaymentDate}</div>
        <div className={styles["name"]}>
          {name} <span className={styles["first-name"]}>{firstName}</span>
        </div>
        <div className={styles["title"]}>
          {title} du {formatedSessionDate}
        </div>
        <div className={styles["price"]}>
          <p>{price}€</p>
          {paymentMethod == "card" ? (
            <img
              src={card}
              alt="logo-plissime"
              className={styles.paymentIcon}
            />
          ) : (
            <img
              src={cash}
              alt="logo-plissime"
              className={styles.paymentIcon}
            />
          )}
        </div>
        <div className={styles["view"]}>Voir</div>
      </div>
    );
  } else {
    const formatedSessionDate = format(sessionDate, "dd/LL/yyyy");

    return (
      <div
        className={styles.containerToPaid}
        onClick={() => {
          setSessionID(id);
          setOpenSessionDisplay((prev) => !prev);
        }}
      >
        <div className={styles["date"]}>{formatedSessionDate}</div>
        <div className={styles["name"]}>
          {name} <span className={styles["first-name"]}>{firstName}</span>
        </div>
        <div className={styles["title"]}>{title}</div>
        <div className={styles["price"]}>
          <p>{price}€</p>
        </div>
        <div className={styles["view"]}>Voir</div>
      </div>
    );
  }
};

export default SessionItemPayment;
