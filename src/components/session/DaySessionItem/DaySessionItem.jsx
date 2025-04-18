import "./day-session-item.css";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DaySessionItem = ({ title, name, date, index }) => {
  const heure = format(date, "HH:mm");

  return (
    <div
      className={"session-item-container" + (index / 2 ? " white" : " grey")}
    >
      <p>{name}</p>
      <p>{title}</p>
      <p>{heure}</p>
      <FontAwesomeIcon icon="magnifying-glass" color="#E67E22" />
    </div>
  );
};

export default DaySessionItem;
