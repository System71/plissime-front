/* eslint-disable react/prop-types */
import "./customer-item.css";
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
}) => {
  return (
    <div className="customer-item">
      <FontAwesomeIcon icon="circle" color="#E67E22" size="xs" />
      <div className="customer-name">
        <p>
          {name} {firstName}
        </p>
      </div>
      <div className="customer-address">
        <p>
          {address} {zip} {city}
        </p>
      </div>
      <div
        className="customer-icon"
        onClick={() => {
          setOpenCustomerDisplay(!openCustomerDisplay);
          setCustomerID(id);
        }}
      >
        <FontAwesomeIcon icon="magnifying-glass" color="#E67E22" />
      </div>
    </div>
  );
};

export default CustomerItem;
