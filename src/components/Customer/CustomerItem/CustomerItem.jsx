/* eslint-disable react/prop-types */
import "./customer-item.css";
import avatar from "../../../assets/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomerItem = ({
  openCustomerDisplay,
  setOpenCustomerDisplay,
  setCustomerID,
  id,
  name,
  firstName,
  address,
  zip,
  city,
  phone,
  email,
}) => {
  return (
    <div
      className="customer-item"
      onClick={() => {
        setOpenCustomerDisplay(!openCustomerDisplay);
        setCustomerID(id);
      }}
    >
      <div className="customer-content">
        <div className="customer-name">
          <p>
            {name} {firstName}
          </p>
        </div>
        <div className="customer-info">
          <FontAwesomeIcon
            className="info-picto"
            icon="house"
            color="#E67E22"
            size="xs"
          />
          <div>
            <p>{address}</p>
            <p>
              {zip} {city}
            </p>
          </div>
        </div>
        <div className="customer-info">
          <FontAwesomeIcon
            className="info-picto"
            icon="phone"
            color="#E67E22"
            size="xs"
          />
          <p>0{phone}</p>
        </div>
        <div className="customer-info">
          <FontAwesomeIcon
            className="info-picto"
            icon="envelope"
            color="#E67E22"
            size="xs"
          />
          <p>{email}</p>
        </div>
        <div className="customer-info">
          <FontAwesomeIcon
            className="info-picto"
            icon="arrow-right"
            color="#E67E22"
            size="xs"
          />
          <p>Prochaine séance</p>
        </div>
      </div>
      <img src={avatar} alt="customer avatar" className="customer-picture" />
    </div>
  );
};

export default CustomerItem;
