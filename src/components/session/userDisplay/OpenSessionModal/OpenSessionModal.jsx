/* eslint-disable react/prop-types */
import "./open-session-modal.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../../Button/button";
import { toZonedTime } from "date-fns-tz";
import { format } from "date-fns";
import { updateSessionsList } from "../../../../../utils/updateData";

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
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
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
        const startTZ = toZonedTime(response.data.start, "Europe/Paris");
        const startFormatted = format(startTZ, "yyy-MM-dd'T'HH:mm");
        const endTZ = toZonedTime(response.data.end, "Europe/Paris");
        const endFormatted = format(endTZ, "yyy-MM-dd'T'HH:mm");

        setName(response.data.customer.name);
        setFirstName(response.data.customer.firstName);
        setTitle(response.data.title);
        setStart(startFormatted);
        setEnd(endFormatted);
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
      className="openSessionModalContainer"
      onClick={() => setOpenSessionDisplay(false)}
    >
      <div
        className="openSessionModalContent"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="button-choice">
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

        {isLoading ? (
          <p>EN CHARGEMENT</p>
        ) : (
          <form onSubmit={modifySession}>
            <h1>Détail de la session</h1>
            {choice == "admin" && (
              <div className="session-admin">
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
                  <label htmlFor="firstName">Prénom</label>{" "}
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
                  <label htmlFor="title">Intitulé de la session</label>
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
                <div>
                  <label htmlFor="start">Début de la session</label>
                  <input
                    type="datetime-local"
                    name="start"
                    id="start"
                    placeholder={start}
                    value={start}
                    onChange={(event) => {
                      setStart(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="end">Fin de la session</label>
                  <input
                    type="datetime-local"
                    name="end"
                    id="end"
                    placeholder={end}
                    value={end}
                    onChange={(event) => {
                      setEnd(event.target.value);
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="price">Prix</label>
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
                <div>
                  <label htmlFor="state">Statut</label>
                  <select
                    name="state"
                    id="state"
                    value={state}
                    onChange={handleChange}
                  >
                    <option value="Confirmée">Confirmée</option>
                    <option value="Annulée">Annulée</option>
                    <option value="A payer">A payer</option>
                    <option value="Payée">Payée</option>
                  </select>
                </div>
              </div>
            )}
            {choice == "content" && (
              <div className="session-content">
                <div>
                  <label htmlFor="">Nom du programme</label>
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
                  <label htmlFor="content">Contenu de la session</label>
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
            <div className="open-session-modal-buttons">
              <Button
                type="button"
                action={() => setOpenSessionDisplay(false)}
                text="Fermer"
              />
              <Button type="submit" text="Modifier ma session!" />
            </div>
          </form>
        )}
        {showConfirmModal && (
          <div className="modal-overlay" onClick={cancelPaymentStateChange}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Confirmer le statut "Payée"</h2>
              <p>
                Vous êtes sur le point de marquer cette session comme{" "}
                <strong>payée</strong>. Veuillez confirmer que le paiement a
                bien été reçu.
              </p>
              <div className="modal-buttons">
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
