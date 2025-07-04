/* eslint-disable react/prop-types */
import "./add-session-modal.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../../Button/button";
import { updateSessionsList } from "../../../../../utils/updateData";

const AddSessionModal = ({ token, setAddSessionDisplay, setSessionsList }) => {
  const [listIsVisible, setListIsVisible] = useState(true);
  const [searchCustomer, setSearchCustomer] = useState("");
  const [customersList, setCustomersList] = useState([]);
  const [customer, setCustomer] = useState("");
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [state, setState] = useState("Confirmée");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [program, setProgram] = useState("");
  const [choice, setChoice] = useState("admin");

  useEffect(() => {
    if (searchCustomer.length > 1) {
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
        } catch (error) {
          console.error("Erreur lors de la recherche de clients :", error);
        }
      };
      fetchCustomers();
    }
    if (searchCustomer.length <= 1) {
      setListIsVisible(true);
    }
  }, [searchCustomer, token]);

  const addSession = async (event) => {
    try {
      event.preventDefault();
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
          customer: customer,
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
      console.log("error=", error.response.data);
    }
  };

  const handleChange = (event) => {
    setState(event.target.value);
  };

  return (
    <div
      className="addSessionModalContainer"
      onClick={() => setAddSessionDisplay(false)}
    >
      <div
        className="addSessionModalContent"
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
        <form onSubmit={addSession}>
          <h1>Ajouter une session</h1>
          {choice == "admin" && (
            <div className="session-admin">
              <div className="add-session-customer">
                <label htmlFor="customer">Nom du client</label>
                <input
                  type="text"
                  placeholder="Client"
                  name="customer"
                  id="customer"
                  value={searchCustomer}
                  onChange={(event) => {
                    setSearchCustomer(event.target.value);
                  }}
                />
                {listIsVisible && (
                  <div className="customers-list">
                    <ul>
                      {customersList.map((customer, index) => {
                        return (
                          <li
                            key={index}
                            onClick={() => {
                              setSearchCustomer(customer.name);
                              setListIsVisible(false);
                              setCustomer(customer._id);
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
            </div>
          )}
          {choice == "content" && (
            <div className="session-content">
              <div>
                <label htmlFor="program">Nom du programme</label>
                <input
                  type="text"
                  placeholder="Nom du programme"
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
                  placeholder="Contenu de la session"
                  value={content}
                  onChange={(event) => {
                    setContent(event.target.value);
                  }}
                ></textarea>
              </div>
            </div>
          )}
          <div className="add-session-modal-buttons">
            <Button
              type="button"
              action={() => setAddSessionDisplay(false)}
              text="Annuler"
            />
            <Button type="submit" text="Ajouter ma session!" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSessionModal;
