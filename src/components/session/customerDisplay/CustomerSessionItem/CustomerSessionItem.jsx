/* eslint-disable react/prop-types */
import "./customer-session-item.css";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import running from "../../../../assets/running.png";
import { useNavigate } from "react-router-dom";

const CustomerSessionItem = ({
  id,
  title,
  name,
  firstName,
  date,
  content,
  price,
  state,
  coachId,
  token,
}) => {
  const heure = format(date, "HH:mm");
  const formatedDate = format(date, "dd/LL/yyyy");
  const navigate = useNavigate();

  const handlePay = () => {
    navigate("/stripe", {
      state: {
        amount: price, // prix de la session en euros ou centimes
        coachId: coachId, // stripe_id du coach
        sessionId: id, // pour lier le paiement à la session
        token: token,
      },
    });
  };

  return (
    <div className="customer-session-item">
      <div className="customer-session_content">
        <div className="customer-name">
          <p>
            {name} {firstName}
          </p>
        </div>
        <div className="customer-session-info">
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
        <div className="customer-session-info">
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
        <div className="customer-session-info">
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
        <div className="customer-session-info">
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
        <div className="customer-session-info">
          <FontAwesomeIcon
            className="info-picto"
            icon="pen-to-square"
            color="#E67E22"
            size="xs"
          />
          <div>
            <p>{price}euros</p>
          </div>
        </div>
        {state != "Payée" && (
          <div className="customer-session-info">
            <button onClick={handlePay}>Payer en ligne</button>
          </div>
        )}
      </div>
      <div className="picto">
        <img
          src={running}
          alt="session picto"
          className="customer-session-picture"
        />
      </div>
    </div>
  );
};

export default CustomerSessionItem;
