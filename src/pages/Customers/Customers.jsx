/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import styles from "./customers.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import arrow from "../../assets/arrow_button.png";
import circle from "../../assets/circle.png";
import { updateCustomersList } from "../../../utils/updateData";
import CustomerItem from "../../components/customer/CustomerItem/CustomerItem";

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
  const [searchCustomer, setSearchCustomer] = useState("");

  useEffect(() => {
    if (token) {
      updateCustomersList(setCustomersList, token, searchCustomer);
    }
  }, [token, searchCustomer, addCustomerDisplay]);

  return (
    <>
      <h1>VOS CLIENTS</h1>
      <div
        className={styles["addCustomer"]}
        onClick={() => {
          setAddCustomerDisplay(!addCustomerDisplay);
        }}
      >
        <p>Ajouter un client</p>
        <div className={styles["arrow-circle"]}>
          <img className={styles["arrow"]} src={arrow} alt="arrow" />
          <div className={styles["plus-container"]}>
            <img className={styles["circle"]} src={circle} alt="circle" />
            <FontAwesomeIcon
              className="plus-circle"
              icon="plus-circle"
              color="#E67E22"
              size="4x"
            />
          </div>
        </div>
      </div>
      <div className={styles["search-customer"]}>
        <input
          type="search"
          placeholder="Rechercher par nom"
          name="searchCustomer"
          id="searchCustomer"
          value={searchCustomer}
          onChange={(event) => {
            setSearchCustomer(event.target.value);
          }}
        />
        <FontAwesomeIcon icon="magnifying-glass" color="#E67E22" />
      </div>
      <div className={styles["customer-list"]}>
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
              phone={customer.phone}
              email={customer.email}
              key={String(customer._id)}
              token={token}
            />
          );
        })}
      </div>
    </>
  );
};

export default Customers;
