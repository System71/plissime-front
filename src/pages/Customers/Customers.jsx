/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./customers.css";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import arrow from "../../assets/arrow_button.png";
import circle from "../../assets/circle.png";
import { updateCustomersList } from "../../../utils/updateData";
import CustomerItem from "../../components/Customer/CustomerItem/CustomerItem";

const Customers = ({
  token,
  addCustomerDisplay,
  setAddCustomerDisplay,
  openCustomerDisplay,
  setOpenCustomerDisplay,
  setCustomerID,
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
            <CustomerItem
              openCustomerDisplay={openCustomerDisplay}
              setOpenCustomerDisplay={setOpenCustomerDisplay}
              setCustomerID={setCustomerID}
              id={customer._id}
              name={customer.name}
              firstName={customer.firstName}
              address={customer.address}
              zip={customer.zip}
              city={customer.city}
              key={String(customer._id)}
            />
          );
        })}
      </div>
    </>
  );
};

export default Customers;
