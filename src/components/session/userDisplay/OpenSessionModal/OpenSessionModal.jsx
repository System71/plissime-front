/* eslint-disable react/prop-types */
import "react-datepicker/dist/react-datepicker.css";
import styles from "./open-session-modal.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../../Button/Button";
import { updateSessionsList } from "../../../../../utils/updateData";
import DatePicker from "react-datepicker";
import { fr } from "date-fns/locale";

const OpenSessionModal = ({
  token,
  setOpenSessionDisplay,
  id,
  setSessionsList,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [state, setState] = useState("scheduled");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [program, setProgram] = useState("");
  const [choice, setChoice] = useState("admin");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `/session/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setName(response.data.customer.name);
        setFirstName(response.data.customer.firstName);
        setTitle(response.data.title);
        setStart(new Date(response.data.start));
        setEnd(new Date(response.data.end));
        setState(response.data.state);
        setContent(response.data.content);
        setPrice(response.data.price);
        setProgram(response.data.program);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la recherche de clients :", error);
      }
    };
    fetchData();
  }, [id, token]);

  const modifySession = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.put(
        import.meta.env.VITE_API_URL + `/session/modify/${id}`,
        {
          title: title,
          start: start,
          end: end,
          state: state,
          content: content,
          price: price,
          program: program,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      updateSessionsList(setSessionsList, token);
      setOpenSessionDisplay(false);
    } catch (error) {
      console.log("error=", error.response.data);
    }
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    if (newValue === "Payée") {
      setShowConfirmModal(true);
    } else {
      setState(newValue);
    }
  };

  const confirmPaymentState = () => {
    setState("Payée");
    setShowConfirmModal(false);
  };

  const cancelPaymentStateChange = () => {
    setState("A payer");
    setShowConfirmModal(false);
  };

  return (
    <div
      className={styles["container"]}
      onClick={() => setOpenSessionDisplay(false)}
    >
      <div
        className={styles["content"]}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles["button-choice"]}>
          <button
            type="button"
            className="session-admin"
            onClick={() => setChoice("admin")}
            style={{ backgroundColor: choice == "admin" && "#a8c6cc" }}
          >
            Administratif
          </button>
          <button
            type="button"
            className="session-content"
            onClick={() => setChoice("content")}
            style={{ backgroundColor: choice == "content" && "#a8c6cc" }}
          >
            Contenu séance
          </button>
        </div>
        <h1>Détail de la session</h1>
        {isLoading ? (
          <p>EN CHARGEMENT</p>
        ) : (
          <div className={styles["sessions-infos"]}>
            {choice == "admin" && (
              <div className={styles["session-admin"]}>
                <div className={styles.line}>
                  <div className={styles.itemInfo}>
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
                  <div className={styles.itemInfo}>
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
                <div className={styles.line}>
                  <div className={styles.itemInfo}>
                    <label htmlFor="title">Nom de la session :</label>
                    <input
                      type="text"
                      placeholder={title}
                      name="title"
                      id="title"
                      value={title}
                      onChange={(event) => {
                        setTitle(event.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className={styles.line}>
                  <div className={styles.itemInfo}>
                    <label htmlFor="start">Début :</label>
                    <DatePicker
                      selected={start}
                      onChange={(date) => {
                        setStart(date);
                        setEnd(date);
                      }}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="dd/MM/yyyy HH:mm"
                      placeholderText="Début de la session"
                      shouldCloseOnSelect={true}
                      timeCaption="Heure"
                      locale={fr}
                      className="custom_input"
                      portalId="react-datepicker-portal"
                    />
                  </div>
                  <div className={styles.itemInfo}>
                    <label htmlFor="end">Fin :</label>
                    <DatePicker
                      selected={end}
                      onChange={(date) => {
                        setStart(date);
                        setEnd(date);
                      }}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="dd/MM/yyyy HH:mm"
                      placeholderText="Fin de la session"
                      shouldCloseOnSelect={true}
                      timeCaption="Heure"
                      locale={fr}
                      className="custom_input"
                      portalId="react-datepicker-portal"
                    />
                  </div>
                </div>
                <div className={styles.line}>
                  <div className={styles.itemInfo}>
                    <label htmlFor="price">Prix :</label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      placeholder={price}
                      value={price}
                      onChange={(event) => {
                        setPrice(event.target.value);
                      }}
                    />
                  </div>
                  <div className={styles.itemInfo}>
                    <label htmlFor="state">Statut :</label>
                    <select
                      name="state"
                      id="state"
                      value={state}
                      onChange={handleChange}
                    >
                      <option value="Confirmée">Confirmée</option>
                      <option value="Annulée">Annulée</option>
                      <option value="À payer">À payer</option>
                      <option value="Payée">Payée</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            {choice == "content" && (
              <div className={styles["session-content"]}>
                <div>
                  <label htmlFor="">Programme :</label>
                  <input
                    type="text"
                    placeholder={program}
                    name="program"
                    id="program"
                    value={program}
                    onChange={(event) => {
                      setProgram(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="content">Contenu :</label>
                  <textarea
                    rows="20"
                    name="content"
                    id="content"
                    placeholder={content}
                    value={content}
                    onChange={(event) => {
                      setContent(event.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
            )}
            <div className={styles.buttons}>
              <Button
                type="button"
                action={() => setOpenSessionDisplay(false)}
                text="Fermer"
              />
              <Button
                type="submit"
                text="Modifier ma session!"
                action={modifySession}
              />
            </div>
          </div>
        )}
        {showConfirmModal && (
          <div
            className={styles["modal-overlay"]}
            onClick={cancelPaymentStateChange}
          >
            <div
              className={styles["modal-content"]}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Confirmer le statut "Payée"</h2>
              <p>
                Vous êtes sur le point de marquer cette session comme{" "}
                <strong>payée</strong>. Veuillez confirmer que le paiement a
                bien été reçu.
              </p>
              <div className={styles["modal-buttons"]}>
                <Button
                  text="Annuler"
                  type="button"
                  action={cancelPaymentStateChange}
                />
                <Button
                  text="Confirmer"
                  type="button"
                  action={confirmPaymentState}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenSessionModal;
