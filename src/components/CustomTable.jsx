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
import dayjs from "dayjs";
import EditCustomModal from "./EidtCustomModal";
const CustomTable = ({ data, handleDelete }) => {
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
  const [loading, setLoading] = React.useState(false);
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

  const handleEditClick = (item) => {
    setSelectedItem(item);
    setName(item?.name);
    setDescription(item?.description);
    setActivity(item?.activityType);

    // Validate and set date
    if (item?.date && dayjs(item.date).isValid()) {
      setDate(dayjs(item.date));
    } else {
      setDate(null); // Set to null when date is invalid or missing
    }

    // Validate and set start time
    if (item?.startTime && dayjs(item.startTime, "HH:mm").isValid()) {
      setStartTime(dayjs(item.startTime, "HH:mm"));
    } else {
      setStartTime(null); // Set to null when start time is invalid or missing
    }

    // Validate and set end time
    if (item?.endTime && dayjs(item.endTime, "HH:mm").isValid()) {
      setEndTime(dayjs(item.endTime, "HH:mm"));
    } else {
      setEndTime(null); // Set to null when end time is invalid or missing
    }

    setDuration(item?.duration);
    setStatusModalOpen(true);
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    handleDelete(item); // Call the handleDelete function with the item as an argument
    // setStatusModalOpen(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
              {columns?.map((column) => (
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
                key={item?._id}
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
                    <Avatar alt={item?._id} src={item?.url} />
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
