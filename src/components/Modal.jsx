import React, { useState } from "react";
import { Grid, Modal, Typography, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useTheme } from "@mui/material/styles";

const names = ["Bicycle Ride", "Hike", "Run", "Swim", "Walk"];

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

const CustomModal = ({
  statusModalOpen,
  setStatusModalOpen,
  value,
  setValue,
}) => {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
          height: "60%",
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
                defaultValue="Normal"
              />

              <TextField
                label="Description"
                id="outlined-size-normal"
                defaultValue="Normal"
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
                defaultValue="Normal"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date"
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </LocalizationProvider>
            </div>
            <div>
              <FormControl sx={{ m: 1, width: 460, mt: 3 }}>
                <Select
                  multiple
                  displayEmpty
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Placeholder</em>;
                    }

                    return selected.join(", ");
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                  label="Activity Type"
                >
                  <MenuItem disabled value="">
                    <em>Placeholder</em>
                  </MenuItem>
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
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
            width: "76%",
            marginTop: "10px",
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="button"
            onClick={() => {
              console.log("btn click");
            }}
            sx={{
              backgroundColor: "#0DC58A",
              width: "180px",
              color: "white",
              marginTop: "20px",
              padding: "10px",
              margin: "5px",
            }}
          >
            Start
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="button"
            onClick={() => {
              console.log("btn click");
            }}
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

export default CustomModal;
