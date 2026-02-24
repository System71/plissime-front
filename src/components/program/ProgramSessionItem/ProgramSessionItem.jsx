/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styles from "./program-session-item.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ExerciseItem from "../ExerciseItem/ExerciseItem";
import ExerciseCreationItem from "../ExerciseCreationItem/ExerciseCreationItem";

const ProgramSessionItem = ({ token, programId, sessionId }) => {
  const [exercises, setExercises] = useState([]);
  const [creation, setCreation] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [refreshData, setRefreshData] = useState(false);

  //load session
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
            },
          },
        );
        setExercises(response.data.exercises);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token, programId, sessionId, refreshData]);

  const modifyExercise = (exerciseId) => {
    setSelectedExercise(exerciseId);
    setCreation(true);
  };

  const deleteExercise = async (programId, sessionId, exerciseId, token) => {
    try {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/program/${programId}/session/${sessionId}/exercise/${exerciseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setRefreshData((prev) => !prev);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className={styles["program-session-item"]}>
      {creation ? (
        <button
          type="button"
          onClick={() => {
            setSelectedExercise(null);
            setCreation(false);
          }}
        >
          Retour
        </button>
      ) : (
        <div className={styles["buttons"]}>
          <button type="button" onClick={() => setCreation(true)}>
            Ajouter un exercice
          </button>
        </div>
      )}
      {creation ? (
        <ExerciseCreationItem
          token={token}
          programId={programId}
          sessionId={sessionId}
          setCreation={setCreation}
          exerciseId={selectedExercise}
          setRefreshData={setRefreshData}
          setSelectedExercise={setSelectedExercise}
        />
      ) : (
        exercises.map((exercise) => (
          <ExerciseItem
            category={exercise.movement.category}
            movement={exercise.movement.title}
            imageUrl={exercise.movement.imageUrl}
            series={exercise.series}
            repetitions={exercise.repetitions}
            weight={exercise.weight}
            duration={exercise.duration}
            restTime={exercise.restTime}
            notes={exercise.notes}
            modifyExercise={() => modifyExercise(exercise._id)}
            deleteExercise={() =>
              deleteExercise(programId, sessionId, exercise._id, token)
            }
            key={exercise._id}
          />
        ))
      )}
    </div>
  );
};

export default ProgramSessionItem;
