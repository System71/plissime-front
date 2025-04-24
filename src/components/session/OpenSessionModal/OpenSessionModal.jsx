/* eslint-disable react/prop-types */
import "./open-session-modal.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../button/button";
import { toZonedTime } from "date-fns-tz";
import { format } from "date-fns";
import { updateSessionsList } from "../../../../utils/updateData";

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
  const [project, setProject] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("ID session =", id);
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `/session/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("response=", response.data);
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
        setProject(response.data.project);
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
          project: project,
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
    setState(event.target.value);
  };

  return (
    <div className="openSessionModalContainer">
      <div className="openSessionModalContent">
        {isLoading ? (
          <p>EN CHARGEMENT</p>
        ) : (
          <form onSubmit={modifySession}>
            <h1>Détail de la session</h1>
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
              <label htmlFor="content">Contenu de la session</label>
              <textarea
                rows="10"
                name="content"
                id="content"
                placeholder={content}
                value={content}
                onChange={(event) => {
                  setContent(event.target.value);
                }}
              ></textarea>
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
              <label htmlFor="project">Nom du programme</label>
              <input
                type="text"
                placeholder={project}
                name="project"
                id="project"
                value={project}
                onChange={(event) => {
                  setProject(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="state">Statut</label>
              <select name="state" id="state" onChange={handleChange}>
                <option value="Confirmée">Confirmée</option>
                <option value="Annulée">Annulée</option>
                <option value="A payer">A payer</option>
                <option value="Payée">Payée</option>
              </select>
            </div>
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
      </div>
    </div>
  );
};

export default OpenSessionModal;
