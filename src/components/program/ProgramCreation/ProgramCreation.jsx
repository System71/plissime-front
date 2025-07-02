/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "./program-creation.css";
import { useState, useEffect } from "react";
import axios from "axios";

const ProgramCreation = ({ token }) => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [notes, setNotes] = useState("");
  const [sessions, setSessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [choice, setChoice] = useState("infos");

  const createProgram = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.put(
        import.meta.env.VITE_API_URL + `/program/add`,
        {
          title: title,
          // customer: customer,
          startDate: startDate,
          endDate: endDate,
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
    } catch (error) {
      console.log("error=", error.response.data);
    }
  };

  const handleAddSession = () => {
    const newSession = {
      id: sessions.length + 1,
      name: `Session ${sessions.length + 1}`,
      date: "",
      exercices: [],
    };

    setSelectedSessionId(newSession.id);
    setSessions([...sessions, newSession]);
  };

  useEffect(() => {}, [startDate, endDate]);

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
        <form onSubmit={createProgram}>
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
                <label htmlFor="startDate">Date de début</label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={startDate}
                  onChange={(event) => {
                    setStartDate(event.target.value);
                  }}
                />
              </div>
              <div>
                <label htmlFor="endDate">Date de fin</label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  value={endDate}
                  onChange={(event) => {
                    setEndDate(event.target.value);
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
            </div>
          )}
          {choice === "content" && (
            <div className="program-sessions">
              <button type="button" onClick={() => handleAddSession()}>
                Ajouter une session
              </button>

              <div className="sessions-list">
                <select
                  value={selectedSessionId}
                  onChange={(e) => setSelectedSessionId(e.target.value)}
                >
                  <option value="">-- Choisir une session --</option>
                  {sessions.map((session) => (
                    <option key={session.id} value={session.id}>
                      {session.name}
                    </option>
                  ))}
                </select>
                <div className="session-content"></div>
              </div>
            </div>
          )}
          <div className="button-step">
            <button type="button" onClick={() => {}}>
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgramCreation;

// title: title,
//       coach: coach,
//       customer: customer,
//       startDate: startDate,
//       endDate: endDate,
//       notes: notes,
//       sessions: sessions,
