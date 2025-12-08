/* eslint-disable react/prop-types */
import styles from "./subscription.module.css";
import { useState } from "react";
import AnnualSubscription from "./blocks/annualSubscription/AnnualSubscription";
import MonthlySubscription from "./blocks/monthlySubscription/MonthlySubscription";
import MySubscription from "./MySubscription/MySubscription";

const Subscription = ({ token, sub }) => {
  const [choice, setChoice] = useState("monthly");

  console.log("sub=", sub);

  return (
    <>
      <h2>Simplifiez votre activité</h2>
      <div className={styles["subscription"]}>
        {sub == "active" ? (
          <MySubscription />
        ) : (
          <>
            <div className={styles["button-choice"]}>
              <button
                type="button"
                onClick={() => setChoice("monthly")}
                style={{ backgroundColor: choice == "monthly" && "#a8c6cc" }}
              >
                Mensuel
              </button>
              <button
                type="button"
                onClick={() => setChoice("annual")}
                style={{ backgroundColor: choice == "annual" && "#a8c6cc" }}
              >
                Annuel
              </button>
            </div>
            {choice == "monthly" ? (
              <MonthlySubscription token={token} />
            ) : (
              <AnnualSubscription token={token} />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Subscription;
