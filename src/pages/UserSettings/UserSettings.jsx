/* eslint-disable react/prop-types */
import styles from "./user-settings.module.css";
import { useState } from "react";
import Subscription from "../../components/Subscription/Subscription";
import UserInfos from "../../components/UserInfos/UserInfos";

const UserSettings = ({ token, sub, stripeId }) => {
  const [choice, setChoice] = useState("subscription");

  return (
    <>
      <div className={styles["message"]}>
        <p>Gérez vos paiements en 1 clic</p>
      </div>

      <div className={styles["user-settings"]}>
        <div className={styles["button-choice"]}>
          <button
            type="button"
            onClick={() => setChoice("subscription")}
            style={{ backgroundColor: choice == "subscription" && "#a8c6cc" }}
          >
            Abonnement
          </button>
          <button
            type="button"
            onClick={() => setChoice("settings")}
            style={{ backgroundColor: choice == "settings" && "#a8c6cc" }}
          >
            Profil
          </button>
        </div>
        {choice == "subscription" ? (
          <Subscription token={token} sub={sub} stripeId={stripeId} />
        ) : (
          <UserInfos token={token} />
        )}
      </div>
    </>
  );
};

export default UserSettings;
