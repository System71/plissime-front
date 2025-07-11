import "./exercise-creation-item.css";
import { useState, useEffect } from "react";
import axios from "axios";

const ExerciseCreationItem = ({ token }) => {
  const [movementsList, setMovementsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredMovements, setFilteredMovements] = useState([]);
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
        console.log("movement list=", response.data);
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

  return (
    <div className="exercise-creation-item">
      <div className="exercise-creation-item-movement">
        <label>Catégorie :</label>
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
        <label>Types :</label>
        <select disabled={!selectedCategory}>
          <option value="">-- Choisir un type --</option>
          {filteredMovements.map((mvt) => (
            <option key={mvt._id} value={mvt._id}>
              {mvt.title}
            </option>
          ))}
        </select>
      </div>
      <div className="exercise-creation-item-content">Contenu</div>
    </div>
  );
};

export default ExerciseCreationItem;
