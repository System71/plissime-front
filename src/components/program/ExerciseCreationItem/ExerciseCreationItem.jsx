import "./exercise-creation-item.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../Button/Button";

const ExerciseCreationItem = ({
  token,
  programId,
  sessionId,
  setCreation,
  exerciseId,
  setRefreshData,
  setSelectedExercise,
}) => {
  const [movementsList, setMovementsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredMovements, setFilteredMovements] = useState([]);
  const [movement, setMovement] = useState({});
  const [series, setSeries] = useState(0);
  const [repetitions, setRepetitions] = useState(0);
  const [weight, setWeight] = useState(0);
  const [duration, setDuration] = useState(0);
  const [restTime, setRestTime] = useState(0);
  const [notes, setNotes] = useState("");

  //Import all movements
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/movements`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setMovementsList(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token]);

  //Create unique category
  const categories = [...new Set(movementsList.map((m) => m.category))];

  useEffect(() => {
    if (selectedCategory) {
      setFilteredMovements(
        movementsList.filter((m) => m.category === selectedCategory)
      );
    } else {
      setFilteredMovements([]);
    }
  }, [selectedCategory, movementsList]);

  const saveExercise = async () => {
    try {
      if (!exerciseId) {
        const response = await axios.post(
          `${
            import.meta.env.VITE_API_URL
          }/program/${programId}/session/${sessionId}/exercise/add`,
          {
            movement: movement,
            series: series,
            repetitions: repetitions,
            weight: weight,
            duration: duration,
            restTime: restTime,
            notes: notes,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        const response = await axios.put(
          `${
            import.meta.env.VITE_API_URL
          }/program/${programId}/session/${sessionId}/exercise/modify/${exerciseId}`,
          {
            movement: movement,
            series: series,
            repetitions: repetitions,
            weight: weight,
            duration: duration,
            restTime: restTime,
            notes: notes,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSelectedExercise(null);
      }
      setMovement(null);
      setSeries(0);
      setRepetitions(0);
      setWeight(0);
      setDuration(0);
      setRestTime(0);
      setNotes(0);
      setRefreshData((prev) => !prev);
      setCreation(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  //load selected exercise
  useEffect(() => {
    if (exerciseId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_API_URL
            }/program/${programId}/session/${sessionId}/exercise/${exerciseId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSelectedCategory(response.data.movement.category);
          setMovement(response.data.movement._id);
          setSeries(response.data.series);
          setRepetitions(response.data.repetitions);
          setWeight(response.data.weight);
          setDuration(response.data.duration);
          setRestTime(response.data.restTime);
          setNotes(response.data.notes);
        } catch (error) {
          console.log(error.response);
        }
      };
      fetchData();
    }
  }, [token, exerciseId]);

  return (
    <div className="exercise-creation-item">
      <div className="exercise-picture"></div>
      <div className="exercise-creation-item-movement">
        <div className="exercise-infos">
          <div className="exercise-infos-left">
            <select
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
            >
              <option value="">-- Choisir une catégorie --</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div>
              <label htmlFor="series">Nombre séries : </label>
              <input
                type="number"
                name="series"
                id="series"
                value={series}
                onChange={(event) => {
                  setSeries(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="repetitions">Nombre répétitions : </label>
              <input
                type="number"
                name="repetitions"
                id="repetitions"
                value={repetitions}
                onChange={(event) => {
                  setRepetitions(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="weight">Poids : </label>
              <input
                type="number"
                name="weight"
                id="weight"
                value={weight}
                onChange={(event) => {
                  setWeight(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="exercise-infos-right">
            <select
              disabled={!selectedCategory}
              value={movement}
              onChange={(event) => {
                setMovement(event.target.value);
              }}
            >
              <option value="">-- Choisir un type --</option>
              {filteredMovements.map((mvt) => (
                <option key={mvt._id} value={mvt._id}>
                  {mvt.title}
                </option>
              ))}
            </select>

            <div>
              <label htmlFor="duration">Durée : </label>
              <input
                type="number"
                name="duration"
                id="duration"
                value={duration}
                onChange={(event) => {
                  setDuration(event.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="restTime">Récupération : </label>
              <input
                type="number"
                name="restTime"
                id="restTime"
                value={restTime}
                onChange={(event) => {
                  setRestTime(event.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className="exercise-notes">
          <label htmlFor="notes">Notes : </label>
          <textarea
            name="notes"
            id="notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows="5"
          ></textarea>
        </div>
      </div>
      <div>
        <Button type="button" text="Enregistrer" action={saveExercise} />
      </div>
    </div>
  );
};

export default ExerciseCreationItem;
