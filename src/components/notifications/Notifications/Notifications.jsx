/* eslint-disable react/prop-types */
import styles from "./notifications.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import NotificationItemMin from "../NotificationItemMin/NotificationItemMin";

const Notifications = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/notifications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(response.data);
        setNotifications(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token, refresh]);

  return (
    <div className={styles.container}>
      <h2>NOTIFICATIONS</h2>
      {isLoading ? (
        <p>En chargement</p>
      ) : notifications[0] ? (
        <div className={styles.content}>
          {notifications.map((notification, index) => {
            return (
              <NotificationItemMin
                id={notification._id}
                type={notification.type}
                message={notification.message}
                date={notification.createdAt}
                key={index}
                token={token}
                setRefresh={setRefresh}
              />
            );
          })}
        </div>
      ) : (
        <p>Pas de notification</p>
      )}
    </div>
  );
};

export default Notifications;
