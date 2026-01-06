/* eslint-disable react/prop-types */
import styles from "./signup-user.module.css";
import { useState } from "react";
import Button from "../../Button/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SignupUser = ({ setToken, token, setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [activity, setActivity] = useState("");
  const [siret, setSiret] = useState("");
  const [certification, setCertification] = useState("");
  const [errors, setErrors] = useState({});
  const [errorBack, setErrorBack] = useState("");
  const [step, setStep] = useState(0);
  const [resumeMessage, setResumeMessage] = useState(null);

  const navigate = useNavigate();

  const validateUserForm = () => {
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
      }

      if (!firstName) {
        newErrors.firstName = "Le prénom est requis.";
      }

      if (!address) {
        newErrors.address = "L'adresse est requise.";
      }

      if (!zip) {
        newErrors.zip = "Le code postal est requis.";
      } else if (zip.length != 5) {
        newErrors.zip = "Le code postal doit comporter 5 chiffres.";
      }

      if (!city) {
        newErrors.city = "La ville est requise.";
      }

      if (!phone) {
        newErrors.phone = "Le numéro de téléphone est requis.";
      } else if (!/^\d{10}$/.test(phone)) {
        newErrors.phone =
          "Le numéro de téléphone ne doit comporter exactement 10 chiffres.";
      }
    } else if (step === 2) {
      if (!activity) {
        newErrors.activity = "L'activité est requise.";
      }

      if (!siret) {
        newErrors.siret = "Le numéro de SIRET est requis.";
      } else if (!/^\d+$/.test(siret)) {
        newErrors.siret =
          "Le numéro de SIRET ne doit comporter que des chiffres.";
      } else if (siret.length != 14) {
        newErrors.siret = "Le numéro de SIRET doit comporter 14 caractères.";
      }
    }

    return newErrors;
  };

  const signupNewUser = async () => {
    const validationErrors = validateUserForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + `/user/signup/new`,
        {
          signupStep: step,
          email: email,
          password: password,
        }
      );
      if (response.data.newUser) {
        const user = response.data.newUser;
        setToken(user.token);
        Cookies.set("plissimeToken", user.token);
      }
      if (response.data.userToSearch) {
        const user = response.data.userToSearch;
        setToken(user.token);
        Cookies.set("plissimeToken", user.token);
        setResumeMessage(
          "Nous sommes heureux de vous revoir.\n Vous pouvez désormais finaliser votre inscription!"
        );
        if (user.name) setName(user.name);
        if (user.firstName) setFirstName(user.firstName);
        if (user.address) setAddress(user.address);
        if (user.zip) setZip(user.zip);
        if (user.city) setCity(user.city);
        if (user.phone) setPhone(user.phone);
      }
      setStep(step + 1);
    } catch (error) {
      setErrorBack(error.response.data.message);
    }
  };

  const majUser = async () => {
    const validationErrors = validateUserForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL + `/user/signup/finish`,
        {
          signupStep: step,
          name: name,
          firstName: firstName,
          address: address,
          zip: zip,
          city: city,
          phone: phone,
          activity: activity,
          siret: siret,
          certification: certification,
          token: token,
        }
      );
      setStep(step + 1);

      if (step === 2) {
        localStorage.setItem("role", "coach");
        setRole("coach");
        navigate("/");
      }
    } catch (error) {
      setErrorBack(error.response.data.message);
    }
  };

  const nextStep = () => {
    if (step === 0) {
      signupNewUser();
    } else {
      majUser();
    }
  };

  return (
    <div className={styles["signup-user"]}>
      {step === 0 && (
        <div className={styles["step0"]}>
          <div>
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
          <div>
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
      )}
      {step === 1 && (
        <div className={styles["step1"]}>
          {resumeMessage && (
            <div>
              <p className={styles["resume-message"]}>{resumeMessage}</p>
            </div>
          )}
          <div>
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
          <div>
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
          <div>
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
          <div>
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
          <div>
            <label htmlFor="city">Ville :</label>
            <input
              type="text"
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
          <div>
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
        </div>
      )}
      {step === 2 && (
        <div className={styles["step2"]}>
          <div>
            <label htmlFor="activity">Activité :</label>
            <input
              type="text"
              name="activity"
              id="activity"
              placeholder="Votre activité"
              value={activity}
              onChange={(event) => {
                setActivity(event.target.value);
              }}
            />
            <p className={styles["error-message"]}>{errors.activity}</p>
          </div>
          <div>
            <label htmlFor="siret">SIRET :</label>
            <input
              type="text"
              name="siret"
              id="siret"
              placeholder="Votre SIRET"
              value={siret}
              onChange={(event) => {
                setSiret(event.target.value);
              }}
            />
            <p className={styles["error-message"]}>{errors.siret}</p>
          </div>
          <div>
            <label htmlFor="certfification">Certification :</label>
            <input
              type="text"
              name="certification"
              id="certification"
              placeholder="Votre numéro de certification"
              value={certification}
              onChange={(event) => {
                setCertification(event.target.value);
              }}
            />
            <p className={styles["error-message"]}>{errors.certification}</p>
          </div>
        </div>
      )}
      <div className={styles["buttons"]}>
        {step != 2 && <Button type="button" text="Suivant" action={nextStep} />}

        {step === 2 && (
          <Button type="button" text="Créer mon compte" action={majUser} />
        )}
      </div>
      <div>
        <p className={styles["error-message-back"]}>{errorBack}</p>
      </div>
    </div>
  );
};

export default SignupUser;
