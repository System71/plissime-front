import axios from "axios";

export const updateSessionsList = async (
  setSessionsList,
  token,
  searchCustomer
) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/sessions?name=${searchCustomer}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setSessionsList(response.data);
  } catch (error) {
    console.log(error.response);
  }
};

export const updateCustomersList = async (
  setCustomersList,
  token,
  searchCustomer
) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/mycustomers?name=${searchCustomer}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    setCustomersList(response.data);
  } catch (error) {
    console.log(error.response);
  }
};
