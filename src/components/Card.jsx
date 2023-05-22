// import * as React from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { CardActionArea } from "@mui/material";

// export default function CardComponent({ img, onClick, title }) {
//   return (
//     <Card
//       sx={{
//         width: "100%",
//         height: "100%",
//         maxWidth: "345px",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <CardActionArea sx={{ display: 'flex', flexDirection: 'column', height:"100%"}}>
//         <CardMedia
//           component="img"
//           height="140px"
//           width="140px"
//           image={img}
//           alt="green iguana"
//         />

//         <CardContent
//           sx={{
//             height: 'auto',
//             alignItems  : 'flex-end',
//             textAlign: "center",
//           }}
//         >
//           <Typography gutterBottom variant="h4" component="div">
//             {title}
//           </Typography>
//           <Typography
//             gutterBottom
//             variant="h6"
//             component="button"
//             onClick={onClick}
//             sx={{
//               backgroundColor: "#0DC58A",
//               width: "140px",
//               color: "white",
//             }}
//           >
//             Start
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// }

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
    <Card sx={{ maxWidth: 345 }}>
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
          <Typography
            gutterBottom
            variant="h5"
            sx={{ padding: "0px" }}
            component="div"
          >
            {title}
          </Typography>
        </CardContent>
        <CardActions sx={{ paddingBottom: 3 }}>
          <Button
            sx={{
              backgroundColor: "#0DC58A",
              width: "140px",
              color: "white",
              margin: "0px",
            }}
            size="large"
          >
            START
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
