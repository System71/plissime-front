/* eslint-disable react/prop-types */
import "./program-session-item.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ExerciseItem from "../ExerciseItem/ExerciseItem";
import ExerciseCreationItem from "../ExerciseCreationItem/ExerciseCreationItem";

const ProgramSessionItem = ({ token, programId, sessionId }) => {
  const [selectedExerciseId, setSelectedExerciseId] = useState();
  const [exercises, setExercises] = useState([]);

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
        setExercises(response.data.exercises);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token, programId, sessionId]);

  return (
    <div className="program-session-item">
      <button type="button">Ajouter un exercice</button>
      <ExerciseCreationItem
        token={token}
        setExercises={setExercises}
        programId={programId}
        sessionId={sessionId}
      />
      {/* {exercises.map((exercise) => (
        <ExerciseItem
          token={token}
          programId={programId}
          sessionId={sessionId}
          exerciseId={exercise._id}
          key={exercise._id}
        />
      ))} */}
    </div>
  );
};

export default ProgramSessionItem;
