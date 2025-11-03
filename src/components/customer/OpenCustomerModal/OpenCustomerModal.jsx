/* eslint-disable react/prop-types */
import styles from "./open-customer-modal.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

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
  const [comments, setComments] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [choice, setChoice] = useState("admin");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `/find/customer/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setEmail(response.data.email || "");
        setName(response.data.name || "");
        setFirstName(response.data.firstName || "");
        setAddress(response.data.address || "");
        setZip(response.data.zip || "");
        setCity(response.data.city || "");
        setPhone(response.data.phone || "");
        setBirthday(response.data.birthday || "");
        setActivity(response.data.activity || "");
        setWeight(response.data.weight || "");
        setSize(response.data.size || "");
        setWorkingTime(response.data.workingTime || "");
        setAvailibility(response.data.availibility || "");
        setSportBackground(response.data.sportBackground || "");
        setHealthProblem(response.data.healthProblem || "");
        setGoals(response.data.goals || "");
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la recherche de clients :", error);
      }
    };
    fetchData();
  }, [id, token]);

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
              </div>
              <div>
                <label htmlFor="email">Email</label>
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
              <div>
                <label htmlFor="address">Adresse</label>
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
              <div>
                <label htmlFor="zip">Code postal</label>
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
              <div>
                <label htmlFor="city">Ville</label>
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
              <div>
                <label htmlFor="phone">Téléphone</label>
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
              <div>
                <label htmlFor="activity">Profession</label>
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
              <div>
                <label htmlFor="comments">Profession</label>
                <input
                  type="text"
                  placeholder={comments}
                  name="comments"
                  id="comments"
                  value={comments}
                  onChange={(event) => {
                    setComments(event.target.value);
                  }}
                />
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
                  readOnly
                  onChange={(event) => {
                    setBirthday(event.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="weight">Poids</label>
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
              <div>
                <label htmlFor="size">Taille</label>
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
              <div>
                <label htmlFor="workingTime">Temps de travail sportif</label>
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
              <div>
                <label htmlFor="availibility">Disponibilités</label>
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
              <div>
                <label htmlFor="sportBackground">Votre passé de sportif</label>
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
              <div>
                <label htmlFor="healthProblem">Problèmes de santé</label>
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
              <div>
                <label htmlFor="goals">Objectif(s) sportif(s)</label>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenCustomerModal;
