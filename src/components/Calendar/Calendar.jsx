/* eslint-disable react/prop-types */
import styles from "./calendar.module.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import { useState, useEffect } from "react";
import axios from "axios";
import calendarLogo from "../../assets/google-calendar.png";

const Calendar = ({
  token,
  openSessionDisplay,
  setOpenSessionDisplay,
  setSessionID,
}) => {
  const [events, setEvents] = useState([]);
  const [googleLinked, setGoogleLinked] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/status`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setGoogleLinked(response.data.linked);
        if (response.data.linked) {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/events`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setEvents(response.data);
        }
      } catch (error) {
        console.log("erreur", error.response);
      }
    };
    fetchData();
  }, [token]);

  const handleConnectGoogle = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/google/init`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const { url } = await response.data;
      window.location.href = url; // redirection vers Google
    } catch (error) {
      console.log(error.response);
    }
  };

  if (googleLinked === null) {
    return <p>Chargement...</p>;
  }

  return (
    <div className={styles["calendar"]}>
      {!googleLinked ? (
        <div className={styles.connect}>
          <p>Connectez votre agenda avec Google Agenda : </p>
          <img
            src={calendarLogo}
            alt="Logo Google Calendar"
            className={styles.logoCalendar}
            onClick={handleConnectGoogle}
          />
        </div>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          events={events}
          selectable={true}
          eventClick={(info) => {
            if (info.event.extendedProps.source == "local") {
              setOpenSessionDisplay(!openSessionDisplay);
              setSessionID(info.event.id);
            }
          }}
          locales={[frLocale]}
          locale="fr"
        />
      )}
    </div>
  );
};

export default Calendar;
