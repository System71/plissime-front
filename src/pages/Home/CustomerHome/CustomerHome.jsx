/* eslint-disable react/prop-types */
import styles from "./customer-home.module.css";
import CustomerUpcomingSessions from "../../../components/session/customerDisplay/CustomerUpcomingSessions/CustomerUpcomingSessions";
import SessionsToPaid from "../../../components/session/customerDisplay/SessionsToPaid/SessionsToPaid";
import SessionsPaid from "../../../components/session/customerDisplay/SessionsPaid/SessionsPaid";
import Notifications from "../../../components/notifications/Notifications/Notifications.jsx";

const CustomerHome = ({ token }) => {
  return (
    <div className={styles.customerHome}>
      <div className={styles.firstLine}>
        <div className={styles["dashboardItem"]}>
          <CustomerUpcomingSessions token={token} />
        </div>
        <div className={styles["dashboardItem"]}>
          <SessionsToPaid token={token} />
        </div>
      </div>
      <div className={styles.secondLine}>
        <div className={styles["dashboardItem"]}>
          <SessionsPaid token={token} />
        </div>
        <div className={styles["dashboardItem"]}>
          <Notifications token={token} />
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;
