/* eslint-disable react/prop-types */
import styles from "./open-customer-subscription-modal.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../Button/Button";

const OpenCustomerModal = ({
  token,
  setOpenCustomerSubscriptionDisplay,
  id,
}) => {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [sessionPrice, setSessionPrice] = useState("");
  const [sessionUsed, setSessionUsed] = useState("");
  const [sessionInitial, setSessionInitial] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `/subscription/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setName(response.data.customer.name);
        setFirstName(response.data.customer.firstName);
        const formatedDate = format(response.data.date, "dd/LL/yyyy");
        setDate(formatedDate);
        setTitle(response.data.title);
        setSessionPrice(response.data.sessionPrice);
        setSessionInitial(response.data.sessionInitial);
        setSessionUsed(response.data.sessionUsed);
        setIsPaid(response.data.isPaid);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur chargement abonnement :", error);
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
          <h1>Détail abonnement</h1>
          <div className={styles["customer-subscription-infos"]}>
            <div className={styles["session-admin"]}>
              <div className={styles.customer}>
                <div className={styles.line}>
                  <div className={`${styles["item"]}`}>
                    <label htmlFor="customer">Nom :</label>
                    <input
                      type="text"
                      placeholder="Client"
                      name="name"
                      id="name"
                      value={name}
                      readOnly
                    />
                  </div>
                  <div className={styles.item}>
                    <label htmlFor="firstName">Prénomm :</label>
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
              </div>
              <div className={`${styles.item} ${styles.line}`}>
                <label htmlFor="title">Nom de l'abonnement :</label>
                <input
                  type="text"
                  placeholder="Intitulé de l'abonnement"
                  name="title"
                  id="title"
                  value={title}
                  readOnly
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
                    readOnly
                  />
                </div>
                <div className={styles.item}>
                  <label htmlFor="sessionInitial">Sessions utilisées :</label>
                  <input
                    type="number"
                    name="sessionUsed"
                    id="sessionUsed"
                    placeholder="Nombre sessions"
                    value={sessionUsed}
                    readOnly
                  />
                </div>
              </div>
              <div className={styles.line}>
                <div className={styles.item}>
                  <label htmlFor="sessionPrice">Prix / session :</label>
                  <input
                    type="number"
                    name="sessionPrice"
                    id="sessionPrice"
                    placeholder="Prix session"
                    value={sessionPrice}
                    readOnly
                  />
                </div>
                <div className={styles.item}>
                  <label htmlFor="totalPrice">Montant total :</label>
                  <input
                    type="number"
                    name="totalPrice"
                    id="totalPrice"
                    placeholder="Montant total"
                    value={sessionPrice * sessionInitial}
                    readOnly
                  />
                </div>
              </div>
              <div className={styles.line}>
                <div className={styles.item}>
                  <label htmlFor="date">Date :</label>
                  <input
                    type="text"
                    name="date"
                    id="date"
                    placeholder="Date"
                    value={date}
                    readOnly
                  />
                </div>
                <div className={styles.item}>
                  <label htmlFor="isPaid">Statut :</label>
                  <input
                    type="text"
                    name="isPaid"
                    id="isPaid"
                    placeholder="Prix session"
                    value={isPaid ? "Payé" : "Non payé"}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles["open-customer-subscription-modal-buttons"]}>
            <Button
              type="button"
              action={() => setOpenCustomerSubscriptionDisplay(false)}
              text="Fermer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenCustomerModal;
