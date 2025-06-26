/* eslint-disable react/prop-types */
import "./session-paid.css";
import { format } from "date-fns";

const SessionPaid = ({ title, name, firstName, date, price }) => {
  const formatedDate = format(date, "dd/LL/yyyy");

  return (
    <div className="session-paid-item">
      <div className="session-paid-item-date">{formatedDate}</div>
      <div className="session-paid-item-name">
        {name} {firstName}
      </div>
      <div className="session-paid-item-title">{title}</div>
      <div className="session-paid-item-price">{price} euros</div>
    </div>
  );
};

export default SessionPaid;
