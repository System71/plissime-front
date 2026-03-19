/* eslint-disable react/prop-types */
import styles from "./calendar.module.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import frLocale from "@fullcalendar/core/locales/fr";
import { useState, useEffect } from "react";
import axios from "axios";
import calendarLogo from "../../assets/google-calendar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import arrow from "../../assets/arrow_button.png";
import circle from "../../assets/circle.png";

const Calendar = ({
  token,
  openSessionDisplay,
  setOpenSessionDisplay,
  setSessionID,
  addSessionDisplay,
  setAddSessionDisplay,
}) => {
  const [events, setEvents] = useState([]);
  const [googleLinked, setGoogleLinked] = useState(null);
  const [email, setEmail] = useState("");
  const [reconnect, setReconnect] = useState(false);

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
        setEmail(response.data.email);
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
        if (error.response.data.reconnectGoogle) {
          setReconnect(!reconnect);
        }
      }
    };
    fetchData();
  }, [token, addSessionDisplay, openSessionDisplay, reconnect]);

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
      window.location.href = url;
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
        <div>
          <p>
            Vous êtes connectés sur votre agenda :
            <span className={styles.email}> {email}</span>
          </p>
          <div
            className={styles["addSessions"]}
            onClick={() => {
              setAddSessionDisplay(!addSessionDisplay);
            }}
          >
            <p className={styles.textAdd}>Ajouter une session</p>
            <div className={styles["arrow-circle"]}>
              <img className={styles["arrow"]} src={arrow} alt="arrow" />
              <div className={styles["plus-container"]}>
                <img className={styles["circle"]} src={circle} alt="circle" />
                <FontAwesomeIcon
                  className={styles["plus-circle"]}
                  icon="plus-circle"
                  color="#E67E22"
                  size="4x"
                />
              </div>
            </div>
          </div>
          <div className={styles.desktopCalendar}>
            <FullCalendar
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              initialView={"timeGridWeek"}
              events={events}
              selectable={true}
              allDaySlot={false}
              slotMinTime={"06:00:00"}
              slotMaxTime={"22:00:00"}
              height="auto" // <-- auto adapte la hauteur au contenu
              headerToolbar={{
                left: "title",
                right: "prev,today,next",
              }}
              eventClick={(info) => {
                if (info.event.extendedProps.source == "local") {
                  setOpenSessionDisplay(!openSessionDisplay);
                  setSessionID(info.event.id);
                }
              }}
              eventContent={(arg) => (
                <div
                  style={{
                    margin: "2px", // espace extérieur entre les events
                    padding: "2px 4px", // padding intérieur pour le texte
                    backgroundColor: arg.event.backgroundColor,
                    border: `1px solid ${arg.event.borderColor}`,
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  <div style={{ fontWeight: "600" }}>
                    {arg.event.extendedProps?.name}
                  </div>
                  <div>{arg.event.title}</div>{" "}
                </div>
              )}
              locales={[frLocale]}
              locale="fr"
            />
          </div>
          <div className={styles.mobileCalendar}>
            <FullCalendar
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              initialView={"timeGridDay"}
              events={events}
              selectable={true}
              allDaySlot={false}
              slotMinTime={"06:00:00"}
              slotMaxTime={"22:00:00"}
              height="auto" // <-- auto adapte la hauteur au contenu
              headerToolbar={{
                left: "title",
                right: "prev,today,next",
              }}
              eventClick={(info) => {
                if (info.event.extendedProps.source == "local") {
                  setOpenSessionDisplay(!openSessionDisplay);
                  setSessionID(info.event.id);
                }
              }}
              eventContent={(arg) => (
                <div
                  style={{
                    margin: "2px", // espace extérieur entre les events
                    padding: "2px 4px", // padding intérieur pour le texte
                    backgroundColor: arg.event.backgroundColor,
                    border: `1px solid ${arg.event.borderColor}`,
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  <div style={{ fontWeight: "600" }}>
                    {arg.event.extendedProps?.name}
                  </div>
                  <div>{arg.event.title}</div>{" "}
                </div>
              )}
              locales={[frLocale]}
              locale="fr"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
