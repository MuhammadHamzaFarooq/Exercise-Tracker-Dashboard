// import React from "react";

// const CountCard = ({ icon, title, count, color }) => {
//   console.log(color);
//   return (
//     <div
//       style={{
//         display: "flex",
//         backgroundColor: color ? color : "white",
//         padding: "10px",
//         width: "220px",
//         flexWrap: 'wrap',
//         minWidth: '220px',
//         height: "150px",
//         boxShadow: " 5px 2px 12px gray",
//         borderRadius: "10px",
//         gap:'10px'
//       }}
//     >
//       {/* Box One */}
//       <div
//         style={{
//           //   backgroundColor: "greenyellow",
//           flex: 2,
//           padding: "10px",
//         }}
//       >
//         <div>
//           {/* <GiRun
//             style={{
//               width: "30px",
//               height: "30px",
//             }}
//           /> */}
//           {icon}
//         </div>
//         <div>
//           <h3>{title}</h3>
//         </div>
//       </div>
//       {/* Box Two */}
//       <div
//         style={{
//           //   backgroundColor: "red",
//           flex: 1,
//           alignItems: "flex-end",
//           alignSelf: "flex-end",
//         }}
//       >
//         <h4
//           style={{
//             alignSelf: "flex-end",
//             fontWeight: "bold",
//             fontSize: "29px",
//           }}
//         >
//           {count}
//         </h4>
//       </div>
//     </div>
//   );
// };

// export default CountCard;

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

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
