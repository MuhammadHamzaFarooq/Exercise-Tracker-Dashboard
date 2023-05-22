import React from "react";
import CustomTable from "../components/CustomTable";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const formatTime = (timeString) => {
  const time = new Date(timeString);
  return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};
const data = [
  {
    id: "6469fecfb4044b9635d124ce",
    name: "sunday walk",
    description: "something ....",
    date: formatDate("2023-05-21T00:00:00.000+00:00"),
    duration: "3 hours",
    startTime: formatTime("2023-05-21T14:13:19.000+00:00"),
    endTime: formatTime("2023-05-21T14:13:19.003+00:00"),
    status: "In Progress",
    activityType: "Walk",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683179/Exercise%20Tracker%20Dashboard/walk_and_palying_phone_flat_vector_illustration1_generated_pp1jp2.jpg",
  },
  {
    id: "6469fef9b4044b9635d124d4",
    name: "sunday Swim",
    description: "something ....",
    date: formatDate("2023-05-21T00:00:00.000+00:00"),
    duration: "4 hours",
    startTime: formatTime("2023-05-23T14:13:19.000+00:00"),
    endTime: formatTime("2023-05-23T14:13:19.004+00:00"),
    status: "Pending",
    activityType: "Swim",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683107/Exercise%20Tracker%20Dashboard/8si7_juh6_130430_fwsd9c.jpg",
  },
  {
    id: "646a37a87e920bff8fb4521c",
    name: "Wednesday Running",
    description: "something ....",
    date: formatDate("2023-05-21T00:00:00.000+00:00"),
    duration: "4 hours",
    startTime: formatTime("2023-05-07T14:13:19.000Z"),
    endTime: formatTime("2023-05-07T14:13:19.004Z"),
    status: "Pending",
    activityType: "Run",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683136/Exercise%20Tracker%20Dashboard/runing_man_generated_dfog6w.jpg",
  },
  {
    id: "646a3b5856b97acaaecc4c69",
    name: "Thursday Hiking ",
    description: "something ....",
    date: formatDate("2023-05-25T00:00:00.000+00:00"),
    duration: "4 hours",
    startTime: formatTime("2023-05-07T14:13:19.000Z"),
    endTime: formatTime("2023-05-07T14:13:19.004+00:00"),
    status: "Pending",
    activityType: "Hike",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683190/Exercise%20Tracker%20Dashboard/hiking-illustration-vector_bigs43.jpg",
  },
  {
    id: "646a3b5856b97acaaecc4c69",
    name: "Friday Bicycle Riding ",
    description: "something ....",
    date: formatDate("2023-05-26T00:00:00.000Z"),
    duration: "4 hours",
    startTime: formatTime("2023-05-07T14:13:19.000Z"),
    endTime: formatTime("2023-05-07T14:13:19.004Z"),
    status: "Pending",
    activityType: "Bicycle Ride",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684684638/Exercise%20Tracker%20Dashboard/1892_R0lVIERBTiA0NDItMDc_cosxob.jpg",
  },
  {
    id: "6469fecfb4044b9635d124ce",
    name: "sunday walk",
    description: "something ....",
    date: formatDate("2023-05-21T00:00:00.000+00:00"),
    duration: "3 hours",
    startTime: formatTime("2023-05-21T14:13:19.000+00:00"),
    endTime: formatTime("2023-05-21T14:13:19.003+00:00"),
    status: "In Progress",
    activityType: "Walk",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683179/Exercise%20Tracker%20Dashboard/walk_and_palying_phone_flat_vector_illustration1_generated_pp1jp2.jpg",
  },
  {
    id: "6469fef9b4044b9635d124d4",
    name: "sunday Swim",
    description: "something ....",
    date: formatDate("2023-05-21T00:00:00.000+00:00"),
    duration: "4 hours",
    startTime: formatTime("2023-05-23T14:13:19.000+00:00"),
    endTime: formatTime("2023-05-23T14:13:19.004+00:00"),
    status: "Pending",
    activityType: "Swim",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683107/Exercise%20Tracker%20Dashboard/8si7_juh6_130430_fwsd9c.jpg",
  },
  {
    id: "646a37a87e920bff8fb4521c",
    name: "Wednesday Running",
    description: "something ....",
    date: formatDate("2023-05-21T00:00:00.000+00:00"),
    duration: "4 hours",
    startTime: formatTime("2023-05-07T14:13:19.000Z"),
    endTime: formatTime("2023-05-07T14:13:19.004Z"),
    status: "Pending",
    activityType: "Run",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683136/Exercise%20Tracker%20Dashboard/runing_man_generated_dfog6w.jpg",
  },
  {
    id: "646a3b5856b97acaaecc4c69",
    name: "Thursday Hiking ",
    description: "something ....",
    date: formatDate("2023-05-25T00:00:00.000+00:00"),
    duration: "4 hours",
    startTime: formatTime("2023-05-07T14:13:19.000Z"),
    endTime: formatTime("2023-05-07T14:13:19.004+00:00"),
    status: "Pending",
    activityType: "Hike",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683190/Exercise%20Tracker%20Dashboard/hiking-illustration-vector_bigs43.jpg",
  },
  {
    id: "646a3b5856b97acaaecc4c69",
    name: "Friday Bicycle Riding ",
    description: "something ....",
    date: formatDate("2023-05-26T00:00:00.000Z"),
    duration: "4 hours",
    startTime: formatTime("2023-05-07T14:13:19.000Z"),
    endTime: formatTime("2023-05-07T14:13:19.004Z"),
    status: "Pending",
    activityType: "Bicycle Ride",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684684638/Exercise%20Tracker%20Dashboard/1892_R0lVIERBTiA0NDItMDc_cosxob.jpg",
  },
  {
    id: "6469fecfb4044b9635d124ce",
    name: "sunday walk",
    description: "something ....",
    date: formatDate("2023-05-21T00:00:00.000+00:00"),
    duration: "3 hours",
    startTime: formatTime("2023-05-21T14:13:19.000+00:00"),
    endTime: formatTime("2023-05-21T14:13:19.003+00:00"),
    status: "In Progress",
    activityType: "Walk",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683179/Exercise%20Tracker%20Dashboard/walk_and_palying_phone_flat_vector_illustration1_generated_pp1jp2.jpg",
  },
  {
    id: "6469fef9b4044b9635d124d4",
    name: "sunday Swim",
    description: "something ....",
    date: formatDate("2023-05-21T00:00:00.000+00:00"),
    duration: "4 hours",
    startTime: formatTime("2023-05-23T14:13:19.000+00:00"),
    endTime: formatTime("2023-05-23T14:13:19.004+00:00"),
    status: "Pending",
    activityType: "Swim",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683107/Exercise%20Tracker%20Dashboard/8si7_juh6_130430_fwsd9c.jpg",
  },
  {
    id: "646a37a87e920bff8fb4521c",
    name: "Wednesday Running",
    description: "something ....",
    date: formatDate("2023-05-21T00:00:00.000+00:00"),
    duration: "4 hours",
    startTime: formatTime("2023-05-07T14:13:19.000Z"),
    endTime: formatTime("2023-05-07T14:13:19.004Z"),
    status: "Pending",
    activityType: "Run",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683136/Exercise%20Tracker%20Dashboard/runing_man_generated_dfog6w.jpg",
  },
  {
    id: "646a3b5856b97acaaecc4c69",
    name: "Thursday Hiking ",
    description: "something ....",
    date: formatDate("2023-05-25T00:00:00.000+00:00"),
    duration: "4 hours",
    startTime: formatTime("2023-05-07T14:13:19.000Z"),
    endTime: formatTime("2023-05-07T14:13:19.004+00:00"),
    status: "Pending",
    activityType: "Hike",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683190/Exercise%20Tracker%20Dashboard/hiking-illustration-vector_bigs43.jpg",
  },
  {
    id: "646a3b5856b97acaaecc4c69",
    name: "Friday Bicycle Riding ",
    description: "something ....",
    date: formatDate("2023-05-26T00:00:00.000Z"),
    duration: "4 hours",
    startTime: formatTime("2023-05-07T14:13:19.000Z"),
    endTime: formatTime("2023-05-07T14:13:19.004Z"),
    status: "Pending",
    activityType: "Bicycle Ride",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684684638/Exercise%20Tracker%20Dashboard/1892_R0lVIERBTiA0NDItMDc_cosxob.jpg",
  },
];

const Goals = () => {
  return (
    <>
      <CustomTable
        data={data}
        handleEdit={() => console.log("edit Handler Click")}
        handleDelete={() => console.log("delete Handler Click")}
        handleStatus={() => console.log("Status Handler Click")}
      />
    </>
  );
};

export default Goals;
