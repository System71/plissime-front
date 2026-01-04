/* eslint-disable react/prop-types */
import styles from "./customer-home.module.css";
import CustomerUpcomingSessions from "../../../components/session/customerDisplay/CustomerUpcomingSessions/CustomerUpcomingSessions";
import SessionsToPaid from "../../../components/session/customerDisplay/SessionsToPaid/SessionsToPaid";
import SessionsPaid from "../../../components/session/customerDisplay/SessionsPaid/SessionsPaid";

const CustomerHome = ({ token }) => {
  return (
    <div className={styles["customerHome"]}>
      <div className={styles["first-line"]}>
        <div className={styles["dashboard-item"]}>
          <CustomerUpcomingSessions token={token} />
        </div>
        <div className={styles["dashboard-item"]}>
          <SessionsToPaid token={token} />
        </div>
      </div>
      <div className={styles["second-line"]}>
        <div className={styles["dashboard-item"]}>
          <SessionsPaid token={token} />
        </div>
      </div>
    </div>
  );
};

export default CustomerHome;
