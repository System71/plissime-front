/* eslint-disable react/prop-types */
import styles from "./open-customer-subscription-modal.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoCustomer from "../InfoCustomer/InfoCustomer";
import CustomerPayments from "../CustomerPayments/CustomerPayments";
import CustomerSportInfos from "../CustomerSportInfos/CustomerSportInfos";
import CustomerSessions from "../CustomerSessions/CustomerSessions";

const OpenCustomerModal = ({
  token,
  setOpenCustomerDisplay,
  id,
  setRefreshCustomers,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [activity, setActivity] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [workingTime, setWorkingTime] = useState("");
  const [availibility, setAvailibility] = useState("");
  const [sportBackground, setSportBackground] = useState("");
  const [healthProblem, setHealthProblem] = useState("");
  const [goals, setGoals] = useState("");
  const [date, setDate] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [choice, setChoice] = useState("admin");
  const [adminChoice, setAdminChoice] = useState("left");
  const [sportChoice, setSportChoice] = useState("left");

  const modifyCustomer = async () => {
    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL + `/mycustomer/informations`,
        {
          email: email,
          date: date,
          isActive: isActive,
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRefreshCustomers((prev) => !prev);
    } catch (error) {
      console.error("Erreur lors de la MAJ client :", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `/find/customer/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setEmail(response.data.customerToFind.email || "");
        setName(response.data.customerToFind.name || "");
        setFirstName(response.data.customerToFind.firstName || "");
        setAddress(response.data.customerToFind.address || "");
        setZip(response.data.customerToFind.zip || "");
        setCity(response.data.customerToFind.city || "");
        setPhone(response.data.customerToFind.phone || "");
        setBirthday(response.data.customerToFind.birthday || "");
        setActivity(response.data.customerToFind.activity || "");
        setWeight(response.data.customerToFind.weight || "");
        setSize(response.data.customerToFind.size || "");
        setWorkingTime(response.data.customerToFind.workingTime || "");
        setAvailibility(response.data.customerToFind.availibility || "");
        setSportBackground(response.data.customerToFind.sportBackground || "");
        setHealthProblem(response.data.customerToFind.healthProblem || "");
        setGoals(response.data.customerToFind.goals || "");
        setComment(response.data.coachInfo.comment);
        setIsActive(response.data.coachInfo.isActive);
        const formatedDate = format(response.data.coachInfo.date, "dd/LL/yyyy");
        setDate(formatedDate);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la recherche de clients :", error);
      }
    };
    fetchData();
  }, [id, token]);

  return (
    <div
      className={styles["container"]}
      onClick={() => setOpenCustomerDisplay(false)}
    >
      {isLoading ? (
        <p>EN CHARGEMENT</p>
      ) : (
        <div
          className={styles["content"]}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className={styles["button-choice"]}>
            <button
              type="button"
              className="admin-button"
              onClick={() => {
                setChoice("admin");
                setAdminChoice("left");
              }}
              style={{ backgroundColor: choice == "admin" && "#a8c6cc" }}
            >
              Informations personnelles
            </button>
            <button
              type="button"
              className="sport-button"
              onClick={() => {
                setChoice("sport");
                setSportChoice("left");
              }}
              style={{ backgroundColor: choice == "sport" && "#a8c6cc" }}
            >
              Profil sportif
            </button>
          </div>
          {choice === "admin" && (
            <div className={styles["arrows"]}>
              {adminChoice === "right" && (
                <div
                  className={styles["left"]}
                  onClick={() => setAdminChoice("left")}
                >
                  <FontAwesomeIcon
                    icon="circle-chevron-left"
                    color="#E67E22"
                    size="xl"
                  />
                  <p>Informations</p>
                </div>
              )}
              {adminChoice === "left" && (
                <div
                  className={styles["right"]}
                  onClick={() => setAdminChoice("right")}
                >
                  <p>Paiements en attente</p>
                  <FontAwesomeIcon
                    icon="circle-chevron-right"
                    color="#E67E22"
                    size="xl"
                  />
                </div>
              )}
            </div>
          )}
          {choice === "sport" && (
            <div className={styles["arrows"]}>
              {sportChoice === "right" && (
                <div
                  className={styles["left"]}
                  onClick={() => setSportChoice("left")}
                >
                  <FontAwesomeIcon
                    icon="circle-chevron-left"
                    color="#E67E22"
                    size="xl"
                  />
                  <p>Informations</p>
                </div>
              )}
              {sportChoice === "left" && (
                <div
                  className={styles["right"]}
                  onClick={() => setSportChoice("right")}
                >
                  <p>Sessions à venir</p>
                  <FontAwesomeIcon
                    icon="circle-chevron-right"
                    color="#E67E22"
                    size="xl"
                  />
                </div>
              )}
            </div>
          )}
          {choice === "admin" && adminChoice === "left" && (
            <InfoCustomer
              email={email}
              name={name}
              firstName={firstName}
              address={address}
              zip={zip}
              city={city}
              phone={phone}
              activity={activity}
              date={date}
              isActive={isActive}
              setIsActive={setIsActive}
              comment={comment}
              setComment={setComment}
            />
          )}
          {choice === "admin" && adminChoice === "right" && (
            <CustomerPayments token={token} id={id} />
          )}
          {choice === "sport" && sportChoice === "left" && (
            <CustomerSportInfos
              weight={weight}
              size={size}
              birthday={birthday}
              workingTime={workingTime}
              availibility={availibility}
              sportBackground={sportBackground}
              healthProblem={healthProblem}
              goals={goals}
            />
          )}
          {choice === "sport" && sportChoice === "right" && (
            <CustomerSessions token={token} id={id} />
          )}

          <div className={styles["open-session-modal-buttons"]}>
            <button type="button" onClick={() => setOpenCustomerDisplay(false)}>
              Fermer
            </button>
            <button
              type="button"
              onClick={() => {
                modifyCustomer();
                setOpenCustomerDisplay(false);
              }}
            >
              Enregistrer et fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenCustomerModal;
