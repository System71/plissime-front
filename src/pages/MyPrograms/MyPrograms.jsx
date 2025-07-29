/* eslint-disable react/prop-types */
import styles from "./my-programs.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ProgramItem from "../../components/program/ProgramItem/ProgramItem";
import ProgramSpecifications from "../../components/program/ProgramSpecifications/ProgramSpecifications";

const MyPrograms = ({ token }) => {
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
          }
        );
        setPrograms(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchPrograms();
  }, [token]);

  return (
    <div>
      <h1>Mes Programmes</h1>
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
        <div>
          {programs.map((program) => (
            <ProgramItem
              key={program._id}
              title={program.title}
              duration={program.duration}
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
