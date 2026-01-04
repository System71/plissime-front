import styles from "./customer-session-item-min.module.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const CustomerSessionItemMin = ({
  setSessionID,
  openSessionDisplay,
  setOpenSessionDisplay,
  id,
  title,
  name,
  date,
  index,
  price,
  coachId,
  token,
  state,
}) => {
  const heure = format(date, "HH:mm");
  const formatedDate = format(date, "dd/LL/yyyy");
  const navigate = useNavigate();

  const handlePay = () => {
    navigate("/stripe", {
      state: {
        amount: price, // prix de la session en euros ou centimes
        coachId: coachId, // stripe_id du coach
        sessionId: id, // pour lier le paiement à la session
        token: token,
      },
    });
  };

  if (state === "À payer") {
    return (
      <div className={styles["containerToPaid"]} key={index}>
        <p>{title}</p>
        <p style={{ fontWeight: 600 }}>
          {formatedDate} à {heure}
        </p>
        <p style={{ fontWeight: 600, color: "#E67E22" }}>{price} €</p>
        <div className={styles.buttonPaid} onClick={handlePay}>
          Payer
        </div>
      </div>
    );
  } else if (state === "Payée") {
    return (
      <div className={styles["container"]} key={index}>
        <p>{title}</p>
        <p style={{ fontWeight: 600 }}>
          {formatedDate} à {heure}
        </p>
        <p style={{ fontWeight: 600, color: "#E67E22" }}>{price} €</p>
      </div>
    );
  } else {
    return (
      <div className={styles["container"]} key={index}>
        <p>{name}</p>
        <p>{title}</p>
        <p style={{ fontWeight: 600 }}>
          {formatedDate} à {heure}
        </p>
      </div>
    );
  }
};

export default CustomerSessionItemMin;
