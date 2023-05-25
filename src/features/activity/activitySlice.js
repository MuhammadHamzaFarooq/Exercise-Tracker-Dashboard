import { createSlice } from "@reduxjs/toolkit";
import {
  fetchActivitiesApi,
  createActivityApi,
  updateActivityApi,
  deleteActivityApi,
} from "./activityApi";

const initialState = {
  activities: [],
  loading: false,
  error: null,
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    fetchActivitiesStart(state) {
      state.loading = true;
    },
    fetchActivitiesSuccess(state, action) {
      state.activities = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchActivitiesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createActivityStart(state) {
      state.loading = true;
    },
    createActivitySuccess(state, action) {
      state.activities.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createActivityFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateActivityStart(state) {
      state.loading = true;
    },
    updateActivitySuccess(state, action) {
      const { id, ...updatedActivity } = action.payload;
      const existingActivity = state.activities.find(
        (activity) => activity.id === id
      );
      if (existingActivity) {
        Object.assign(existingActivity, updatedActivity);
      }
      state.loading = false;
      state.error = null;
    },
    updateActivityFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteActivityStart(state) {
      state.loading = true;
    },
    deleteActivitySuccess(state, action) {
      state.activities = state.activities.filter(
        (activity) => activity.id !== action.payload
      );
      state.loading = false;
      state.error = null;
    },
    deleteActivityFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchActivitiesStart,
  fetchActivitiesSuccess,
  fetchActivitiesFailure,
  createActivityStart,
  createActivitySuccess,
  createActivityFailure,
  updateActivityStart,
  updateActivitySuccess,
  updateActivityFailure,
  deleteActivityStart,
  deleteActivitySuccess,
  deleteActivityFailure,
} = activitySlice.actions;

export const fetchActivities = () => async (dispatch) => {
  try {
    dispatch(fetchActivitiesStart());
    const response = await fetchActivitiesApi();
    dispatch(fetchActivitiesSuccess(response));
  } catch (error) {
    dispatch(fetchActivitiesFailure(error.message));
  }
};

export const createActivity = (activityData) => async (dispatch) => {
  try {
    dispatch(createActivityStart());
    const response = await createActivityApi(activityData);
    dispatch(createActivitySuccess(response));
  } catch (error) {
    dispatch(createActivityFailure(error.message));
  }
};

export const updateActivity =
  (activityId, activityData) => async (dispatch) => {
    try {
      dispatch(updateActivityStart());
      const response = await updateActivityApi(activityId, activityData);
      dispatch(updateActivitySuccess(response));
    } catch (error) {
      dispatch(updateActivityFailure(error.message));
    }
  };

export const deleteActivity = (activityId) => async (dispatch) => {
  try {
    dispatch(deleteActivityStart());
    await deleteActivityApi(activityId);
    dispatch(deleteActivitySuccess(activityId));
  } catch (error) {
    dispatch(deleteActivityFailure(error.message));
  }
};

export default activitySlice.reducer;
