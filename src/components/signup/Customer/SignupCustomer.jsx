/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from "./signup-customer.module.css";
import { useState } from "react";
import Button from "../../Button/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SignupCustomer = ({ setToken, token, setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [activity, setActivity] = useState("");
  const [errors, setErrors] = useState({});
  const [errorBack, setErrorBack] = useState("");
  const [step, setStep] = useState(0);
  const [resumeMessage, setResumeMessage] = useState(null);

  const navigate = useNavigate();

  const validateCustomerForm = () => {
    const newErrors = {};

    if (step === 0) {
      if (!email) {
        newErrors.email = "L'email est requis.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = "Format d'email invalide.";
      }

      if (!password || password.length < 6) {
        newErrors.password =
          "Le mot de passe doit contenir au moins 6 caractères.";
      }
    } else if (step === 1) {
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
      if (!address) {
        newErrors.address = "L'adresse est requise.";
      } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ0-9' ,.-]+$/.test(address)) {
        newErrors.address = "Au moins un caractère est non autorisé.";
      }
      if (!zip) {
        newErrors.zip = "Le code postal est requis.";
      } else if (zip.length != 5) {
        newErrors.zip = "Le code postal doit comporter 5 chiffres.";
      }
      if (!city) {
        newErrors.city = "La ville est requise.";
      } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(city)) {
        newErrors.city = "Au moins un caractère est non autorisé.";
      }
      if (!phone) {
        newErrors.phone = "Le numéro de téléphone est requis.";
      } else if (!/^\d{10}$/.test(phone)) {
        newErrors.phone =
          "Le numéro de téléphone ne doit comporter exactement 10 chiffres.";
      }
      if (!activity) {
        newErrors.activity = "L'activité est requise.";
      } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/.test(activity)) {
        newErrors.activity = "Au moins un caractère est non autorisé.";
      }
    }

    return newErrors;
  };

  const signupNewCustomer = async () => {
    const validationErrors = validateCustomerForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + `/customer/signup/new`,
        {
          signupStep: step,
          email: email,
          password: password,
        },
      );
      if (response.data.newCustomer) {
        const customer = response.data.newCustomer;
        setToken(customer.token);
        Cookies.set("plissimeToken", customer.token);
      }
      if (response.data.customerToSearch) {
        const customer = response.data.customerToSearch;
        setToken(customer.token);
        Cookies.set("plissimeToken", customer.token);
        setResumeMessage(
          "Nous sommes heureux de vous revoir.\n Vous pouvez désormais finaliser votre inscription!",
        );
        if (customer.name) setName(customer.name);
        if (customer.firstName) setFirstName(customer.firstName);
        if (customer.address) setAddress(customer.address);
        if (customer.zip) setZip(customer.zip);
        if (customer.city) setCity(customer.city);
        if (customer.phone) setPhone(customer.phone);
      }
      setStep(step + 1);
    } catch (error) {
      setErrorBack(error.response.data.message);
    }
  };

  const majCustomer = async () => {
    const validationErrors = validateCustomerForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL + `/customer/signup/finish`,
        {
          signupStep: step,
          name: name,
          firstName: firstName,
          address: address,
          zip: zip,
          city: city,
          phone: phone,
          activity: activity,
          token: token,
        },
      );
      setStep(step + 1);

      if (step === 1) {
        localStorage.setItem("role", "customer");
        setRole("customer");
        navigate("/");
      }
    } catch (error) {
      setErrorBack(error.response.data.message);
    }
  };

  const nextStep = () => {
    if (step === 0) {
      signupNewCustomer();
    } else {
      majCustomer();
    }
  };

  return (
    <div className={styles["signup-customer"]}>
      {step === 0 && (
        <div className={styles["step0"]}>
          <div className={styles["line"]}>
            <div className={styles["item"]}>
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                placeholder="Votre email"
                name="email"
                id="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <p className={styles["error-message"]}>{errors.email}</p>
            </div>
          </div>
          <div className={styles["line"]}>
            <div className={styles["item"]}>
              <label htmlFor="password">Mot de passe :</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <p className={styles["error-message"]}>{errors.password}</p>
            </div>
          </div>
        </div>
      )}
      {step === 1 && (
        <div className={styles["step1"]}>
          {resumeMessage && (
            <div>
              <p className={styles["resume-message"]}>{resumeMessage}</p>
            </div>
          )}
          <div className={styles["line"]}>
            <div className={styles["item"]}>
              <label htmlFor="name">Nom :</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Votre nom"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <p className={styles["error-message"]}>{errors.name}</p>
            </div>
            <div className={styles["item"]}>
              <label htmlFor="firstName">Prénom :</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Votre prénom"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
              <p className={styles["error-message"]}>{errors.firstName}</p>
            </div>
          </div>
          <div className={styles["line"]}>
            <div className={styles["item"]}>
              <label htmlFor="address">Adresse :</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Votre adresse"
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
              <p className={styles["error-message"]}>{errors.address}</p>
            </div>
          </div>
          <div className={styles["line"]}>
            <div className={styles["item"]}>
              <label htmlFor="zip">Code postal :</label>
              <input
                type="text"
                name="zip"
                id="zip"
                placeholder="Votre code postal"
                value={zip}
                onChange={(event) => {
                  setZip(event.target.value);
                }}
              />
              <p className={styles["error-message"]}>{errors.zip}</p>
            </div>
            <div className={styles["item"]}>
              <label htmlFor="city">Ville :</label>
              <input
                type="city"
                name="city"
                id="city"
                placeholder="Votre ville"
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
              <p className={styles["error-message"]}>{errors.city}</p>
            </div>
          </div>
          <div className={styles["line"]}>
            <div className={styles["item"]}>
              <label htmlFor="phone">Téléphone :</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                placeholder="Votre numéro de téléphone"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
              />
              <p className={styles["error-message"]}>{errors.phone}</p>
            </div>
            <div className={styles["item"]}>
              <label htmlFor="activity">Profession :</label>
              <input
                type="text"
                name="activity"
                id="activity"
                placeholder="Votre profession"
                value={activity}
                onChange={(event) => {
                  setActivity(event.target.value);
                }}
              />
              <p className={styles["error-message"]}>{errors.activity}</p>
            </div>
          </div>
        </div>
      )}
      <div className={styles["buttons"]}>
        {step != 1 && <Button type="button" text="Suivant" action={nextStep} />}

        {step === 1 && (
          <Button type="button" text="Créer mon compte" action={majCustomer} />
        )}
      </div>
      <div>
        <p className={styles["error-message-back"]}>{errorBack}</p>
      </div>
    </div>
  );
};

export default SignupCustomer;
