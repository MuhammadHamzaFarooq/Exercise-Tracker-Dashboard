import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function CardComponent({ img, onClick, title }) {
  return (
    <Card sx={{ width: "345px", height: "450px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          width="140"
          image={img}
          alt="green iguana"
        />
        <CardContent
          sx={{
            textAlign: "center",
          }}
        >
          <Typography gutterBottom variant="h4" component="div">
            {title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            component="button"
            onClick={onClick}
            sx={{
              backgroundColor: "#0DC58A",
              width: "140px",
              color: "white",
            }}
          >
            Start
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
