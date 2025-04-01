/* eslint-disable react/prop-types */
import "./open-session-modal.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../button/button";

const OpenSessionModal = ({ token, setOpenSessionDisplay, id }) => {
  const [isLoading, setIsLoading] = useState(true);
  // const [name, setName] = useState("");
  // const [firstName, setFirstName] = useState("");
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
        // setName(response.data.customer.name);
        // setFirstName(response.data.customer.firstName);
        setTitle(response.data.title);
        setStart(response.data.start);
        setEnd(response.data.end);
        setState(response.data.state);
        setContent(response.data.content);
        setPrice(response.data.price);
        setProject(response.data.project);
        setIsLoading(false);
        console.log("fetchdata fini");
        console.log("title=", title);
      } catch (error) {
        console.error("Erreur lors de la recherche de clients :", error);
      }
    };
    fetchData();
  }, [id, token]);

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
      <h1>Détail de la session</h1>
      {isLoading ? (
        <p>EN CHARGEMENT</p>
      ) : (
        <form onSubmit={addSession}>
          {/* <div>
            <input
              type="text"
              placeholder={name}
              name="name"
              id="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder={firstName}
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </div> */}

          <div>
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

          <div className="modal-buttons">
            <Button type="submit" text="Modifier ma session!" />
            <Button
              type="button"
              action={() => setOpenSessionDisplay(false)}
              text="Fermer"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default OpenSessionModal;
