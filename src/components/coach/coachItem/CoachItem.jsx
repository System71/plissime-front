/* eslint-disable react/prop-types */
import "./coach-item.css";
import avatar from "../../../assets/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CoachItem = ({ name, firstName, phone, email }) => {
  return (
    <div className="coach-item">
      <div className="coach-content">
        <div className="coach-name">
          <p>
            {name} {firstName}
          </p>
        </div>
        <div className="coach-info">
          <FontAwesomeIcon
            className="info-picto"
            icon="phone"
            color="#E67E22"
            size="xs"
          />
          <p>0{phone}</p>
        </div>
        <div className="coach-info">
          <FontAwesomeIcon
            className="info-picto"
            icon="envelope"
            color="#E67E22"
            size="xs"
          />
          <p>{email}</p>
        </div>
      </div>
      <img src={avatar} alt="coach avatar" className="coach-picture" />
    </div>
  );
};

export default CoachItem;
