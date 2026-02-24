/* eslint-disable react/prop-types */
import styles from "./my-programs.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ProgramSpecifications from "../../components/program/ProgramSpecifications/ProgramSpecifications";
import ProgramItemCustomer from "../../components/program/ProgramItemCustomer/ProgramItemCustomer";

const MyPrograms = ({ token, role }) => {
  const [programs, setPrograms] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/myprograms`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setPrograms(response.data);
        console.log("programmes=", response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchPrograms();
  }, [token]);

  return (
    <div className={styles.myPrograms}>
      <div className={styles["message"]}>
        <p>Vous trouvez ici vos programmes que vous suivez.</p>
      </div>
      <h1>Mes Programmes :</h1>
      {isLoading ? (
        <p>En chargement</p>
      ) : selectedProgram ? (
        <div>
          <ProgramSpecifications
            token={token}
            setSelectedProgram={setSelectedProgram}
            selectedProgram={selectedProgram}
          />
        </div>
      ) : (
        <div className={styles.programList}>
          {programs.map((program) => (
            <ProgramItemCustomer
              key={program._id}
              title={program.title}
              duration={program.duration}
              progress={program.customers[0].progress}
              notes={program.notes}
              onClick={() => {
                setSelectedProgram(program);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPrograms;
