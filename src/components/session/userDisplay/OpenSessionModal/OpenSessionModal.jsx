/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "react-datepicker/dist/react-datepicker.css";
import styles from "./open-session-modal.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../../Button/Button";
import { updateSessionsList } from "../../../../../utils/updateData";
import DatePicker from "react-datepicker";
import { fr } from "date-fns/locale";
import ExerciseList from "../../../program/ExerciseList/ExerciseList";

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
  const [program, setProgram] = useState(null);
  const [programSession, setProgramSession] = useState(null);
  const [choice, setChoice] = useState("admin");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorBack, setErrorBack] = useState("");

  const validateSessionForm = () => {
    const newErrors = {};

    if (!title) {
      newErrors.title = "Le nom de la session est requis.";
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ0-9' ,.-]+$/.test(title)) {
      newErrors.title = "Au moins un caractère est non autorisé.";
    }
    if (!start) {
      newErrors.start = "La date et l'horaire de démarrage sont requis.";
    }
    if (!end) {
      newErrors.end = "La date et l'horaire de démarrage sont requis.";
    }
    if (start > end) {
      newErrors.start =
        "La date de démarrage doit etre antérieure à celle de fin.";
      newErrors.end =
        "La date de démarrage doit etre postérieure à celle de démarrage.";
    }
    if (!price) {
      newErrors.price = "Le prix de la session est requis.";
    }
    return newErrors;
  };

  //Load session
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `/session/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
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
        setProgramSession(response.data.programSession);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la recherche de clients :", error);
      }
    };
    fetchData();
  }, [id, token]);

  //Modify session
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
          },
        },
      );
      updateSessionsList(setSessionsList, token);
      setOpenSessionDisplay(false);
    } catch (error) {
      setErrorBack(error.response.data.message);
    }
  };

  //Remove session
  const removeSession = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.delete(
        import.meta.env.VITE_API_URL + `/session/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      updateSessionsList(setSessionsList, token);
      setShowRemoveModal(false);
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
      className={styles.container}
      onClick={() => setOpenSessionDisplay(false)}
    >
      <div
        className={styles.content}
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
                  <div className={styles.item}>
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
                    <p className={styles["error-message"]}></p>
                  </div>
                  <div className={styles.item}>
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
                    <p className={styles["error-message"]}></p>
                  </div>
                </div>
                <div className={styles.line}>
                  <div className={styles.item}>
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
                    <p className={styles["error-message"]}>{errors.title}</p>
                  </div>
                </div>
                <div className={styles.line}>
                  <div className={styles.item}>
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
                    <p className={styles["error-message"]}>{errors.start}</p>
                  </div>
                  <div className={styles.item}>
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
                    <p className={styles["error-message"]}>{errors.end}</p>
                  </div>
                </div>
                <div className={styles.line}>
                  <div className={styles.item}>
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
                    <p className={styles["error-message"]}>{errors.price}</p>
                  </div>
                  <div className={styles.item}>
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
                    <p className={styles["error-message"]}></p>
                  </div>
                </div>
              </div>
            )}
            {choice == "content" && (
              <div className={styles["session-content"]}>
                {program && (
                  <div className={styles.line}>
                    <div className={styles.item}>
                      <div className={styles.itemInfo}>
                        <label htmlFor="">Programme :</label>
                        <input
                          type="text"
                          placeholder={program.title}
                          name="program"
                          id="program"
                          value={program.title}
                          readOnly
                        />
                      </div>
                      <p className={styles["error-message"]}></p>
                    </div>
                    <div className={styles.item}>
                      <div className={styles.itemInfo}>
                        <label htmlFor="">Session :</label>
                        <input
                          type="text"
                          placeholder={programSession}
                          name="programSession"
                          id="programSession"
                          value={programSession}
                          readOnly
                        />
                      </div>
                      <p className={styles["error-message"]}></p>
                    </div>
                  </div>
                )}
                <div className={styles.line}>
                  {program && programSession ? (
                    <ExerciseList
                      token={token}
                      programId={program._id}
                      sessionId={programSession}
                    />
                  ) : (
                    <div className={styles.sessionContent}>
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
                  )}
                </div>
              </div>
            )}
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
        {showRemoveModal && (
          <div
            className={styles["modal-overlay"]}
            onClick={() => setShowRemoveModal(false)}
          >
            <div
              className={styles["modal-content"]}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Suppression de la session</h2>
              <p>
                Merci de confirmer votre volonté de supprimer cette session.
              </p>
              <div className={styles["modal-buttons"]}>
                <Button
                  text="Annuler"
                  type="button"
                  action={() => setShowRemoveModal(false)}
                />
                <Button text="Confirmer" type="button" action={removeSession} />
              </div>
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
            type="button"
            action={() => setShowRemoveModal(true)}
            text="Supprimer session"
          />
          <Button
            type="submit"
            text="Modifier ma session!"
            action={modifySession}
          />
        </div>
      </div>
    </div>
  );
};

export default OpenSessionModal;
