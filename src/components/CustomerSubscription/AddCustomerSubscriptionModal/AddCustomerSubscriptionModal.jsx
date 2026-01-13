/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from "./add-customer-subscription-modal.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../Button/Button";

const AddCustomerSubscriptionModal = ({
  token,
  setAddCustomerSubscriptionDisplay,
  setRefreshCustomerSubscription,
}) => {
  const [customersListIsVisible, setCustomersListIsVisible] = useState(true);
  const [searchCustomer, setSearchCustomer] = useState("");
  const [customersList, setCustomersList] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [title, setTitle] = useState("");
  const [sessionPrice, setSessionPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [sessionInitial, setSessionInitial] = useState("");
  const [errors, setErrors] = useState({});
  const [errorBack, setErrorBack] = useState("");

  const validateSessionForm = () => {
    const newErrors = {};

    if (!customerId) {
      newErrors.customer = "Le nom est requis.";
    }
    if (!title) {
      newErrors.title = "Le nom de la session est requis.";
    }
    if (!sessionPrice) {
      newErrors.sessionPrice = "Le prix de la session est requis.";
    }
    if (!sessionInitial) {
      newErrors.sessionInitial = "Le nombre de session est requis.";
    }

    return newErrors;
  };

  //Loading customer list to search
  useEffect(() => {
    if (!customerId && searchCustomer.length > 1) {
      const fetchCustomers = async () => {
        try {
          const response = await axios.get(
            import.meta.env.VITE_API_URL +
              `/mycustomers/active?name=${searchCustomer}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setCustomersList(response.data);
          setCustomersListIsVisible(true);
        } catch (error) {
          console.error("Erreur lors de la recherche de clients :", error);
        }
      };
      fetchCustomers();
    }
    if (searchCustomer.length <= 1) {
      setCustomersListIsVisible(false);
    }
  }, [token, searchCustomer, customerId]);

  const addCustomerSubscription = async () => {
    const validationErrors = validateSessionForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/subscription/add",
        {
          title: title,
          sessionInitial: sessionInitial,
          sessionPrice: sessionPrice,
          customer: customerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setRefreshCustomerSubscription((prev) => !prev);
      setAddCustomerSubscriptionDisplay(false);
    } catch (error) {
      setErrorBack(error.response.data.message);
    }
  };

  return (
    <div
      className={styles["addCustomerSubscriptionModalContainer"]}
      onClick={() => setAddCustomerSubscriptionDisplay(false)}
    >
      <div
        className={styles["addCustomerSubscriptionModalContent"]}
        onClick={(event) => event.stopPropagation()}
      >
        <h1>Ajouter un abonnement</h1>
        <div className={styles["customer-subscription-infos"]}>
          <div className={styles["session-admin"]}>
            <div className={styles.customer}>
              <div className={styles.line}>
                <div className={`${styles["item"]}`}>
                  <label htmlFor="customer">Nom :</label>
                  <input
                    type="text"
                    placeholder="Client"
                    name="customer"
                    id="customer"
                    value={searchCustomer}
                    onChange={(event) => {
                      setSearchCustomer(event.target.value);
                      setCustomerId("");
                      setFirstName("");
                    }}
                  />
                </div>
                <div className={styles.item}>
                  <label htmlFor="firstName">Prénom :</label>
                  <input
                    type="text"
                    placeholder="Prénom du client"
                    name="firstName"
                    id="firstName"
                    value={firstName}
                    readOnly
                  />
                </div>
              </div>
              {customersListIsVisible && (
                <div className={`${styles["customers-list"]} ${styles.line}`}>
                  <ul>
                    {customersList.map((customer, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() => {
                            setSearchCustomer(customer.name);
                            setFirstName(customer.firstName);
                            setCustomersListIsVisible(false);
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
              {/* <p className={styles["error-message"]}>{errors.customer}</p> */}
            </div>
            <div className={`${styles.item} ${styles.line}`}>
              <label htmlFor="title">Nom de l'abonnement :</label>
              <input
                type="text"
                placeholder="Intitulé de l'abonnement"
                name="title"
                id="title"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className={styles.line}>
              <div className={styles.item}>
                <label htmlFor="sessionInitial">Nombre sessions :</label>
                <input
                  type="number"
                  name="sessionInitial"
                  id="sessionInitial"
                  placeholder="Nombre sessions"
                  value={sessionInitial}
                  onChange={(event) => {
                    setSessionInitial(event.target.value);
                    setTotalPrice(event.target.value * sessionPrice);
                  }}
                />
                <p className={styles["error-message"]}>{errors.price}</p>
              </div>
              <div className={styles.item}>
                <label htmlFor="sessionPrice">Prix / session :</label>
                <input
                  type="number"
                  name="sessionPrice"
                  id="sessionPrice"
                  placeholder="Prix session"
                  value={sessionPrice}
                  onChange={(event) => {
                    setSessionPrice(event.target.value);
                    setTotalPrice(event.target.value * sessionInitial);
                  }}
                />
                <p className={styles["error-message"]}>{errors.price}</p>
              </div>
            </div>
            <div className={styles.line}>
              <div className={styles.item}>
                <label htmlFor="totalPrice">
                  Montant total de l'abonnement :
                </label>
                <input
                  type="number"
                  name="totalPrice"
                  id="totalPrice"
                  placeholder="Montant total"
                  value={totalPrice}
                  readOnly
                />
                <p className={styles["error-message"]}>{errors.price}</p>
              </div>
            </div>
          </div>
          <p className={styles["error-message-back"]}>{errorBack}</p>
        </div>
        <div className={styles["add-customer-subscription-modal-buttons"]}>
          <Button
            type="button"
            action={() => setAddCustomerSubscriptionDisplay(false)}
            text="Annuler"
          />
          <Button
            type="button"
            action={() => addCustomerSubscription()}
            text="Ajouter mon abonnement!"
          />
        </div>
      </div>
    </div>
  );
};

export default AddCustomerSubscriptionModal;
