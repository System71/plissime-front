import "./program-item.css";
import running from "../../../assets/running.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProgramItem = ({ token, title, duration, notes }) => {
  return (
    <div className="program-item">
      <div className="program-content">
        <div className="program-title">
          <p>{title}</p>
        </div>
        <div className="program-info">
          <FontAwesomeIcon
            className="info-picto"
            icon="calendar-days"
            color="#E67E22"
            size="xs"
          />
          <div>
            <p>{duration} sessions</p>
          </div>
        </div>
        <div className="program-info">
          <FontAwesomeIcon
            className="info-picto"
            icon="pen-to-square"
            color="#E67E22"
            size="xs"
          />
          <div>{notes}</div>
        </div>
      </div>
      <div className="picto">
        <img
          src={running}
          alt="session picto"
          className="user-session-picture"
        />
      </div>
    </div>
  );
};

export default ProgramItem;
