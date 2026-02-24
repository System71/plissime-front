/* eslint-disable react/prop-types */
import styles from "./exercise-list.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ExerciseItem from "../ExerciseItem/ExerciseItem";

const ExerciseList = ({ token, programId, sessionId }) => {
  const [exercises, setExercises] = useState([]);

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
  }, [token, programId, sessionId]);

  return (
    <div className={styles.ExerciseList}>
      {exercises.map((exercise) => (
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
          modifyExercise={null}
          deleteExercise={null}
          key={exercise._id}
        />
      ))}
    </div>
  );
};

export default ExerciseList;
