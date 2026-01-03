/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import styles from "./customers.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import arrow from "../../assets/arrow_button.png";
import circle from "../../assets/circle.png";
import {
  updateActiveCustomersList,
  updateInactiveCustomersList,
} from "../../../utils/updateData";
import CustomerItem from "../../components/customer/CustomerItem/CustomerItem";

const Customers = ({
  token,
  addCustomerDisplay,
  setAddCustomerDisplay,
  openCustomerDisplay,
  setOpenCustomerDisplay,
  setCustomerID,
  activeCustomersList,
  setActiveCustomersList,
  inactiveCustomersList,
  setInactiveCustomersList,
  refreshCustomers,
}) => {
  const [searchCustomer, setSearchCustomer] = useState("");
  const [choice, setChoice] = useState("active");

  useEffect(() => {
    if (!token) return;

    const fetchCustomers = async () => {
      await updateActiveCustomersList(
        setActiveCustomersList,
        token,
        searchCustomer
      );
      await updateInactiveCustomersList(
        setInactiveCustomersList,
        token,
        searchCustomer
      );
    };

    fetchCustomers();
  }, [token, searchCustomer, refreshCustomers]);

  return (
    <div className={styles["customers"]}>
      <p className={styles["message"]}>Voici votre base de données client.</p>
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
      <div className={styles["button-choice"]}>
        <button
          type="button"
          className="customer-button"
          onClick={() => setChoice("active")}
          style={{ backgroundColor: choice == "active" && "#a8c6cc" }}
        >
          Clients actifs
        </button>
        <button
          type="button"
          className="customer-button"
          onClick={() => setChoice("inactive")}
          style={{ backgroundColor: choice == "inactive" && "#a8c6cc" }}
        >
          Clients inactifs
        </button>
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
        {choice == "active" &&
          activeCustomersList.map((customer) => {
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
        {choice == "inactive" &&
          inactiveCustomersList.map((customer) => {
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
    </div>
  );
};

export default Customers;
