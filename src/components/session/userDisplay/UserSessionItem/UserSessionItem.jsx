/* eslint-disable react/prop-types */
import "./user-session-item.css";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import running from "../../../../assets/running.png";

const UserSessionItem = ({
  setSessionID,
  openSessionDisplay,
  setOpenSessionDisplay,
  id,
  title,
  name,
  firstName,
  date,
  content,
}) => {
  const heure = format(date, "HH:mm");
  const formatedDate = format(date, "dd/LL/yyyy");

  return (
    <div
      className="user-session-item"
      onClick={() => {
        setOpenSessionDisplay(!openSessionDisplay);
        setSessionID(id);
      }}
    >
      <div className="user-session_content">
        <div className="customer-name">
          <p>
            {name} {firstName}
          </p>
        </div>
        <div className="user-session-info">
          <FontAwesomeIcon
            className="info-picto"
            icon="arrow-right"
            color="#E67E22"
            size="xs"
          />
          <div>
            <p>{title}</p>
          </div>
        </div>
        <div className="user-session-info">
          <FontAwesomeIcon
            className="info-picto"
            icon="calendar-days"
            color="#E67E22"
            size="xs"
          />
          <div>
            <p>{formatedDate}</p>
          </div>
        </div>
        <div className="user-session-info">
          <FontAwesomeIcon
            className="info-picto"
            icon="clock"
            color="#E67E22"
            size="xs"
          />
          <div>
            <p>{heure}</p>
          </div>
        </div>
        <div className="user-session-info">
          <FontAwesomeIcon
            className="info-picto"
            icon="pen-to-square"
            color="#E67E22"
            size="xs"
          />
          <div>
            <p>{content}</p>
          </div>
        </div>
      </div>
      <div className="picto">
        <img src={running} alt="session picto" className="user-session-picture" />
      </div>
    </div>
  );
};

export default UserSessionItem;
