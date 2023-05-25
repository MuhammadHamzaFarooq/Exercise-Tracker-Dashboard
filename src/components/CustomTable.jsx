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
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { dateFormatter, timeFormatter } from "../utils/helper";
import EditCustomModal from "./EidtCustomModal";

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

const names = ["Run", "Swim", "Hike", "Bicycle Ride", "Walk"];

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
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [startTime, setStartTime] = React.useState(null);
  const [endTime, setEndTime] = React.useState(null);
  const [date, setDate] = useState("");
  const [duration, setDuration] = React.useState("");
  const [activity, setActivity] = React.useState([]);
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

  // const handleEditClick = (item) => {
  //   console.log("Edit Click Items ", item?.activity);
  //   setSelectedItem(item);
  //   setName(item?.name);
  //   setDate(item?.date ? dayjs(item.date) : dayjs());
  //   setDescription(item?.description);
  //   setEndTime(item?.endTime);
  //   setStartTime(item?.startTime);
  //   setActivity(item?.activityType);
  //   setDuration(item?.duration);
  //   setStatusModalOpen(true);
  //   handleEdit(item);
  // };
  const handleEditClick = (item) => {
    console.log("Edit Click Items ", item?.activity);
    setSelectedItem(item);
    setName(item?.name);
    setDate(item?.date ? dayjs(item.date) : dayjs());
    setDescription(item?.description);
    setEndTime(item?.endTime ? dayjs(item.endTime) : null);
    setStartTime(item?.startTime ? dayjs(item.startTime) : null);
    setActivity(item?.activityType);
    setDuration(item?.duration);
    setStatusModalOpen(true);
    handleEdit(item);
  };

  const handleDeleteClick = (item) => {
    console.log("Handle Delete Item => ", item);
    setSelectedItem(item);
    handleDelete(item); // Call the handleDelete function with the item as an argument
    // setStatusModalOpen(true);
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

  // const getPaginatedData = () => {
  //   const startIndex = (currentPage - 1) * rowsPerPage;
  //   const endIndex = startIndex + rowsPerPage;
  //   return data?.slice(startIndex, endIndex);
  // };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Check if data is an array before attempting to slice it
    if (!Array.isArray(data)) {
      return [];
    }

    // Check if data has enough elements to slice
    if (startIndex >= data.length) {
      return [];
    }

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

  const onClickHandler = () => {
    console.log("OnlClick Handler Click Edit");
  };
  const onClickCancelHandler = () => {
    console.log("OnlClick Handler Click Cancel");
  };

  return (
    <>
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
                    <Avatar alt={item.id} src={item.url} />
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
      </TableContainer>
      {
        <EditCustomModal
          statusModalOpen={statusModalOpen}
          setStatusModalOpen={setStatusModalOpen}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          date={date}
          setDate={setDate}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          duration={duration}
          setDuration={setDuration}
          activity={activity}
          setActivity={setActivity}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      }
    </>
  );
};

export default CustomTable;
