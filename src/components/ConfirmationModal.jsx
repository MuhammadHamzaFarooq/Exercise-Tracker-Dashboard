import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const ConfirmationModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 5,
          borderRadius: "10px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Are you sure you want to delete this Activity?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
          <Button onClick={onClose} sx={{ marginRight: 1 }}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            // color="primary"
            sx={{
              backgroundColor: "#0DC58A",
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationModal;
