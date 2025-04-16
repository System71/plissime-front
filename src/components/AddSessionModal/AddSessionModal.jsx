/* eslint-disable react/prop-types */
import "./add-session-modal.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../button/button";

const AddSessionModal = ({ token, setAddSessionDisplay }) => {
  const [searchCustomer, setSearchCustomer] = useState("");
  const [customersList, setCustomersList] = useState([]);
  const [customer, setCustomer] = useState("");
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [state, setState] = useState("scheduled");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [project, setProject] = useState("");

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
          console.log("response=", response.data);
          setCustomersList(response.data);
        } catch (error) {
          console.error("Erreur lors de la recherche de clients :", error);
        }
      };
      fetchCustomers();
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
          project: project,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log("error=", error.response.data);
    }
  };

  return (
    <div className="addSessionModalContainer">
      <div className="addSessionModalContent">
        <form onSubmit={addSession}>
          <h1>Ajouter une session</h1>
          <div className="add-session-customer">
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
            <div className="customers-list">
              <ul>
                {customersList.map((customer, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => setSearchCustomer(customer.name)}
                    >
                      {customer.name} {customer.firstName}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div>
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
            <textarea
              rows="10"
              name="content"
              id="content"
              placeholder="Contenu de la session"
              value={content}
              onChange={(event) => {
                setContent(event.target.value);
              }}
            ></textarea>
          </div>
          <div>
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
            <input
              type="text"
              placeholder="Nom du programme"
              name="project"
              id="project"
              value={project}
              onChange={(event) => {
                setProject(event.target.value);
              }}
            />
          </div>

          <div className="modal-buttons">
            <Button type="submit" text="Ajouter ma session!" />
            <Button
              type="button"
              action={() => setAddSessionDisplay(false)}
              text="Annuler"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSessionModal;
