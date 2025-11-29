/* eslint-disable react/prop-types */
import styles from "./home.module.css";
import CustomerUpcomingSessions from "../../components/session/customerDisplay/CustomerUpcomingSessions/CustomerUpcomingSessions.jsx";
import MonthSales from "../../components/sales/MonthSales/MonthSales.jsx";
import YearSales from "../../components/sales/YearSales/YearSales.jsx";
import UpcomingSales from "../../components/sales/UpcomingSales/UpcomingSales.jsx";
import DaySessions from "../../components/session/userDisplay/DaySessions/DaySessions.jsx";
import UserUpcomingSessions from "../../components/session/userDisplay/UserUpcomingSessions/UserUpcomingSessions.jsx";
import SessionsToPaid from "../../components/session/customerDisplay/SessionsToPaid/SessionsToPaid.jsx";
import SessionsPaid from "../../components/session/customerDisplay/SessionsPaid/SessionsPaid.jsx";
import NewCustomer from "../../components/customer/NewCustomer/NewCustomer.jsx";

const Home = ({
  token,
  setSessionID,
  openSessionDisplay,
  setOpenSessionDisplay,
  role,
}) => {
  return (
    <>
      <h1>TABLEAU DE BORD</h1>
      {role === "coach" && (
        <div className={styles["dashboard"]}>
          <div className={styles["first-line"]}>
            <div className={styles["dashboard-item"]}>
              <MonthSales token={token} />
            </div>
            <div className={styles["dashboard-item"]}>
              <YearSales token={token} />
            </div>
            <div className={styles["dashboard-item"]}>
              <UpcomingSales token={token} />
            </div>
            <div className={styles["dashboard-item"]}>
              <NewCustomer token={token} />
            </div>
          </div>
          <div className={styles["second-line"]}>
            <div className={styles["dashboard-item"]}>
              <DaySessions
                token={token}
                setSessionID={setSessionID}
                openSessionDisplay={openSessionDisplay}
                setOpenSessionDisplay={setOpenSessionDisplay}
              />
            </div>
            <div className={styles["dashboard-item"]}>
              <UserUpcomingSessions
                token={token}
                setSessionID={setSessionID}
                openSessionDisplay={openSessionDisplay}
                setOpenSessionDisplay={setOpenSessionDisplay}
              />
            </div>
          </div>
        </div>
      )}
      {role === "customer" && (
        <div className={styles["dashboard"]}>
          <div className={styles["first-line"]}>
            <div className={styles["dashboard-item"]}>
              <CustomerUpcomingSessions token={token} />
            </div>
          </div>
          <div className={styles["second-line"]}>
            <div className={styles["dashboard-item"]}>
              <SessionsToPaid token={token} />
            </div>
          </div>
          <div className={styles["third-line"]}>
            <div className={styles["dashboard-item"]}>
              <SessionsPaid token={token} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
