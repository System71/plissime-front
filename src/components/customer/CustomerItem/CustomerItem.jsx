/* eslint-disable react/prop-types */
import "./customer-item.css";
import avatar from "../../../assets/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState, useEffect } from "react";
import { parseISO, format } from "date-fns";

const CustomerItem = ({
  openCustomerDisplay,
  setOpenCustomerDisplay,
  setCustomerID,
  id,
  name,
  firstName,
  address,
  zip,
  city,
  phone,
  email,
  token,
}) => {
  const [nextSession, setNextSession] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("ID customer =", id);
        const response = await axios.get(
          import.meta.env.VITE_API_URL + `/sessions/next/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("response=", response.data);

        if (response.data)
        {
          const startDate = parseISO(response.data.start); // Convertit la chaîne ISO en objet Date
          const formattedDate = format(startDate, "dd/MM/yyyy HH:mm"); // Formate la date
          setNextSession(formattedDate);
        }

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id, token]);

  return (
    <div
      className="customer-item"
      onClick={() => {
        setOpenCustomerDisplay(!openCustomerDisplay);
        setCustomerID(id);
      }}
    >
      <div className="customer-content">
        <div className="customer-name">
          <p>
            {name} {firstName}
          </p>
        </div>
        <div className="customer-info">
          <FontAwesomeIcon
            className="info-picto"
            icon="house"
            color="#E67E22"
            size="xs"
          />
          <div>
            <p>{address}</p>
            <p>
              {zip} {city}
            </p>
          </div>
        </div>
        <div className="customer-info">
          <FontAwesomeIcon
            className="info-picto"
            icon="phone"
            color="#E67E22"
            size="xs"
          />
          <p>0{phone}</p>
        </div>
        <div className="customer-info">
          <FontAwesomeIcon
            className="info-picto"
            icon="envelope"
            color="#E67E22"
            size="xs"
          />
          <p>{email}</p>
        </div>
        <div className="customer-info">
          <FontAwesomeIcon
            className="info-picto"
            icon="arrow-right"
            color="#E67E22"
            size="xs"
          />
          {nextSession ? <p>{nextSession}</p> : <p>Pas de session prévue</p>}
        </div>
      </div>
      <img src={avatar} alt="customer avatar" className="customer-picture" />
    </div>
  );
};

export default CustomerItem;
