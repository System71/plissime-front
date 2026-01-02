import styles from "./customer-sessions.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

const CustomerSessions = ({ token, id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `/sessions/upcoming/customer/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSessions(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la recherche de clients :", error);
      }
    };
    fetchData();
  }, [token, id]);

  if (isLoading) {
    return <p>En chargement</p>;
  } else {
    return (
      <div className={styles.customerSessions}>
        {sessions.map((session) => {
          const formatedDate = format(session.start, "dd/LL/yyyy");

          return (
            <div className={styles["session-item"]} key={session._id}>
              <p className={styles["date"]}>{formatedDate}</p>
              <p className={styles["title"]}>{session.title}</p>
              <p className={styles["price"]}>{session.price}€</p>
            </div>
          );
        })}
      </div>
    );
  }
};

export default CustomerSessions;
