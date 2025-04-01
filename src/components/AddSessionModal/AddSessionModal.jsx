/* eslint-disable react/prop-types */
import "./add-session-modal.css";
import { useState, useEffect } from "react";
import axios from "axios";

const AddSessionModal = ({ token, setAddSessionDisplay }) => {
  const [searchCustomer, setSearchCustomer] = useState("");
  const [customersList, setCustomerList] = useState("");
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
          setCustomerList(response.data);
        } catch (error) {
          console.error("Erreur lors de la recherche de clients :", error);
        }
      };
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
      <form onSubmit={addSession}>
        <h1>Ajouter une session</h1>
        <div>
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
          <input
            type="text"
            placeholder="Contenu de la session"
            name="content"
            id="content"
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
          />
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

        <div>
          <button>Ajouter ma session!</button>
        </div>
      </form>
      <button
        onClick={() => {
          setAddSessionDisplay(false);
        }}
      >
        Annuler
      </button>
    </div>
  );
};

export default AddSessionModal;
