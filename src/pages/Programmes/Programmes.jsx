import "./programmes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import arrow from "../../assets/arrow_button.png";
import circle from "../../assets/circle.png";
import ProgramCreation from "../../components/program/ProgramCreation/ProgramCreation";

const Programmes = () => {
  const [creation, SetCreation] = useState(false);

  return (
    <>
      <h1>Programmes</h1>
      <div className="addProgram">
        <p>Créer un nouveau programme</p>
        <div className="arrow-circle">
          <img className="arrow" src={arrow} alt="arrow" />
          <div className="plus-container" onClick={() => SetCreation(true)}>
            <img className="circle" src={circle} alt="circle" />
            <FontAwesomeIcon
              className="plus-circle"
              icon="plus-circle"
              color="#E67E22"
              size="4x"
            />
          </div>
        </div>
      </div>
      {creation ? (
        <ProgramCreation />
      ) : (
        <div className="programList">Liste des programmes</div>
      )}
    </>
  );
};

export default Programmes;
