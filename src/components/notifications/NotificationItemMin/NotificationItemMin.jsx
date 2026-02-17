/* eslint-disable react/prop-types */
import styles from "./notification-item-min.module.css";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const NotificationItemMin = ({
  id,
  type,
  message,
  date,
  index,
  token,
  setRefresh,
}) => {
  const formatedDate = format(date, "dd/LL/yyyy");
  let icon;
  if (type === "payment") {
    icon = <FontAwesomeIcon icon="euro-sign" color="#E67E22" />;
  } else if (type === "session") {
    icon = <FontAwesomeIcon icon="arrow-up-right-dots" color="#E67E22" />;
  }

  const isRead = async () => {
    console.log("gooooo");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/notification/read/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className={styles["container"]} key={index}>
      <div>{icon}</div>
      <p style={{ fontWeight: 600 }}>{formatedDate}</p>
      <p>{message}</p>
      <div className={styles.button}>
        <FontAwesomeIcon icon="magnifying-glass" color="#E67E22" />
      </div>
      <div className={styles.button} onClick={() => isRead()}>
        <FontAwesomeIcon icon="check" color="#069430" />
      </div>
    </div>
  );
};

export default NotificationItemMin;
