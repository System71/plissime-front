/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./customers.css";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import arrow from "../../assets/arrow_button.png";
import circle from "../../assets/circle.png";
import { updateCustomersList } from "../../../utils/updateData";

const Customers = ({
  token,
  addCustomerDisplay,
  setAddCustomerDisplay,
  customersList,
  setCustomersList,
}) => {
  useEffect(() => {
    if (token) {
      updateCustomersList(setCustomersList, token);
    }
  }, [token]);

  return (
    <>
      <h1>VOS CLIENTS</h1>
      <div
        className="addCustomer"
        onClick={() => {
          setAddCustomerDisplay(!addCustomerDisplay);
        }}
      >
        <p>Ajouter un client</p>
        <div className="arrow-circle">
          <img className="arrow" src={arrow} alt="arrow" />
          <div className="plus-container">
            <img className="circle" src={circle} alt="circle" />
            <FontAwesomeIcon
              className="plus-circle"
              icon="plus-circle"
              color="#E67E22"
              size="4x"
            />
          </div>
        </div>
      </div>
      <div className="customer-list">
        {customersList.map((customer) => {
          return (
            <div className="customer-item" key={String(customer._id)}>
              <FontAwesomeIcon icon="circle" color="#E67E22" size="xs" />
              <div className="customer-name">
                <p>
                  {customer.name} {customer.firstName}
                </p>
              </div>
              <div className="customer-address">
                <p>
                  {customer.address} {customer.zip} {customer.city}
                </p>
              </div>
              <div className="customer-icon">
                <FontAwesomeIcon icon="magnifying-glass" color="#E67E22" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Customers;
