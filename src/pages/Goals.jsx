import React, { useState, useEffect } from "react";
import CustomTable from "../components/CustomTable";
import {
  deleteActivity,
  fetchActivities,
} from "../features/activity/activitySlice";
import { useDispatch, useSelector } from "react-redux";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const formatTime = (timeString) => {
  const time = new Date(timeString);
  return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const Goals = () => {
  // const [data, setData] = useState([]);
  // const [data, setData] = useState([]);

  const dispatch = useDispatch();
  const activity = useSelector((state) => state.activity);

  useEffect(() => {
    dispatch(fetchActivities());
  }, [activity]);

  useEffect(() => {
    dispatch(fetchActivities());
  }, []);

  console.log(activity);
  return (
    <>
      <CustomTable
        data={activity?.activities ? activity?.activities : []}
        handleDelete={(item) => dispatch(deleteActivity(item?._id))}
      />
    </>
  );
};

export default Goals;
