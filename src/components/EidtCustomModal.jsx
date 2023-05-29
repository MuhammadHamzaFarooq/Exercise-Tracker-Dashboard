import React, { useEffect, useState } from "react";
import {
  Grid,
  Modal,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTheme } from "@mui/material/styles";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { dateFormatter, timeFormatter } from "../utils/helper";
import dayjs from "dayjs";
import { updateActivityApi } from "../features/activity/activityApi";
import { useDispatch } from "react-redux";
import moment from "moment";
import {
  fetchActivities,
  updateActivity,
} from "../features/activity/activitySlice";
import Swal from "sweetalert2";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName?.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const multipleChoices = ["Run", "Swim", "Hike", "Bicycle Ride", "Walk"];

const EditCustomModal = ({
  statusModalOpen,
  setStatusModalOpen,
  name,
  setName,
  description,
  setDescription,
  date,
  setDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  duration,
  setDuration,
  activity,
  setActivity,
  selectedItem,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [durationError, setDurationError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleChange = (event) => {
    setActivity(event.target.value);
  };

  useEffect(() => {
    setIsButtonDisabled(
      !(
        name.trim() &&
        description.trim() &&
        date &&
        startTime &&
        endTime &&
        duration.trim() &&
        activity &&
        !nameError &&
        !durationError
      )
    );
  }, [
    name,
    description,
    date,
    startTime,
    endTime,
    duration,
    activity,
    nameError,
    durationError,
  ]);

  const obj = {
    name: String(name),
    description,
    date: dateFormatter(date),
    startTime: timeFormatter(startTime),
    endTime: timeFormatter(endTime),
    duration: String(duration),
    activityType: activity,
  };

  // Check if all fields are filled in
  const isAllFieldsFilled =
    name && description && date && startTime && endTime && duration && activity;

  const onClickEditHandler = async () => {
    // Validate all fields
    if (
      !name ||
      !description ||
      !date ||
      !startTime ||
      !endTime ||
      !duration ||
      !activity
    ) {
      setDate("");
      startTime("");
      endTime("");
      alert("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    const updateObj = {
      ...selectedItem,
      ...obj,
    };

    await dispatch(updateActivity(selectedItem?._id, updateObj));

    // Simulating a delay for the server response
    await new Promise((resolve) => setTimeout(resolve, 1000));
    dispatch(fetchActivities());
    setStatusModalOpen(!statusModalOpen);

    setIsLoading(false);
    Swal.fire("Good job!", "Activity Updated successfully", "success");
  };

  const onClickCancelHandler = () => {
    setStatusModalOpen(!statusModalOpen);
  };

  return (
    <Modal open={statusModalOpen} onClose={() => setStatusModalOpen(false)}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          width: "40%",
          height: "70%",
          display: "flex",
          flexDirection: "column",
          p: 4,
          borderRadius: "10px",
        }}
      >
        <section>
          <header>
            <Typography
              variant="h4"
              sx={{
                textAlign: "start",
                marginBottom: "10px",
              }}
            >
              Edit Activity
            </Typography>
          </header>
        </section>
        <div>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                label="Name"
                id="outlined-size-normal"
                value={name}
                onChange={(e) => {
                  const enteredName = e.target.value;
                  // Define a regular expression to validate the name (allowing only letters)
                  const nameRegex = /^[a-zA-Z\s]+$/;

                  if (enteredName.trim() === "") {
                    // Empty value, display an error message
                    setName("");
                    setNameError("Name cannot be empty.");
                  } else if (nameRegex.test(enteredName)) {
                    // Valid name, clear error message and set the name state
                    setName(enteredName);
                    setNameError("");
                  } else {
                    // Invalid name, display an error message
                    setNameError(
                      "Invalid name. Only letters and spaces are allowed."
                    );
                  }
                }}
                error={!!nameError}
                helperText={nameError || ""}
                inputProps={{
                  maxLength: 15, // Set the maximum length to 50 characters
                }}
              />

              <TextField
                label="Description"
                id="outlined-size-normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                inputProps={{
                  maxLength: 15, // Set the maximum length to 50 characters
                }}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <TextField
                label="Duration"
                id="outlined-size-normal"
                value={duration}
                onChange={(e) => {
                  const enteredDuration = e.target.value;
                  // Define a regular expression to validate the duration (allowing only numbers)
                  const durationRegex = /^\d*$/;

                  if (durationRegex.test(enteredDuration)) {
                    setDuration(enteredDuration);
                    setDurationError(""); // Clear the error message when the input is valid
                  } else {
                    setDurationError(
                      "Invalid duration. Only numbers are allowed."
                    );
                  }
                }}
                error={!!durationError}
                helperText={durationError || ""}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={date}
                  onChange={(newValue) => setDate(dateFormatter(newValue))}
                  disablePast
                />
              </LocalizationProvider>
            </div>
            <div style={{ marginTop: "10px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Start Time"
                  value={startTime}
                  onChange={(newValue) => setStartTime(newValue)}
                />
                <TimePicker
                  label="End Time"
                  value={endTime}
                  onChange={(newValue) => setEndTime(newValue)}
                />
              </LocalizationProvider>
            </div>
            <div>
              <FormControl sx={{ m: 1, width: 460, mt: 3 }}>
                <Select
                  displayEmpty
                  value={activity}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                  label="Activity Type"
                >
                  <MenuItem disabled value="">
                    <em>Select Activity Type</em>
                  </MenuItem>
                  {multipleChoices?.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, activity, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Box>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "76%",
            marginTop: "10px",
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="button"
            onClick={onClickEditHandler}
            disabled={isLoading || isButtonDisabled}
            sx={{
              backgroundColor: isButtonDisabled ? "gray" : "#0DC58A",
              width: "180px",
              color: "white",
              marginTop: "20px",
              padding: "10px",
              margin: "5px",
            }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Edit Activity"}
          </Typography>
          {/* <Typography
            gutterBottom
            variant="h6"
            component="button"
            onClick={onClickEditHandler}
            disabled={isLoading}
            sx={{
              backgroundColor: "#0DC58A",
              width: "180px",
              color: "white",
              marginTop: "20px",
              padding: "10px",
              margin: "5px",
            }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Edit Activity"}
          </Typography> */}

          <Typography
            gutterBottom
            variant="h6"
            component="button"
            onClick={onClickCancelHandler}
            disabled={isLoading}
            sx={{
              backgroundColor: "#778CA2",
              width: "180px",
              color: "white",
              marginTop: "20px",
              padding: "10px",
              margin: "5px",
            }}
          >
            Cancel
          </Typography>
        </div>
      </Grid>
    </Modal>
  );
};

export default EditCustomModal;
