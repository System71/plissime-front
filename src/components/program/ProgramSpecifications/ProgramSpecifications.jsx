/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styles from "./program-specifications.module.css";
import SessionSpecifications from "../SessionSpecifications/SessionSpecifications";
import axios from "axios";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../Button/Button";

const ProgramSpecifications = ({
  token,
  setSelectedProgram,
  selectedProgram,
  setRefresh,
}) => {
  const [choice, setChoice] = useState("infos");
  const [selectedSessionId, setSelectedSessionId] = useState(0);
  const [progress, setProgress] = useState();
  const [lastSessionFinished, setLastSessionUpdated] = useState();
  const [lastUpdate, setLastUpdate] = useState();
  const [start, setStart] = useState();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [report, setReport] = useState("");

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/program/${
            selectedProgram._id
          }/customer/informations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setProgress(response.data.progress);
        setLastSessionUpdated(response.data.lastSessionFinished);
        setCurrentSessionId(response.data.currentSession);
        if (response.data.progress >= 1) {
          setSelectedSessionId(response.data.progress);
        }
        const formatedStartDate = format(response.data.start, "dd/LL/yyyy");
        setStart(formatedStartDate);
        const formatedLastUpdateDate = format(
          response.data.lastUpdate,
          "dd/LL/yyyy",
        );
        setLastUpdate(formatedLastUpdateDate);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchCustomerData();
  }, [token, selectedProgram]);

  const sessionIsDone = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/program/${
          selectedProgram._id
        }/progress/${selectedSessionId}`,
        { report: report },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setSelectedProgram(response.data);
      setRefresh((prev) => !prev);
      setShowConfirmationModal(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  //add select fields for sessions
  const options = [];
  for (let i = 0; i < progress; i++) {
    options.push(
      <option key={i} value={i + 1}>
        Entrainement {i + 1}
      </option>,
    );
  }

  return (
    <div className={styles["container"]}>
      <div className={styles["button-choice"]}>
        <button
          type="button"
          className={styles["infos-button"]}
          onClick={() => setChoice("infos")}
          style={{ backgroundColor: choice == "infos" && "#a8c6cc" }}
        >
          Informations
        </button>
        <button
          type="button"
          className={styles["content-button"]}
          onClick={() => setChoice("content")}
          style={{ backgroundColor: choice == "content" && "#a8c6cc" }}
        >
          Contenu
        </button>
      </div>
      <div className={styles["button-step"]}>
        <div>
          <button type="button" onClick={() => setSelectedProgram(null)}>
            Retour à mes programmes
          </button>
        </div>
      </div>
      <div className={styles["customer-infos"]}>
        <div>
          <FontAwesomeIcon icon="calendar-days" color="#E67E22" />
          <p>Démarrage du programme : {start}</p>
        </div>
        <div>
          <FontAwesomeIcon icon="arrow-trend-up" color="#E67E22" />
          {lastSessionFinished ? (
            <p>Avancement : Entrainement {lastSessionFinished}</p>
          ) : (
            <p>Aucun entrainement terminé pour le moment</p>
          )}
        </div>
        <div>
          <FontAwesomeIcon icon="arrows-rotate" color="#E67E22" />
          <p>Dernière mise à jour : {lastUpdate}</p>
        </div>
      </div>

      <div className={styles["program-creation-content"]}>
        {choice === "infos" && (
          <>
            <div className={styles["program-infos"]}>
              <div>
                <label htmlFor="title">Nom du programme</label>
                <input
                  type="text"
                  placeholder="Mon programme"
                  name="title"
                  id="title"
                  value={selectedProgram.title}
                  disabled
                />
              </div>
              <div>
                <label htmlFor="duration">Durée (Nombre de séances)</label>
                <input
                  type="Number"
                  name="duration"
                  id="duration"
                  value={selectedProgram.duration}
                  disabled
                />
              </div>
              <div>
                <label htmlFor="notes">Notes personnelles</label>
                <textarea
                  name="notes"
                  id="notes"
                  placeholder="Renseignements spécifiques au programme"
                  value={selectedProgram.notes}
                  disabled
                  rows={"5"}
                ></textarea>
              </div>
            </div>
          </>
        )}
        {choice === "content" && (
          <div className={styles["program-sessions"]}>
            {selectedSessionId ? (
              <div className={styles["sessions-list"]}>
                <div className={styles["session-selector"]}>
                  <select
                    value={selectedSessionId}
                    onChange={(e) => setSelectedSessionId(e.target.value)}
                  >
                    {options}
                  </select>
                  {lastSessionFinished >= selectedSessionId ? (
                    <button
                      type="button"
                      className={styles["button-done"]}
                      onClick={null}
                    >
                      Session effectuée
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowConfirmationModal(true)}
                    >
                      Marquer comme effectuée
                    </button>
                  )}
                </div>
                {selectedSessionId && (
                  <SessionSpecifications
                    token={token}
                    programId={selectedProgram._id}
                    sessionId={selectedSessionId}
                  />
                )}
              </div>
            ) : (
              <p>Aucun entrainement disponible actuellement</p>
            )}
          </div>
        )}
        {showConfirmationModal && (
          <div
            className={styles["modal-overlay"]}
            onClick={() => setShowConfirmationModal(false)}
          >
            <div
              className={styles["modal-content"]}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Votre entrainement s'est bien passé ?</h2>
              <p>
                Vous êtes sur le point de marquer cet entrainement comme
                effectué.
              </p>
              <p>
                Si c'est bien le cas, merci d'indiquer votre ressenti ci-dessous
                :
              </p>
              <textarea
                name="report"
                id="report"
                rows="10"
                placeholder="Votre ressenti sur cet entrainement"
                value={report}
                onChange={(event) => {
                  setReport(event.target.value);
                }}
              ></textarea>
              <div className={styles["modal-buttons"]}>
                <Button
                  text="Annuler"
                  type="button"
                  action={() => setShowConfirmationModal(false)}
                />
                <Button
                  text="Confirmer"
                  type="button"
                  action={() => sessionIsDone()}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramSpecifications;
