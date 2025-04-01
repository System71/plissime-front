/* eslint-disable react/prop-types */
import "./customers.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Customers = ({ token }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/mycustomers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="content">
      <h1>Customers</h1>
      <div className="customer-list">
        {data.map((customer) => {
          return (
            <div className="customer-item" key={String(customer._id)}>
              <FontAwesomeIcon icon="circle" color="#E67E22" size="xs" />
              <div className="customer-name">
                <p>
                  {customer.name} {customer.firstName}
                </p>
              </div>
              <div className="customer-address">
                <p>
                  {customer.address} {customer.zip} {customer.city}
                </p>
              </div>
              <div className="customer-icon">
                <FontAwesomeIcon icon="magnifying-glass" color="#E67E22" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Customers;
