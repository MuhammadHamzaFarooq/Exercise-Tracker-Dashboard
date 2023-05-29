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

  const handleChange = (event) => {
    setActivity(event.target.value);
  };

  const obj = {
    name,
    description,
    date: dateFormatter(date),
    startTime: timeFormatter(startTime),
    endTime: timeFormatter(endTime),
    duration,
    activityType: activity,
  };

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
    await new Promise((resolve) => setTimeout(resolve, 5000));

    setStatusModalOpen(!statusModalOpen);
    setIsLoading(false);
    Swal.fire("Good job!", "Item Updated successfully", "success");
    dispatch(fetchActivities());
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
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                label="Description"
                id="outlined-size-normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <TextField
                label="Duration"
                id="outlined-size-normal"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
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
          </Typography>
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
