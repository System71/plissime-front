/* eslint-disable react/prop-types */
import styles from "./activation.module.css";
import logo from "../../assets/logo.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import Cookies from "js-cookie";

const Activation = ({ token, setToken }) => {
  const { tokenparam } = useParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [activity, setActivity] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [workingTime, setWorkingTime] = useState("");
  const [availibility, setAvailibility] = useState("");
  const [sportBackground, setSportBackground] = useState("");
  const [healthProblem, setHealthProblem] = useState("");
  const [goals, setGoals] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [choice, setChoice] = useState("admin");
  const [errors, setErrors] = useState({});
  const [errorBack, setErrorBack] = useState("");
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  //Load customer informations
  useEffect(() => {
    localStorage.setItem("role", "customer");
    Cookies.set("plissimeToken", tokenparam);
    setToken(tokenparam);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/customer/informations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.isActive) {
          setIsActive(response.data.isActive);
        } else {
          if (response.data.birthday) {
            const birthdayFormatted = format(
              response.data.birthday,
              "yyyy-MM-dd"
            );
            setBirthday(birthdayFormatted || "");
          }
          setEmail(response.data.email || "");
          setName(response.data.name || "");
          setFirstName(response.data.firstName || "");
          setAddress(response.data.address || "");
          setZip(response.data.zip || "");
          setCity(response.data.city || "");
          setPhone(response.data.phone || "");
          setActivity(response.data.activity || "");
          setWeight(response.data.weight || "");
          setSize(response.data.size || "");
          setWorkingTime(response.data.workingTime || "");
          setAvailibility(response.data.availibility || "");
          setSportBackground(response.data.sportBackground || "");
          setHealthProblem(response.data.healthProblem || "");
          setGoals(response.data.goals || "");
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token, tokenparam, setToken]);

  const validateCustomerForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "L'email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Format d'email invalide.";
    }
    if (!password || password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères.";
    }
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
    } else if (!/^\d+$/.test(phone)) {
      newErrors.phone =
        "Le numéro de téléphone ne doit comporter que des chiffres.";
    }
    if (!activity) {
      newErrors.activity = "L'activité est requise.";
    }
    if (!birthday) {
      newErrors.birthday = "Votre date de naissance est requise.";
    }
    if (!weight) {
      newErrors.weight = "Le poids est requis.";
    }
    if (!size) {
      newErrors.size = "La taille est requise.";
    }
    if (!workingTime) {
      newErrors.workingTime = "Le temps de travil sportif est requis.";
    }
    if (!availibility) {
      newErrors.availibility = "Les disponibilités sont requises.";
    }
    if (!sportBackground) {
      newErrors.sportBackground = "Votre passé de sportif est requis.";
    }
    if (!healthProblem) {
      newErrors.healthProblem =
        "Champ requis. Si pas de problème indiquer RAS.";
    }
    if (!goals) {
      newErrors.goals = "Vos objectifs sont requis.";
    }

    return newErrors;
  };

  const activateCustomer = async () => {
    const validationErrors = validateCustomerForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL + `/customer/activation/${token}`,
        {
          email: email,
          name: name,
          password: password,
          firstName: firstName,
          address: address,
          zip: zip,
          city: city,
          phone: phone,
          birthday: birthday,
          activity: activity,
          weight: weight,
          size: size,
          workingTime: workingTime,
          availibility: availibility,
          sportBackground: sportBackground,
          healthProblem: healthProblem,
          goals: goals,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      setErrorBack(error.response.data.message);
    }
  };

  return (
    <div className={styles["activation"]}>
      <img src={logo} alt="Logo PLISSIME" className="logo-big" />
      {isActive ? (
        <p>Ce compte a déjà été activé.</p>
      ) : (
        <div className={styles["activation-content"]}>
          <div className={styles["button-choice"]}>
            <button
              type="button"
              className="admin-button"
              onClick={() => setChoice("admin")}
              style={{ backgroundColor: choice == "admin" && "#a8c6cc" }}
            >
              Informations personnelles
            </button>
            <button
              type="button"
              className="sport-button"
              onClick={() => setChoice("sport")}
              style={{ backgroundColor: choice == "sport" && "#a8c6cc" }}
            >
              Profil sportif
            </button>
          </div>
          {choice === "admin" && (
            <div className={styles["admin-settings"]}>
              <div>
                <label htmlFor="name">Nom</label>
                <input
                  type="text"
                  placeholder={name}
                  name="name"
                  id="name"
                  value={name}
                  readOnly
                />
                <p className={styles["error-message"]}>{errors.name}</p>
              </div>
              <div>
                <label htmlFor="firstName">Prénom</label>
                <input
                  type="text"
                  placeholder={firstName}
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  readOnly
                />
                <p className={styles["error-message"]}>{errors.firstName}</p>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder={email}
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
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  placeholder={password}
                  name="password"
                  id="passwrod"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <p className={styles["error-message"]}>{errors.password}</p>
              </div>
              <div>
                <label htmlFor="address">Adresse</label>
                <input
                  type="text"
                  placeholder={address}
                  name="address"
                  id="address"
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />
                <p className={styles["error-message"]}>{errors.address}</p>
              </div>
              <div>
                <label htmlFor="zip">Code postal</label>
                <input
                  type="text"
                  placeholder={zip}
                  name="zip"
                  id="zip"
                  value={zip}
                  onChange={(event) => {
                    setZip(event.target.value);
                  }}
                />
                <p className={styles["error-message"]}>{errors.zip}</p>
              </div>
              <div>
                <label htmlFor="city">Ville</label>
                <input
                  type="text"
                  placeholder={city}
                  name="city"
                  id="city"
                  value={city}
                  onChange={(event) => {
                    setCity(event.target.value);
                  }}
                />
                <p className={styles["error-message"]}>{errors.city}</p>
              </div>
              <div>
                <label htmlFor="phone">Téléphone</label>
                <input
                  type="tel"
                  placeholder={phone}
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                />
                <p className={styles["error-message"]}>{errors.phone}</p>
              </div>
              <div>
                <label htmlFor="activity">Profession</label>
                <input
                  type="text"
                  placeholder={activity}
                  name="activity"
                  id="activity"
                  value={activity}
                  onChange={(event) => {
                    setActivity(event.target.value);
                  }}
                />
                <p className={styles["error-message"]}>{errors.activity}</p>
              </div>
            </div>
          )}
          {choice === "sport" && (
            <div className={styles["sport-settings"]}>
              <div>
                <label htmlFor="birthday">Date de naissance</label>
                <input
                  type="date"
                  placeholder={birthday}
                  name="birthday"
                  id="birthday"
                  value={birthday}
                  onChange={(event) => {
                    setBirthday(event.target.value);
                  }}
                />
                <p className={styles["error-message"]}>{errors.birthday}</p>
              </div>
              <div>
                <label htmlFor="weight">Poids</label>
                <input
                  type="number"
                  placeholder={weight}
                  name="weight"
                  id="weight"
                  value={weight}
                  onChange={(event) => {
                    setWeight(event.target.value);
                  }}
                />
                <p className={styles["error-message"]}>{errors.weight}</p>
              </div>
              <div>
                <label htmlFor="size">Taille</label>
                <input
                  type="number"
                  placeholder={size}
                  name="size"
                  id="size"
                  value={size}
                  onChange={(event) => {
                    setSize(event.target.value);
                  }}
                />
                <p className={styles["error-message"]}>{errors.size}</p>
              </div>
              <div>
                <label htmlFor="workingTime">Temps de travail sportif</label>
                <input
                  type="number"
                  placeholder={workingTime}
                  name="workingTime"
                  id="workingTime"
                  value={workingTime}
                  onChange={(event) => {
                    setWorkingTime(event.target.value);
                  }}
                />
                <p className={styles["error-message"]}>{errors.workingTime}</p>
              </div>
              <div>
                <label htmlFor="availibility">Disponibilités</label>
                <input
                  type="text"
                  placeholder={availibility}
                  name="availibility"
                  id="availibility"
                  value={availibility}
                  onChange={(event) => {
                    setAvailibility(event.target.value);
                  }}
                />
                <p className={styles["error-message"]}>{errors.availibility}</p>
              </div>
              <div>
                <label htmlFor="sportBackground">Votre passé de sportif</label>
                <textarea
                  name="sportBackground"
                  id="sportBackground"
                  placeholder={sportBackground}
                  value={sportBackground}
                  rows="10"
                  onChange={(event) => {
                    setSportBackground(event.target.value);
                  }}
                ></textarea>
                <p className={styles["error-message"]}>
                  {errors.sportBackground}
                </p>
              </div>
              <div>
                <label htmlFor="healthProblem">Problèmes de santé</label>
                <input
                  type="text"
                  placeholder={healthProblem}
                  name="healthProblem"
                  id="healthProblem"
                  value={healthProblem}
                  onChange={(event) => {
                    setHealthProblem(event.target.value);
                  }}
                />
                <p className={styles["error-message"]}>
                  {errors.healthProblem}
                </p>
              </div>
              <div>
                <label htmlFor="goals">Objectif(s) sportif(s)</label>
                <input
                  type="text"
                  placeholder={goals}
                  name="goals"
                  id="goals"
                  value={goals}
                  onChange={(event) => {
                    setGoals(event.target.value);
                  }}
                />
                <p className={styles["error-message"]}>{errors.goals}</p>
              </div>
            </div>
          )}
          <div>
            <button
              onClick={() => {
                choice === "admin" ? setChoice("sport") : activateCustomer();
              }}
            >
              Enregistrer mes informations
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activation;
