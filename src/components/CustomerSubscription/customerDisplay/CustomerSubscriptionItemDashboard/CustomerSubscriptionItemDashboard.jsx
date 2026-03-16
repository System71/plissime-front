/* eslint-disable react/prop-types */
import styles from "./customer-subscription-item-dashboard.module.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const CustomerSubscriptionItemDashboard = ({ token, sub }) => {
  const formatedDate = format(sub.date, "dd/LL/yyyy");
  const navigate = useNavigate();

  const handlePay = () => {
    navigate("/stripe", {
      state: {
        amount: sub.totalPrice, // prix de la session en euros ou centimes
        coachId: sub.coach._id, // stripe_id du coach
        subscriptionId: sub._id, // pour lier le paiement à la session
        token: token,
      },
    });
  };

  if (!sub.isPaid) {
    return (
      <div className={styles.containerToPaid}>
        <p style={{ fontWeight: 600 }}>{formatedDate}</p>
        <p>
          {sub.title} ({sub.sessionInitial} sessions)
        </p>
        <p style={{ fontWeight: 600, color: "#E67E22" }}>{sub.totalPrice} €</p>
        <div className={styles.buttonPaid} onClick={handlePay}>
          Payer
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <p style={{ fontWeight: 600 }}>{formatedDate}</p>
        <p>
          {sub.title} ({sub.sessionInitial} sessions)
        </p>
        <p style={{ fontWeight: 600, color: "#E67E22" }}>
          Conso : {sub.sessionUsed} / {sub.sessionInitial}
        </p>
      </div>
    );
  }
};

export default CustomerSubscriptionItemDashboard;
