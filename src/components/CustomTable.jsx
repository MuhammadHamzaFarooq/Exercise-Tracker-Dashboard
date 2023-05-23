import React, { useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Modal,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PendingIcon from "@mui/icons-material/Pending";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import CustomModal from "./CustomModal";

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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CustomTable = ({ data, handleEdit, handleDelete, handleStatus }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(6);
  const [selectedItem, setSelectedItem] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [value, setValue] = React.useState(dayjs("2022-04-17T15:30"));

  const columns = [
    { id: "activityType", label: "Activity Type" },
    { id: "name", label: "Name" },
    { id: "description", label: "Description" },
    { id: "date", label: "Date" },
    { id: "duration", label: "Duration" },
    { id: "startTime", label: "Start Time" },
    { id: "endTime", label: "End Time" },
    { id: "action", label: "Action" },
  ];

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

  const handleEditClick = (item) => {
    setSelectedItem(item);
    handleEdit(item); // Call the handleEdit function with the item as an argument
    setStatusModalOpen(true);
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    handleDelete(item); // Call the handleDelete function with the item as an argument
    setStatusModalOpen(true);
  };

  const handleStatusClick = (item) => {
    setSelectedItem(item);
    setStatusModalOpen(true);
  };

  const handleStatusChange = (newStatus) => {
    handleStatus(selectedItem, newStatus);
    setStatusModalOpen(false);
    setSelectedItem(null);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(data.length / rowsPerPage);
    const paginationButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationButtons.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
          sx={{
            backgroundColor: i === currentPage ? "#0DC58A" : "white",
            color: i === currentPage ? "white" : "#47556",
            borderRadius: "100px",
            marginTop: "10px",
            marginRight: "2px",
            marginLeft: "2px",
          }}
        >
          {i}
        </Button>
      );
    }
    return paginationButtons;
  };

  return (
    <TableContainer>
      <Table>
        <TableHead
          sx={{
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          {getPaginatedData().map((item) => (
            <TableRow
              key={item.id}
              sx={{
                marginTop: "20px",
              }}
            >
              <TableCell
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    marginRight: "10px",
                  }}
                >
                  <Avatar alt={item.id} src={item.avatar} />
                </span>
                <span>{item.activityType}</span>
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.duration}</TableCell>
              <TableCell>{item.startTime}</TableCell>
              <TableCell>{item.endTime}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEditClick(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(item)}>
                  <DeleteIcon />
                </IconButton>
                {/* <IconButton onClick={() => handleStatusClick(item)}>
                  <PendingIcon />
                </IconButton> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data.length === 0 && (
        <Grid container justifyContent="center" alignItems="center">
          <Typography variant="h5">No data available</Typography>
        </Grid>
      )}
      <Grid container justifyContent="center" alignItems="center">
        {renderPagination()}
      </Grid>
      {selectedItem && (
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
            {/* <Button onClick={() => handleStatusChange("New Status 1")}>
              New Status 1
            </Button> */}
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
                Stop
              </Typography>
              <Typography
                gutterBottom
                variant="h6"
                component="button"
                onClick={() => {
                  console.log("btn click");
                }}
                sx={{
                  backgroundColor: "#FE7F2D",
                  width: "180px",
                  color: "white",
                  marginTop: "20px",
                  padding: "10px",
                  margin: "5px",
                }}
              >
                Discard
              </Typography>
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
                Save
              </Typography>
            </div>
          </Grid>
        </Modal>
      )}
    </TableContainer>
  );
};

export default CustomTable;
