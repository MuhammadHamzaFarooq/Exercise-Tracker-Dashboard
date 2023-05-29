import api from "../../api/api";

export const signupApi = async (userData) => {
  try {
    const response = await api.post("auth/signup", userData);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginApi = async (userData) => {
  try {
    const response = await api.post("auth/login", userData);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
