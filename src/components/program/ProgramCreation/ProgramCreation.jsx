/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "./program-creation.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ProgramSessionItem from "../ProgramSessionItem/ProgramSessionItem";

const ProgramCreation = ({ token }) => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState();
  const [notes, setNotes] = useState("");
  const [sessions, setSessions] = useState([]);
  const [choice, setChoice] = useState("infos");
  const [programId, setProgramId] = useState();
  const [selectedSessionId, setSelectedSessionId] = useState();
  const [numberSessions, setNumberSessions] = useState(0);

  const createProgram = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + `/program/add`,
        {
          title: title,
          duration: duration,
          notes: notes,
          sessions: sessions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response=", response.data);
      setProgramId(response.data._id);
    } catch (error) {
      console.log("error=", error.response.data);
    }
  };

  const createSession = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + `/program/${programId}/session/add`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSelectedSessionId(response.data.sessions.length);
      setNumberSessions(response.data.sessions.length);
      console.log("response=", response.data);
    } catch (error) {
      console.log("error=", error.response.data);
    }
  };

  const options = [];
  for (let i = 0; i < numberSessions; i++) {
    options.push(
      <option key={i} value={i + 1}>
        Session {i + 1}
      </option>
    );
  }

  useEffect(() => {}, []);

  return (
    <div className="program-creation">
      <h2>Création de programme</h2>
      <div className="button-choice">
        <button
          type="button"
          className="infos-button"
          onClick={() => setChoice("infos")}
          style={{ backgroundColor: choice == "infos" && "#a8c6cc" }}
        >
          Informations
        </button>
        <button
          type="button"
          className="content-button"
          onClick={() => setChoice("content")}
          style={{ backgroundColor: choice == "content" && "#a8c6cc" }}
        >
          Contenu
        </button>
      </div>
      <div className="program-creation-content">
        <form>
          {choice === "infos" && (
            <div className="program-infos">
              <div>
                <label htmlFor="title">Nom du programme</label>
                <input
                  type="text"
                  placeholder="Mon programme"
                  name="title"
                  id="title"
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="duration">Durée (Nombre de séances)</label>
                <input
                  type="Number"
                  name="duration"
                  id="duration"
                  value={duration}
                  onChange={(event) => {
                    setDuration(event.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="notes">Notes personnelles</label>
                <textarea
                  name="notes"
                  id="notes"
                  placeholder="Renseignements spécifiques au programme"
                  value={notes}
                  onChange={(event) => {
                    setNotes(event.target.value);
                  }}
                  rows={"5"}
                ></textarea>
              </div>
              <div className="button-step">
                <button
                  type="button"
                  onClick={(event) => {
                    if (programId) {
                      // afficher popup erreur
                    } else {
                      createProgram(event);
                      setChoice("content");
                    }
                  }}
                >
                  Créer mon programme
                </button>
              </div>
            </div>
          )}
          {choice === "content" && (
            <div className="program-sessions">
              <button type="button" onClick={(event) => createSession(event)}>
                Ajouter une session
              </button>

              <div className="sessions-list">
                <select
                  value={selectedSessionId}
                  onChange={(e) => setSelectedSessionId(e.target.value)}
                >
                  {options}
                </select>
                {selectedSessionId && (
                  <ProgramSessionItem
                    token={token}
                    programId={programId}
                    sessionId={selectedSessionId}
                  />
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProgramCreation;
