import axios from "axios";

const api = axios.create({
  baseURL: "https://curious-clam-kimono.cyclic.app/api/v1/", // Replace with your API endpoint
});

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("token", token); // Store the token in local storage
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token"); // Remove the token from local storage
    delete api.defaults.headers.common["Authorization"];
  }
};

// Get the token from local storage if it exists
const token = localStorage.getItem("token");
setAuthToken(token); // Set the token in the headers initially

api.interceptors.request.use(
  (config) => {
    const updatedConfig = { ...config };

    // Get the token from local storage if it exists and add it to the headers
    const token = localStorage.getItem("token");
    if (token) {
      updatedConfig.headers["Authorization"] = `Bearer ${token}`;
    }

    return updatedConfig;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error("Network error. Please try again later.");
    }
  }
);

export default api;
