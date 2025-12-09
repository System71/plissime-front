import styles from "./unregistered.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const Unregistered = () => {
  const navigate = useNavigate();

  return (
    <div className={styles["unregistered"]}>
      <p>Cette zone est réservée aux abonnés PREMIUM !</p>
      <Button
        text="Je passe Premium moi aussi !"
        action={() => {
          navigate("/user/settings");
        }}
      />
    </div>
  );
};

export default Unregistered;
