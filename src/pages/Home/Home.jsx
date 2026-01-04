/* eslint-disable react/prop-types */
import styles from "./home.module.css";
import MonthSales from "../../components/sales/MonthSales/MonthSales.jsx";
import YearSales from "../../components/sales/YearSales/YearSales.jsx";
import UpcomingSales from "../../components/sales/UpcomingSales/UpcomingSales.jsx";
import DaySessions from "../../components/session/userDisplay/DaySessions/DaySessions.jsx";
import UserUpcomingSessions from "../../components/session/userDisplay/UserUpcomingSessions/UserUpcomingSessions.jsx";
import NewCustomer from "../../components/customer/NewCustomer/NewCustomer.jsx";
import SalesGraph from "../../components/session/userDisplay/SalesGraph/SalesGraph.jsx";
import Tasks from "../../components/session/userDisplay/Tasks/Tasks.jsx";
import CustomerHome from "./CustomerHome/CustomerHome.jsx";

const Home = ({
  token,
  setSessionID,
  openSessionDisplay,
  setOpenSessionDisplay,
  role,
  firstName,
}) => {
  return (
    <>
      <div className={styles["message"]}>
        <h1>Bonjour {firstName}</h1>
        <p>Voici votre tableau de bord</p>
      </div>
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
          <div className={styles["third-line"]}>
            <div className={styles["dashboard-item"]}>
              <Tasks token={token} />
            </div>
            <div className={styles["item-graph"]}>
              <SalesGraph token={token} />
            </div>
          </div>
        </div>
      )}
      {role === "customer" && <CustomerHome token={token} />}
    </>
  );
};

export default Home;
