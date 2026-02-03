/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from "./add-customer-modal.module.css";
import { useState } from "react";
import axios from "axios";
import Button from "../../Button/Button";
import { updateActiveCustomersList } from "../../../../utils/updateData";
// import CustomerItem from "../CustomerItem/CustomerItem";

const AddCustomerModal = ({
  token,
  setAddCustomerDisplay,
  setActiveCustomersList,
  setRefreshCustomers,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [customerExist, setCustomerExist] = useState(null);
  const [errors, setErrors] = useState({});
  const [errorBack, setErrorBack] = useState("");

  const validateCustomerForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "L'email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Format d'email invalide.";
    }
    if (!name) {
      newErrors.name = "Le nom est requis.";
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(name)) {
      newErrors.name = "Au moins un caractère est non autorisé.";
    }
    if (!firstName) {
      newErrors.firstName = "Le prénom est requis.";
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(firstName)) {
      newErrors.firstName = "Au moins un caractère est non autorisé.";
    }
    if (!phone) {
      newErrors.phone = "Le numéro de téléphone est requis.";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone =
        "Le numéro de téléphone ne doit comporter exactement 10 chiffres.";
    }

    return newErrors;
  };

  const checkExistingCustomer = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + `/customer/checkmail/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.data) {
        setName(response.data.name);
        setFirstName(response.data.firstName);
        setAddress(response.data.address);
        setZip(response.data.zip);
        setCity(response.data.city);
        setPhone(response.data.phone);
        setCustomerExist(true);
      } else {
        setCustomerExist(false);
      }
    } catch (error) {
      setErrorBack(error.response.data.message);
    }
  };

  const addNewCustomer = async () => {
    const validationErrors = validateCustomerForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/customer/presignup",
        {
          email: email,
          name: name,
          firstName: firstName,
          phone: phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      updateActiveCustomersList(setActiveCustomersList, token);
      setRefreshCustomers((prev) => !prev);
      setAddCustomerDisplay(false);
    } catch (error) {
      setErrorBack(error.response.data.message);
    }
  };

  const addExistingCustomer = async () => {
    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL + "/customer/add",
        {
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      updateActiveCustomersList(setActiveCustomersList, token);
      setRefreshCustomers((prev) => !prev);
      setAddCustomerDisplay(false);
    } catch (error) {
      setErrorBack(error.response.data.message);
    }
  };

  return (
    <div
      className={styles["addCustomerModalContainer"]}
      onClick={() => setAddCustomerDisplay(false)}
    >
      <div
        className={styles["addCustomerModalContent"]}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <h1>Ajouter un client</h1>
        <div>
          <div className={styles["email-check"]}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email du client"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            {customerExist === null && (
              <div className={styles["add-customer-modal-buttons"]}>
                <Button
                  type="button"
                  action={() => {
                    setAddCustomerDisplay(false);
                  }}
                  text="Annuler"
                />
                <Button
                  type="button"
                  action={checkExistingCustomer}
                  text="Valider"
                />
              </div>
            )}
          </div>
          <p className={styles["error-message"]}>{errors.email}</p>
        </div>
        {customerExist === true && (
          <>
            <div className={styles["customer-infos"]}>
              <p>Ce mail est déjà attribuée à un utilisateur</p>
              <p>Souhaitez-vous l'ajouter à votre clientèle?</p>
            </div>
            <p className={styles["error-message-back"]}>{errorBack}</p>
            <div className={styles["add-customer-modal-buttons"]}>
              <Button
                type="button"
                action={() => {
                  setAddCustomerDisplay(false);
                }}
                text="Annuler"
              />
              <Button
                type="button"
                text="Ajouter mon client!"
                action={() => {
                  addExistingCustomer();
                }}
              />
            </div>
          </>
        )}
        {customerExist === false && (
          <>
            <div className={styles["customer-infos"]}>
              <p>Cet utilisateur n'est pas encore inscrit sur Plissime.</p>
              <p>
                Vous pouvez le préinscrire vous-meme et il recevra ensuite un
                mail pour finaliser son inscription!
              </p>
              <div>
                <input
                  type="text"
                  placeholder="Nom du client"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
                <p className={styles["error-message"]}>{errors.name}</p>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Prénom du client"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={(event) => {
                    setFirstName(event.target.value);
                  }}
                />
                <p className={styles["error-message"]}>{errors.firstName}</p>
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Numéro de téléphone du client"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                />
                <p className={styles["error-message"]}>{errors.phone}</p>
              </div>
            </div>
            <p className={styles["error-message-back"]}>{errorBack}</p>
            <div className={styles["add-customer-modal-buttons"]}>
              <Button
                type="button"
                action={() => {
                  setAddCustomerDisplay(false);
                }}
                text="Annuler"
              />
              <Button
                type="button"
                text="Ajouter mon client!"
                action={() => {
                  addNewCustomer();
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddCustomerModal;
