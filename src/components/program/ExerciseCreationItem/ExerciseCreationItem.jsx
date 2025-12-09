/* eslint-disable react/prop-types */
import styles from "./exercise-creation-item.module.css";
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
  const [intensity, setIntensity] = useState(0);
  const [notes, setNotes] = useState("");
  const [isPause, setIsPause] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

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
            intensity: intensity,
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
            intensity: intensity,
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
      setIntensity(0);
      setNotes("");
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
          setImageUrl(response.data.movement.imageUrl);
          setSelectedCategory(response.data.movement.category);
          setMovement(response.data.movement);
          setSeries(response.data.series);
          setRepetitions(response.data.repetitions);
          setWeight(response.data.weight);
          setDuration(response.data.duration);
          setRestTime(response.data.restTime);
          setIntensity(response.data.intensity);
          setNotes(response.data.notes);
        } catch (error) {
          console.log(error.response);
        }
      };
      fetchData();
    }
  }, [token, exerciseId]);

  return (
    <div className={styles["exercise-creation-item"]}>
      <div className={styles["exercise-picture"]}>
        <img alt={movement.title} src={movement.imageUrl} />
      </div>
      <div className={styles["exercise-creation-item-movement"]}>
        <div className={styles["exercise-infos"]}>
          <div className={styles["exercise-infos-left"]}>
            <select
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                if (e.target.value === "Récupération") {
                  setIsPause(true);
                } else {
                  setIsPause(false);
                }
              }}
              value={selectedCategory}
            >
              <option value="">-- Catégorie --</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {isPause === false ? (
              <>
                <div>
                  <label htmlFor="series">Séries : </label>
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
                  <label htmlFor="repetitions">Répétitions : </label>
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
              </>
            ) : null}
          </div>
          <div className={styles["exercise-infos-right"]}>
            <select
              disabled={!selectedCategory}
              value={movement?._id || ""}
              onChange={(event) => {
                const selected = filteredMovements.find(
                  (mvt) => mvt._id === event.target.value
                );
                setMovement(selected); // on stocke l'objet complet
                setImageUrl(selected?.imageUrl || "");
              }}
            >
              <option value="">-- Type --</option>
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
            {isPause === false ? (
              <>
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
                <div>
                  <label htmlFor="intensity">Intensité : </label>
                  <input
                    type="number"
                    name="intensity"
                    id="intensity"
                    value={intensity}
                    onChange={(event) => {
                      setIntensity(event.target.value);
                    }}
                  />
                </div>
              </>
            ) : null}
          </div>
        </div>
        <div className={styles["exercise-notes"]}>
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
