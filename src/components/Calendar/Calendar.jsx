/* eslint-disable react/prop-types */
import styles from "./calendar.module.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import { useState, useEffect } from "react";
import axios from "axios";

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
          }
        );
        setGoogleLinked(response.data.linked);
        console.log("response.data.linked",response.data.linked);
        if (response.data.linked) {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/events`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
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
        }
      );
      const { url } = await response.data;
      console.log("url=", url);
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
        <div style={{ padding: "1rem" }}>
          <p>Ton compte Google n’est pas encore lié.</p>
          <button onClick={handleConnectGoogle}>
            Connecter mon Google Calendar
          </button>
        </div>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          events={events}
          selectable={true}
          eventClick={(info) => {
            console.log("info.event==>", info.event);
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
