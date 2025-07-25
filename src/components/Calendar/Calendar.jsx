import styles from "./calendar.module.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import frLocale from "@fullcalendar/core/locales/fr";

const Calendar = () => {
  return (
    <div className={styles["calendar"]}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        locales={[frLocale]}
        locale="fr"
      />
    </div>
  );
};

export default Calendar;
