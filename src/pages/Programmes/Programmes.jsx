/* eslint-disable react/prop-types */
import styles from "./programmes.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import arrow from "../../assets/arrow_button.png";
import circle from "../../assets/circle.png";
import ProgramCreation from "../../components/program/ProgramCreation/ProgramCreation";
import axios from "axios";
import ProgramItem from "../../components/program/ProgramItem/ProgramItem";

const Programmes = ({ token }) => {
  const [creation, setCreation] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);

  //Fetch all coachs programs
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/programs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPrograms(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchPrograms();
  }, [token, creation]);

  return (
    <>
      <h1>Programmes</h1>
      {!creation && (
        <div className={styles["addProgram"]}>
          <p>Créer un nouveau programme</p>
          <div className={styles["arrow-circle"]}>
            <img className={styles["arrow"]} src={arrow} alt="arrow" />
            <div
              className={styles["plus-container"]}
              onClick={() => {
                setSelectedProgram(null);
                setCreation(true);
              }}
            >
              <img className={styles["circle"]} src={circle} alt="circle" />
              <FontAwesomeIcon
                className={styles["plus-circle"]}
                icon="plus-circle"
                color="#E67E22"
                size="4x"
              />
            </div>
          </div>
        </div>
      )}
      {creation ? (
        <ProgramCreation
          token={token}
          setCreation={setCreation}
          program={selectedProgram}
        />
      ) : (
        <div className={styles["programList"]}>
          {programs.map((program) => (
            <ProgramItem
              key={program._id}
              title={program.title}
              duration={program.duration}
              notes={program.notes}
              onClick={() => {
                setSelectedProgram(program);
                setCreation(true);
              }}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Programmes;
