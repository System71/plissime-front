/* eslint-disable react/prop-types */
import "./program-session-item.css";
import { useState, useEffect } from "react";
import axios from "axios";

const ProgramSessionItem = ({ token, programId, sessionId }) => {
  const [date, setDate] = useState();
  const [selectedExerciseId, setSelectedExerciseId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/program/${programId}/session/${sessionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setDate(response.data.date);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token, programId, sessionId]);

  const createExercise = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL +
          `/program/${programId}/session/${sessionId}/exercise/add`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSelectedExerciseId(response.data.sessions[sessionId].exercises.length);
      console.log("response=", response.data);
    } catch (error) {
      console.log("error=", error.response.data);
    }
  };

  return (
    <div className="program-session-item">
      <div>
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={(event) => {
            setDate(event.target.value);
          }}
        />
      </div>
      <button type="button" onClick={(event) => createExercise(event)}>
        Ajouter un exercice
      </button>
    </div>
  );
};

export default ProgramSessionItem;
