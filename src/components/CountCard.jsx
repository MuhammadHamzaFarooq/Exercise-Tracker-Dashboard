import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function MediaControlCard({ icon, title, count, color }) {
  const theme = useTheme();

  return (
    <Card sx={{ display: "flex", backgroundColor: color, padding: "0px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          flex: 1,
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {icon}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {title}
          </Typography>
        </CardContent>
        <Typography
          variant="h4"
          sx={{ alignSelf: "flex-end", fontWeight: "bolder", padding: "10px" }}
          color="text.secondary"
          component="div"
        >
          {count}
        </Typography>
      </Box>
    </Card>
  );
}
