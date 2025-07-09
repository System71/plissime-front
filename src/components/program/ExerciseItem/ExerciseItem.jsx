/* eslint-disable react/prop-types */
import "./exercise-item.css";
import { useState, useEffect } from "react";
import axios from "axios";

const ExerciseItem = ({ token, programId, sessionId, exerciseId, key }) => {
  const [movement, setMovement] = useState("");
  const [movementsList, setMovementsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredMovements, setFilteredMovements] = useState([]);

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
    <div className="exercise-item" key={key}>
      <div className="exercise-item-movement">
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
        <label>Mouvements :</label>
        <select disabled={!selectedCategory}>
          <option value="">-- Choisir un mouvement --</option>
          {filteredMovements.map((mvt) => (
            <option key={mvt._id} value={mvt._id}>
              {mvt.title}
            </option>
          ))}
        </select>
      </div>
      <div className="exercise-item-content">Contenu</div>
    </div>
  );
};

export default ExerciseItem;
