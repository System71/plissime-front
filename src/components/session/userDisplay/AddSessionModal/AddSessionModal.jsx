/* eslint-disable react/prop-types */
import styles from "./add-session-modal.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../../Button/Button";
import { updateSessionsList } from "../../../../../utils/updateData";

const AddSessionModal = ({ token, setAddSessionDisplay, setSessionsList }) => {
  const [customersListIsVisible, setCustomersListIsVisible] = useState(true);
  const [programsListIsVisible, setProgramsListIsVisible] = useState(true);
  const [searchCustomer, setSearchCustomer] = useState("");
  const [searchProgram, setSearchProgram] = useState("");
  const [customersList, setCustomersList] = useState([]);
  const [programsList, setProgramsList] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [state, setState] = useState("Confirmée");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [program, setProgram] = useState(null);
  const [session, setSession] = useState(null);
  const [choice, setChoice] = useState("admin");
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

  //Loading customer list to search
  useEffect(() => {
    if (!customerId && searchCustomer.length > 1) {
      const fetchCustomers = async () => {
        try {
          const response = await axios.get(
            import.meta.env.VITE_API_URL +
              `/mycustomers?name=${searchCustomer}`,
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

  //Loading programs list to search
  useEffect(() => {
    if (!program && searchProgram.length > 1) {
      const fetchPrograms = async () => {
        try {
          const response = await axios.get(
            import.meta.env.VITE_API_URL + `/programs`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setProgramsList(response.data);
          setProgramsListIsVisible(true);
        } catch (error) {
          console.error("Erreur lors de la recherche de clients :", error);
        }
      };
      fetchPrograms();
    }
    if (searchProgram.length <= 1) {
      setProgramsListIsVisible(false);
    }
  }, [token, searchProgram, program]);

  const addSession = async () => {
    const validationErrors = validateSessionForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/session/add",
        {
          title: title,
          start: start,
          end: end,
          state: state,
          content: content,
          price: price,
          program: program,
          customer: customerId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      updateSessionsList(setSessionsList, token);
      setAddSessionDisplay(false);
    } catch (error) {
      setErrorBack(error.response.data.message);
    }
  };

  const handleChangeState = (event) => {
    setState(event.target.value);
  };
  const handleChangeSession = (event) => {
    setSession(event.target.value);
  };

  return (
    <div
      className={styles["addSessionModalContainer"]}
      onClick={() => setAddSessionDisplay(false)}
    >
      <div
        className={styles["addSessionModalContent"]}
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
        <div className={styles["sessions-infos"]}>
          <h1>Ajouter une session</h1>
          {choice == "admin" && (
            <div className={styles["session-admin"]}>
              <div className={styles["customer"]}>
                <label htmlFor="customer">Nom</label>
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
                <p className={styles["error-message"]}>{errors.customer}</p>
                {customersListIsVisible && (
                  <div className={styles["customers-list"]}>
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
              </div>
              <div>
                <label htmlFor="firstName">Prénom</label>
                <input
                  type="text"
                  placeholder="Prénom du client"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  disabled
                />
              </div>
              <div>
                <label htmlFor="title">Nom de la session</label>
                <input
                  type="text"
                  placeholder="Intitulé de la session"
                  name="title"
                  id="title"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
                <p className={styles["error-message"]}>{errors.title}</p>
              </div>
              <div>
                <label htmlFor="start">Début de la session</label>
                <input
                  type="datetime-local"
                  name="start"
                  id="start"
                  placeholder="Date et heure début"
                  value={start}
                  onChange={(event) => {
                    setStart(event.target.value);
                  }}
                />
                <p className={styles["error-message"]}>{errors.start}</p>
              </div>
              <div>
                <label htmlFor="end">Fin de la session</label>
                <input
                  type="datetime-local"
                  name="end"
                  id="end"
                  placeholder="Date et heure fin"
                  value={end}
                  onChange={(event) => {
                    setEnd(event.target.value);
                  }}
                />
                <p className={styles["error-message"]}>{errors.end}</p>
              </div>
              <div>
                <label htmlFor="price">Prix</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Prix de la session"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
                <p className={styles["error-message"]}>{errors.price}</p>
              </div>
              <div>
                <label htmlFor="state">Statut</label>
                <select name="state" id="state" onChange={handleChangeState}>
                  <option value="Confirmée">Confirmée</option>
                  <option value="Annulée">Annulée</option>
                  <option value="A payer">A payer</option>
                  <option value="Payée">Payée</option>
                </select>
              </div>
            </div>
          )}
          {choice == "content" && (
            <div className={styles["session-content"]}>
              <div className={styles["program"]}>
                <label htmlFor="program">Nom du programme</label>
                <input
                  type="text"
                  placeholder="Nom du programme"
                  name="program"
                  id="program"
                  value={searchProgram}
                  onChange={(event) => {
                    setSearchProgram(event.target.value);
                    setProgram(null);
                  }}
                />
                {programsListIsVisible && (
                  <div className={styles["programs-list"]}>
                    <ul>
                      {programsList.map((program, index) => {
                        return (
                          <li
                            key={index}
                            onClick={() => {
                              setSearchProgram(program.title);
                              setProgramsListIsVisible(false);
                              setProgram(program);
                            }}
                          >
                            {program.title}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="session">Session</label>
                <select
                  name="session"
                  id="session"
                  onChange={handleChangeSession}
                >
                  <option value="">Choisir une session</option>
                  {program &&
                    program.sessions.map((session, index) => (
                      <option value={index + 1} key={session._id}>
                        Session {index + 1}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="content">Contenu de la session</label>
                <textarea
                  rows="20"
                  name="content"
                  id="content"
                  placeholder="Contenu de la session"
                  value={content}
                  onChange={(event) => {
                    setContent(event.target.value);
                  }}
                ></textarea>
              </div>
            </div>
          )}
          <p className={styles["error-message-back"]}>{errorBack}</p>
          <div className={styles["add-session-modal-buttons"]}>
            <Button
              type="button"
              action={() => setAddSessionDisplay(false)}
              text="Annuler"
            />
            <Button
              type="button"
              action={() => addSession()}
              text="Ajouter ma session!"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSessionModal;
