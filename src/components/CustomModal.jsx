import React, { useEffect, useState } from "react";
import {
  Grid,
  Modal,
  Typography,
  TextField,
  useMediaQuery,
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
import { TurnedIn } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
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
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const multipleChoices = ["Run", "Swim", "Hike", "Bicycle Ride", "Walk"];

const CustomModal = ({
  statusModalOpen,
  setStatusModalOpen,
  name,
  setName,
  description,
  setDescription,
  date,
  setDate,
  setDuration,
  duration,
  activity,
  setActivity,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  onClickHandler,
  onClickCancelHandler,
  handleStartTimeChange,
  handleEndTimeChange,
  timeValidationError,
  setTimeValidationError,
  loading,
}) => {
  const theme = useTheme();

  const handleChange = (event) => {
    setActivity(event.target.value);
  };

  // Add responsive styles based on `isSmallScreen` value

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const modalContainerStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    p: 4,
    borderRadius: "10px",
    padding: "20px",
    width: isSmallScreen ? "90%" : "auto",
    height: isSmallScreen ? "80%" : "auto",
    // Add additional responsive styles here
  };

  const headerTextStyle = {
    textAlign: isSmallScreen ? "center" : "start",
    marginBottom: "10px",
  };

  return (
    <Modal open={statusModalOpen} onClose={() => setStatusModalOpen(false)}>
      <div style={modalContainerStyle}>
        <section>
          <header>
            <Typography variant="h4" sx={headerTextStyle}>
              create Activity
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
                // defaultValue=""
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                label="Description"
                id="outlined-size-normal"
                // defaultValue="Normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div
              style={{
                marginTop: "10px",
              }}
            >
              <TextField
                label="Duration"
                id="outlined-size-normal"
                // defaultValue="Normal"
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
            {/* <div
              style={{
                marginTop: "10px",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Start Time"
                  value={startTime}
                  onChange={(newValue) => setStartTime(timeFormatter(newValue))}
                />
                <TimePicker
                  label="End Time"
                  value={endTime}
                  onChange={(newValue) => setEndTime(timeFormatter(newValue))}
                />
              </LocalizationProvider>
            </div> */}
            <div
              style={{
                marginTop: "10px",
              }}
            >
              {/* ... other text fields ... */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Start Time"
                  value={startTime}
                  onChange={handleStartTimeChange} // Update event handler
                />
                <TimePicker
                  label="End Time"
                  value={endTime}
                  onChange={handleEndTimeChange} // Update event handler
                />
              </LocalizationProvider>
              {timeValidationError && (
                <Typography variant="body2" color="error">
                  Start time and end time must be different.
                </Typography>
              )}
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
            // backgroundColor: "gray",
            width: "100%",
            marginTop: "10px",
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="button"
            // onClick={() => {
            //   console.log("btn click");
            //   setStatusModalOpen(!statusModalOpen);
            // }}
            onClick={onClickHandler}
            sx={{
              backgroundColor: "#0DC58A",
              width: "180px",
              color: "white",
              marginTop: "20px",
              padding: "10px",
              margin: "5px",
            }}
            disabled={loading === true ? true : false}
          >
            {loading ? <CircularProgress /> : <span> Create Activity</span>}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="button"
            onClick={onClickCancelHandler}
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
      </div>
    </Modal>
  );
};

export default CustomModal;
