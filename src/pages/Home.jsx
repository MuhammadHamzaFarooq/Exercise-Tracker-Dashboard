import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "../components/Card";
import boyRun from "../assets/imgs/boy-run.png";
import boySwim from "../assets/imgs/boy-swim.png";
import boyHike from "../assets/imgs/boy-hike.png";
import girlWalk from "../assets/imgs/girl-walk.png";
import girlBicycleRide from "../assets/imgs/girl-bicycle.png";
import CountCard from "../components/CountCard";
import { GiRun } from "react-icons/gi";
import { FaSwimmer } from "react-icons/fa";
import { BiCycling } from "react-icons/bi";
import { RiWalkLine } from "react-icons/ri";
import { GiEgyptianWalk } from "react-icons/gi";
import CustomModal from "../components/CustomModal";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { createActivity } from "../features/activity/activitySlice";
import { delay, timeFormatter } from "../utils/helper";

export default function Home() {
  const [statusModalOpen, setStatusModalOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const [date, setDate] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [activity, setActivity] = React.useState([]);
  const [timeValidationError, setTimeValidationError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleStartTimeChange = (newValue) => {
    setStartTime(timeFormatter(newValue));

    if (endTime && newValue && newValue.valueOf() === endTime.valueOf()) {
      setTimeValidationError(true);
    } else {
      setTimeValidationError(false);
    }
  };

  const handleEndTimeChange = (newValue) => {
    setEndTime(timeFormatter(newValue));

    if (startTime && newValue && newValue.valueOf() === startTime.valueOf()) {
      setTimeValidationError(true);
    } else {
      setTimeValidationError(false);
    }
  };

  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(
      "name, description, date, duration, activity,startTime,endTime => ",
      name,
      description,
      date,
      duration,
      activity,
      startTime,
      endTime
    );
  }, [name, description, date, duration, activity, startTime, endTime]);

  const createActivityHandler = () => {
    setLoading(true);
    // api calling
    console.log("handler click");
    if (timeValidationError) {
      return; // Prevent editing if there is a time validation error
    }
    // Validate required fields
    if (
      !name ||
      !description ||
      !date ||
      !startTime ||
      !endTime ||
      !duration ||
      !activity
    ) {
      console.log("Please fill in all the required fields.");
      delay(2000);
      setStatusModalOpen(!statusModalOpen);
      Swal.fire("Oops !", "Please fill in all the required fields.", "error");
      setLoading(false);
      return;
    }

    // Additional validation logic...

    // Prepare the payload
    const payload = {
      name: String(name),
      description: String(description),
      date: String(date),
      startTime: String(startTime),
      endTime: String(endTime),
      duration: String(duration),
      activityType: String(activity),
    };
    // Dispatch the createActivity action
    dispatch(createActivity(payload))
      .then((res) => {
        console.log("Activity Created", res);
        delay(2000);
        setName("");
        setActivity("");
        setDate("");
        setDescription("");
        setEndTime("");
        setStartTime("");
        setDuration("");
        setLoading(false);
        Swal.fire("Good job!", "Activity Created  Successfully", "success");
        setStatusModalOpen(!statusModalOpen);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(" error:", error);
        Swal.fire("Oops!", error.message, "error");

        // Handle error here
      });
  };

  const cancelHandler = () => {
    // api calling
    setStatusModalOpen(!statusModalOpen);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={3}
            xl={2}
            sx={{
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <CountCard
              icon={
                <GiRun
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                />
              }
              title={"Run"}
              count={"243"}
              color={"#ADEFB0"}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={3}
            xl={2}
            sx={{
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <CountCard
              icon={
                <FaSwimmer
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                />
              }
              title={"Swim"}
              count={"203"}
              color={"#D4C6DF"}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={3}
            xl={2}
            sx={{
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <CountCard
              icon={
                <GiEgyptianWalk
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                />
              }
              title={"Hike"}
              count={"273"}
              color={"#F7DEE7"}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={3}
            xl={2}
            sx={{
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <CountCard
              icon={
                <BiCycling
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                />
              }
              title={"Bicycle Ride"}
              count={"303"}
              color={"#CECED0"}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={3}
            xl={2}
            sx={{
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <CountCard
              icon={
                <RiWalkLine
                  style={{
                    width: "30px",
                    height: "30px",
                  }}
                />
              }
              title={"Walk"}
              count={"200"}
              color={"#C2FFE6"}
            />
          </Grid>

          <Grid xs={2}></Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          sx={{
            marginLeft: "5px",
          }}
        >
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Card
              onClick={() => setStatusModalOpen(!statusModalOpen)}
              title={"Run"}
              img={boyRun}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Card
              // onClick={() => console.log("Swim")}
              onClick={() => setStatusModalOpen(!statusModalOpen)}
              title={"Swim"}
              img={boySwim}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Card
              // onClick={() => console.log("Hike")}
              onClick={() => setStatusModalOpen(!statusModalOpen)}
              title={"Hike"}
              img={boyHike}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Card
              // onClick={() => console.log("Bicycle Ride")}
              onClick={() => setStatusModalOpen(!statusModalOpen)}
              title={"Bicycle Ride"}
              img={girlBicycleRide}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Card
              // onClick={() => console.log("Walk")}
              onClick={() => setStatusModalOpen(!statusModalOpen)}
              title={"Walk"}
              img={girlWalk}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}></Grid>
        </Grid>
      </Box>
      {statusModalOpen && (
        <CustomModal
          statusModalOpen={statusModalOpen}
          setStatusModalOpen={setStatusModalOpen}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          date={date}
          setDate={setDate}
          setDuration={setDuration}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          duration={duration}
          activity={activity}
          setActivity={setActivity}
          onClickHandler={createActivityHandler}
          onClickCancelHandler={cancelHandler}
          handleStartTimeChange={handleStartTimeChange}
          handleEndTimeChange={handleEndTimeChange}
          timeValidationError={timeValidationError}
          setTimeValidationError={setTimeValidationError}
          loading={loading}
        />
      )}
    </>
  );
}
