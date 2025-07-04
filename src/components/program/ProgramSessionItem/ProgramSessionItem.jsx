/* eslint-disable react/prop-types */
import "./program-session-item.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ExerciseItem from "../ExerciseItem/ExerciseItem";

const ProgramSessionItem = ({ token, programId, sessionId }) => {
  const [selectedExerciseId, setSelectedExerciseId] = useState();
  const [exercises, setExercices] = useState([]);

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
        console.log(response.data);
        setExercices(response.data.exercises);
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
      setExercices(response.data.exercises);
      console.log("response=", response.data);
    } catch (error) {
      console.log("error=", error.response.data);
    }
  };

  return (
    <div className="program-session-item">
      <button type="button" onClick={(event) => createExercise(event)}>
        Ajouter un exercice
      </button>
      {exercises.map((exercise) => {
        <ExerciseItem exerciseId={exercise._id} />;
      })}
    </div>
  );
};

export default ProgramSessionItem;
