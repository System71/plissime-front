/* eslint-disable react/prop-types */
import "./exercise-item.css";
import { useState, useEffect } from "react";
import axios from "axios";

const ExerciseItem = ({ token, programId, sessionId, exerciseId }) => {
  const [movement, setMovement] = useState("");
  const [series, setSeries] = useState(0);
  const [repetitions, setRepetitions] = useState(0);
  const [weight, setWeight] = useState(0);
  const [duration, setDuration] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [notes, setNotes] = useState("");

  return (
    <div className="exercise-item" key={exerciseId}>
      EXERCISE ITEM
    </div>
  );
};

export default ExerciseItem;
