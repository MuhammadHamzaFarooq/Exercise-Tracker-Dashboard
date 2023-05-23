import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function MediaCard({ img, onClick, title }) {
  return (
    <Card sx={{ maxWidth: 345, marginTop: "10px" }}>
      <CardMedia
        sx={{ height: 320, objectFit: "contain" }}
        image={img}
        title="green iguana"
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CardContent sx={{ padding: 0, marginTop: 4, marginLeft: 2 }}>
          <Typography variant="h4" component="h2">
            {title}
          </Typography>
        </CardContent>
        <br />
        <CardActions
          sx={{
            paddingBottom: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              backgroundColor: "#0DC58A",
              width: "140px",
              color: "white",
              margin: "0px",
              "&:hover": {
                backgroundColor: "#0DC58A", // Set the same background color on hover
              },
              left: "15px",
            }}
            size="large"
            onClick={onClick}
          >
            START
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
