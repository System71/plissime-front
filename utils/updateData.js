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
        },
      }
    );
    setSessionsList(response.data);
  } catch (error) {
    console.log(error.response);
  }
};

export const updateActiveCustomersList = async (
  setActiveCustomersList,
  token,
  searchCustomer
) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/mycustomers/active?name=${searchCustomer}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setActiveCustomersList(response.data);
  } catch (error) {
    console.log(error.response);
  }
};

export const updateInactiveCustomersList = async (
  setInactiveCustomersList,
  token,
  searchCustomer
) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/mycustomers/inactive?name=${searchCustomer}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setInactiveCustomersList(response.data);
  } catch (error) {
    console.log(error.response);
  }
};
