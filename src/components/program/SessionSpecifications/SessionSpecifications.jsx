/* eslint-disable react/prop-types */
import styles from "./session-specifications.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ExerciseSpecifications from "../ExerciseSpecifications/ExerciseSpecifications";

const SessionSpecifications = ({ token, programId, sessionId }) => {
  const [exercises, setExercises] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setExercises(response.data.exercises);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token, programId, sessionId, refreshData]);

  return isLoading ? (
    <p>En chargement</p>
  ) : (
    <div className={styles["program-session-item"]}>
      {exercises &&
        exercises.map((exercise) => (
          <ExerciseSpecifications
            category={exercise.movement.category}
            movement={exercise.movement.title}
            imageUrl={exercise.movement.imageUrl}
            series={exercise.series}
            repetitions={exercise.repetitions}
            weight={exercise.weight}
            duration={exercise.duration}
            restTime={exercise.restTime}
            notes={exercise.notes}
            id={exercise._id}
            key={exercise._id}
          />
        ))}
    </div>
  );
};

export default SessionSpecifications;
