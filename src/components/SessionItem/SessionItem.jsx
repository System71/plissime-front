import "./session-item.css";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SessionItem = ({ title, name, firstName, date, index }) => {
  const heure = format(date, "HH:mm");
  const formatedDate = format(date, "dd/LL/yyyy");

  return (
    <div className="session-item">
      <FontAwesomeIcon icon="circle" color="#E67E22" size="xs" />
      <div className="customer-name">
        <p>
          {name} {firstName}
        </p>
      </div>
      <div className="session-title">
        <p>{title}</p>
      </div>
      <p>{formatedDate}</p>
      <p>{heure}</p>
      <div className="session-icon">
        <FontAwesomeIcon icon="magnifying-glass" color="#E67E22" />
      </div>
    </div>
  );
};

export default SessionItem;
