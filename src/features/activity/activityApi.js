import api from "../../api/api";

export const fetchActivitiesApi = async () => {
  try {
    const response = await api.get("auth/getAllActivities");
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createActivityApi = async (activityData) => {
  try {
    const response = await api.post("auth/createActivity", activityData);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateActivityApi = async (activityId, activityData) => {
  try {
    const response = await api.put(
      `auth/editActivity/${activityId}`,
      activityData
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteActivityApi = async (activityId) => {
  try {
    await api.delete(`auth/deleteActivity/${activityId}`);
  } catch (error) {
    throw new Error(error.message);
  }
};
