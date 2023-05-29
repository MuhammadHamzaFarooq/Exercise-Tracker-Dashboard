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

  const handleDeleteClick = async (item) => {
    setSelectedItem(item);

    // Show confirmation dialog to the user
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmed) {
      return;
    }

    // Show loader while deleting the item
    setLoading(true);

    try {
      // Call the handleDelete function with the item as an argument
      await handleDelete(item);

      // Show success alert after successful deletion
      alert("Item deleted successfully");

      // Close the modal and reset the selected item
      setStatusModalOpen(false);
      setSelectedItem(null);
    } catch (error) {
      // Handle error if deletion fails
      alert("Failed to delete the item");
    }

    // Hide the loader
    setLoading(false);
  };
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
