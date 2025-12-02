/* eslint-disable react/prop-types */
import styles from "./open-customer-modal.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

const OpenCustomerModal = ({ token, setOpenCustomerDisplay, id }) => {
  const [email, setEmail] = useState("");
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
  const [date, setDate] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [choice, setChoice] = useState("admin");

  const modifyCustomer = async () => {
    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL + `/mycustomer/informations`,
        {
          email: email,
          date: date,
          isActive: isActive,
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Erreur lors de la MAJ client :", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `/find/customer/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setEmail(response.data.customerToFind.email || "");
        setName(response.data.customerToFind.name || "");
        setFirstName(response.data.customerToFind.firstName || "");
        setAddress(response.data.customerToFind.address || "");
        setZip(response.data.customerToFind.zip || "");
        setCity(response.data.customerToFind.city || "");
        setPhone(response.data.customerToFind.phone || "");
        setBirthday(response.data.customerToFind.birthday || "");
        setActivity(response.data.customerToFind.activity || "");
        setWeight(response.data.customerToFind.weight || "");
        setSize(response.data.customerToFind.size || "");
        setWorkingTime(response.data.customerToFind.workingTime || "");
        setAvailibility(response.data.customerToFind.availibility || "");
        setSportBackground(response.data.customerToFind.sportBackground || "");
        setHealthProblem(response.data.customerToFind.healthProblem || "");
        setGoals(response.data.customerToFind.goals || "");
        setComment(response.data.coachInfo.comment);
        setIsActive(response.data.coachInfo.isActive);
        const formatedDate = format(response.data.coachInfo.date, "dd/LL/yyyy");
        setDate(formatedDate);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la recherche de clients :", error);
      }
    };
    fetchData();
  }, [id, token]);

  const handleChangeState = (event) => {
    setIsActive(event.target.value);
  };

  return (
    <div
      className={styles["container"]}
      onClick={() => setOpenCustomerDisplay(false)}
    >
      {isLoading ? (
        <p>EN CHARGEMENT</p>
      ) : (
        <div
          className={styles["content"]}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
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
              <div className={styles["line"]}>
                <div className={styles["item"]}>
                  <label htmlFor="name">Nom :</label>
                  <input
                    type="text"
                    placeholder={name}
                    name="name"
                    id="name"
                    value={name}
                    readOnly
                  />
                </div>
                <div className={styles["item"]}>
                  <label htmlFor="firstName">Prénom :</label>
                  <input
                    type="text"
                    placeholder={firstName}
                    name="firstName"
                    id="firstName"
                    value={firstName}
                    readOnly
                  />
                </div>
              </div>
              <div className={`${styles["item"]} ${styles["line"]}`}>
                <label htmlFor="address">Adresse :</label>
                <input
                  type="text"
                  placeholder={address}
                  name="address"
                  id="address"
                  value={address}
                  readOnly
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />
              </div>
              <div className={styles["line"]}>
                <div className={styles["item"]}>
                  <label htmlFor="zip">Code postal :</label>
                  <input
                    type="text"
                    placeholder={zip}
                    name="zip"
                    id="zip"
                    value={zip}
                    readOnly
                    onChange={(event) => {
                      setZip(event.target.value);
                    }}
                  />
                </div>
                <div className={styles["item"]}>
                  <label htmlFor="city">Ville :</label>
                  <input
                    type="text"
                    placeholder={city}
                    name="city"
                    id="city"
                    value={city}
                    readOnly
                    onChange={(event) => {
                      setCity(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className={styles["line"]}>
                <div className={styles["item"]}>
                  <label htmlFor="phone">Téléphone :</label>
                  <input
                    type="tel"
                    placeholder={phone}
                    name="phone"
                    id="phone"
                    value={phone}
                    readOnly
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                  />
                </div>
                <div className={styles["item"]}>
                  <label htmlFor="email">Email :</label>
                  <input
                    type="email"
                    placeholder={email}
                    name="email"
                    id="email"
                    value={email}
                    readOnly
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className={styles["line"]}>
                <div className={styles["item"]}>
                  <label htmlFor="activity">Profession :</label>
                  <input
                    type="text"
                    placeholder={activity}
                    name="activity"
                    id="activity"
                    value={activity}
                    readOnly
                    onChange={(event) => {
                      setActivity(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className={styles["line"]}>
                <div className={styles["item"]}>
                  <label htmlFor="date">Date de création :</label>
                  <input
                    type="text"
                    placeholder={date}
                    name="date"
                    id="date"
                    value={date}
                    readOnly
                    onChange={(event) => {
                      setDate(event.target.value);
                    }}
                  />
                </div>
                <div className={styles["item"]}>
                  <label htmlFor="statut">Statut :</label>
                  <select
                    name="statut"
                    id="statut"
                    value={isActive}
                    onChange={handleChangeState}
                  >
                    <option value="true">Actif</option>
                    <option value="false">Inactif</option>
                  </select>
                </div>
              </div>
              <div className={styles["comment"]}>
                <label htmlFor="comments">Commentaire du coach :</label>
                <textarea
                  name="comment"
                  id="comment"
                  value={comment}
                  onChange={(event) => {
                    setComment(event.target.value);
                  }}
                  rows="5"
                ></textarea>
              </div>
            </div>
          )}
          {choice === "sport" && (
            <div className={styles["sport-settings"]}>
              <div className={`${styles["item"]} ${styles["line"]}`}>
                <label htmlFor="birthday">Date de naissance :</label>
                <input
                  type="date"
                  placeholder={birthday}
                  name="birthday"
                  id="birthday"
                  value={birthday}
                  readOnly
                  onChange={(event) => {
                    setBirthday(event.target.value);
                  }}
                />
              </div>
              <div className={styles["line"]}>
                <div className={styles["item"]}>
                  <label htmlFor="weight">Poids :</label>
                  <input
                    type="number"
                    placeholder={weight}
                    name="weight"
                    id="weight"
                    value={weight}
                    readOnly
                    onChange={(event) => {
                      setWeight(event.target.value);
                    }}
                  />
                </div>
                <div className={styles["item"]}>
                  <label htmlFor="size">Taille :</label>
                  <input
                    type="number"
                    placeholder={size}
                    name="size"
                    id="size"
                    value={size}
                    readOnly
                    onChange={(event) => {
                      setSize(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div className={`${styles["item"]} ${styles["line"]}`}>
                <label htmlFor="workingTime">Temps de travail sportif :</label>
                <input
                  type="number"
                  placeholder={workingTime}
                  name="workingTime"
                  id="workingTime"
                  value={workingTime}
                  readOnly
                  onChange={(event) => {
                    setWorkingTime(event.target.value);
                  }}
                />
              </div>
              <div className={`${styles["item"]} ${styles["line"]}`}>
                <label htmlFor="availibility">Disponibilités :</label>
                <input
                  type="text"
                  placeholder={availibility}
                  name="availibility"
                  id="availibility"
                  value={availibility}
                  readOnly
                  onChange={(event) => {
                    setAvailibility(event.target.value);
                  }}
                />
              </div>
              <div className={styles["comment"]}>
                <label htmlFor="sportBackground">
                  Votre passé de sportif :
                </label>
                <textarea
                  name="sportBackground"
                  id="sportBackground"
                  placeholder={sportBackground}
                  value={sportBackground}
                  readOnly
                  rows="10"
                  onChange={(event) => {
                    setSportBackground(event.target.value);
                  }}
                ></textarea>
              </div>
              <div className={styles["comment"]}>
                <label htmlFor="healthProblem">Problèmes de santé :</label>
                <input
                  type="text"
                  placeholder={healthProblem}
                  name="healthProblem"
                  id="healthProblem"
                  value={healthProblem}
                  readOnly
                  onChange={(event) => {
                    setHealthProblem(event.target.value);
                  }}
                />
              </div>
              <div className={styles["comment"]}>
                <label htmlFor="goals">Objectif(s) sportif(s) :</label>
                <input
                  type="text"
                  placeholder={goals}
                  name="goals"
                  id="goals"
                  value={goals}
                  readOnly
                  onChange={(event) => {
                    setGoals(event.target.value);
                  }}
                />
              </div>
            </div>
          )}
          <div className={styles["open-session-modal-buttons"]}>
            <button type="button" onClick={() => setOpenCustomerDisplay(false)}>
              Fermer
            </button>
            <button
              type="button"
              onClick={() => {
                modifyCustomer();
                setOpenCustomerDisplay(false);
              }}
            >
              Enregistrer et fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenCustomerModal;
