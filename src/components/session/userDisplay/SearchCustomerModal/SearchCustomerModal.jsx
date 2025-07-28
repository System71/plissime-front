/* eslint-disable react/prop-types */
import styles from "./search-customer-modal.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../../Button/Button";

const SearchCustomerModal = ({
  token,
  programId,
  setSearchCustomerModalDisplay,
  setCustomers,
}) => {
  const [listIsVisible, setListIsVisible] = useState(true);
  const [searchCustomer, setSearchCustomer] = useState("");
  const [customersList, setCustomersList] = useState([]);
  const [errorBack, setErrorBack] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (searchCustomer.length > 1) {
      const fetchCustomers = async () => {
        try {
          const response = await axios.get(
            import.meta.env.VITE_API_URL +
              `/mycustomers?name=${searchCustomer}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setCustomersList(response.data);
          setListIsVisible(true);
        } catch (error) {
          console.error("Erreur lors de la recherche de clients :", error);
        }
      };
      fetchCustomers();
    }
    if (searchCustomer.length <= 1) {
      setListIsVisible(false);
    }
  }, [searchCustomer, token]);

  const addCustomerToProgram = async () => {
    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL +
          `/program/${programId}/customer/add/${customerId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCustomers(response.data);
      setSearchCustomerModalDisplay(false);
    } catch (error) {
      setErrorBack(error.response.data.message);
    }
  };

  return (
    <div
      className={styles["container"]}
      onClick={() => setSearchCustomerModalDisplay(false)}
    >
      <div
        className={styles["content"]}
        onClick={(event) => event.stopPropagation()}
      >
        {customerId ? (
          <div className={styles["customer-infos"]}>
            <div>
              <label htmlFor="name">Nom du client</label>
              <input type="text" name="name" id="name" value={name} disabled />
            </div>
            <div>
              <label htmlFor="firstName">Prénom du client</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                disabled
              />
            </div>
            <div>
              <label htmlFor="phone">Téléphone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={phone}
                disabled
              />
            </div>
            <div>
              <label htmlFor="phone">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                disabled
              />
            </div>
            <p className={styles["error-message-back"]}>{errorBack}</p>
            <Button
              type="button"
              action={addCustomerToProgram}
              text="Ajouter ce client au programme"
            />
          </div>
        ) : (
          <div className={styles["search-customer"]}>
            <label htmlFor="customer">Nom du client</label>
            <input
              type="text"
              placeholder="Client"
              name="customer"
              id="customer"
              value={searchCustomer}
              onChange={(event) => {
                setSearchCustomer(event.target.value);
                setCustomerId("");
              }}
            />
            {listIsVisible && (
              <div className={styles["customers-list"]}>
                <ul>
                  {customersList.map((customer, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          setListIsVisible(false);
                          setName(customer.name);
                          setFirstName(customer.firstName);
                          setEmail(customer.email);
                          setPhone(customer.phone);
                          setCustomerId(customer._id);
                        }}
                      >
                        {customer.name} {customer.firstName}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchCustomerModal;
