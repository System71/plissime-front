/* eslint-disable react/prop-types */
import styles from "./button.module.css";

const Button = ({ type, action, text }) => {
  return (
    <button type={type} onClick={action} className={styles["standard-button"]}>
      {text}
    </button>
  );
};

export default Button;
