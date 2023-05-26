import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import fitnessLogo from "../assets/imgs/Workout-bold.png";
import AppsIcon from "@mui/icons-material/Apps";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import LogoutIcon from "@mui/icons-material/Logout";
import CustomTable from "./CustomTable";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const formatTime = (timeString) => {
  const time = new Date(timeString);
  return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const data = [
  {
    id: "6469fecfb4044b9635d124ce",
    name: "sunday walk",
    description: "something ....",
    date: formatDate("2023-05-21T00:00:00.000+00:00"),
    duration: "3 hours",
    startTime: formatTime("2023-05-21T14:13:19.000+00:00"),
    endTime: formatTime("2023-05-21T14:13:19.003+00:00"),
    status: "In Progress",
    activityType: "Walk",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683179/Exercise%20Tracker%20Dashboard/walk_and_palying_phone_flat_vector_illustration1_generated_pp1jp2.jpg",
  },
  {
    id: "6469fef9b4044b9635d124d4",
    name: "sunday Swim",
    description: "something ....",
    date: formatDate("2023-05-21T00:00:00.000+00:00"),
    duration: "4 hours",
    startTime: formatTime("2023-05-23T14:13:19.000+00:00"),
    endTime: formatTime("2023-05-23T14:13:19.004+00:00"),
    status: "Pending",
    activityType: "Swim",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683107/Exercise%20Tracker%20Dashboard/8si7_juh6_130430_fwsd9c.jpg",
  },
  {
    id: "646a37a87e920bff8fb4521c",
    name: "Wednesday Running",
    description: "something ....",
    date: formatDate("2023-05-21T00:00:00.000+00:00"),
    duration: "4 hours",
    startTime: formatTime("2023-05-07T14:13:19.000Z"),
    endTime: formatTime("2023-05-07T14:13:19.004Z"),
    status: "Pending",
    activityType: "Run",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683136/Exercise%20Tracker%20Dashboard/runing_man_generated_dfog6w.jpg",
  },
  {
    id: "646a3b5856b97acaaecc4c69",
    name: "Thursday Hiking ",
    description: "something ....",
    date: formatDate("2023-05-25T00:00:00.000+00:00"),
    duration: "4 hours",
    startTime: formatTime("2023-05-07T14:13:19.000Z"),
    endTime: formatTime("2023-05-07T14:13:19.004+00:00"),
    status: "Pending",
    activityType: "Hike",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683190/Exercise%20Tracker%20Dashboard/hiking-illustration-vector_bigs43.jpg",
  },
  {
    id: "646a3b5856b97acaaecc4c69",
    name: "Friday Bicycle Riding ",
    description: "something ....",
    date: formatDate("2023-05-26T00:00:00.000Z"),
    duration: "4 hours",
    startTime: formatTime("2023-05-07T14:13:19.000Z"),
    endTime: formatTime("2023-05-07T14:13:19.004Z"),
    status: "Pending",
    activityType: "Bicycle Ride",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684684638/Exercise%20Tracker%20Dashboard/1892_R0lVIERBTiA0NDItMDc_cosxob.jpg",
  },
  {
    id: "6469fecfb4044b9635d124ce",
    name: "sunday walk",
    description: "something ....",
    date: formatDate("2023-05-21T00:00:00.000+00:00"),
    duration: "3 hours",
    startTime: formatTime("2023-05-21T14:13:19.000+00:00"),
    endTime: formatTime("2023-05-21T14:13:19.003+00:00"),
    status: "In Progress",
    activityType: "Walk",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683179/Exercise%20Tracker%20Dashboard/walk_and_palying_phone_flat_vector_illustration1_generated_pp1jp2.jpg",
  },
  {
    id: "6469fef9b4044b9635d124d4",
    name: "sunday Swim",
    description: "something ....",
    date: formatDate("2023-05-21T00:00:00.000+00:00"),
    duration: "4 hours",
    startTime: formatTime("2023-05-23T14:13:19.000+00:00"),
    endTime: formatTime("2023-05-23T14:13:19.004+00:00"),
    status: "Pending",
    activityType: "Swim",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683107/Exercise%20Tracker%20Dashboard/8si7_juh6_130430_fwsd9c.jpg",
  },
  {
    id: "646a37a87e920bff8fb4521c",
    name: "Wednesday Running",
    description: "something ....",
    date: formatDate("2023-05-21T00:00:00.000+00:00"),
    duration: "4 hours",
    startTime: formatTime("2023-05-07T14:13:19.000Z"),
    endTime: formatTime("2023-05-07T14:13:19.004Z"),
    status: "Pending",
    activityType: "Run",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683136/Exercise%20Tracker%20Dashboard/runing_man_generated_dfog6w.jpg",
  },
  {
    id: "646a3b5856b97acaaecc4c69",
    name: "Thursday Hiking ",
    description: "something ....",
    date: formatDate("2023-05-25T00:00:00.000+00:00"),
    duration: "4 hours",
    startTime: formatTime("2023-05-07T14:13:19.000Z"),
    endTime: formatTime("2023-05-07T14:13:19.004+00:00"),
    status: "Pending",
    activityType: "Hike",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683190/Exercise%20Tracker%20Dashboard/hiking-illustration-vector_bigs43.jpg",
  },
  {
    id: "646a3b5856b97acaaecc4c69",
    name: "Friday Bicycle Riding ",
    description: "something ....",
    date: formatDate("2023-05-26T00:00:00.000Z"),
    duration: "4 hours",
    startTime: formatTime("2023-05-07T14:13:19.000Z"),
    endTime: formatTime("2023-05-07T14:13:19.004Z"),
    status: "Pending",
    activityType: "Bicycle Ride",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684684638/Exercise%20Tracker%20Dashboard/1892_R0lVIERBTiA0NDItMDc_cosxob.jpg",
  },
  {
    id: "6469fecfb4044b9635d124ce",
    name: "sunday walk",
    description: "something ....",
    date: formatDate("2023-05-21T00:00:00.000+00:00"),
    duration: "3 hours",
    startTime: formatTime("2023-05-21T14:13:19.000+00:00"),
    endTime: formatTime("2023-05-21T14:13:19.003+00:00"),
    status: "In Progress",
    activityType: "Walk",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683179/Exercise%20Tracker%20Dashboard/walk_and_palying_phone_flat_vector_illustration1_generated_pp1jp2.jpg",
  },
  {
    id: "6469fef9b4044b9635d124d4",
    name: "sunday Swim",
    description: "something ....",
    date: formatDate("2023-05-21T00:00:00.000+00:00"),
    duration: "4 hours",
    startTime: formatTime("2023-05-23T14:13:19.000+00:00"),
    endTime: formatTime("2023-05-23T14:13:19.004+00:00"),
    status: "Pending",
    activityType: "Swim",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683107/Exercise%20Tracker%20Dashboard/8si7_juh6_130430_fwsd9c.jpg",
  },
  {
    id: "646a37a87e920bff8fb4521c",
    name: "Wednesday Running",
    description: "something ....",
    date: formatDate("2023-05-21T00:00:00.000+00:00"),
    duration: "4 hours",
    startTime: formatTime("2023-05-07T14:13:19.000Z"),
    endTime: formatTime("2023-05-07T14:13:19.004Z"),
    status: "Pending",
    activityType: "Run",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683136/Exercise%20Tracker%20Dashboard/runing_man_generated_dfog6w.jpg",
  },
  {
    id: "646a3b5856b97acaaecc4c69",
    name: "Thursday Hiking ",
    description: "something ....",
    date: formatDate("2023-05-25T00:00:00.000+00:00"),
    duration: "4 hours",
    startTime: formatTime("2023-05-07T14:13:19.000Z"),
    endTime: formatTime("2023-05-07T14:13:19.004+00:00"),
    status: "Pending",
    activityType: "Hike",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684683190/Exercise%20Tracker%20Dashboard/hiking-illustration-vector_bigs43.jpg",
  },
  {
    id: "646a3b5856b97acaaecc4c69",
    name: "Friday Bicycle Riding ",
    description: "something ....",
    date: formatDate("2023-05-26T00:00:00.000Z"),
    duration: "4 hours",
    startTime: formatTime("2023-05-07T14:13:19.000Z"),
    endTime: formatTime("2023-05-07T14:13:19.004Z"),
    status: "Pending",
    activityType: "Bicycle Ride",
    avatar:
      "https://res.cloudinary.com/ddpxcjmjn/image/upload/v1684684638/Exercise%20Tracker%20Dashboard/1892_R0lVIERBTiA0NDItMDc_cosxob.jpg",
  },
];

// const data = [];
export default function DashboardLayout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  // const location = useLocation();

  console.log(location);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#F5F5F5" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          boxShadow: "none",
          textShadow: "none",
          borderBottom: "1px solid #e9e9e9",
        }}
      >
        <Toolbar
          sx={{
            backgroundColor: "white",
            boxShadow: "none",
            textShadow: "none",
          }}
        >
          <IconButton
            color="#0DC58A"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              color: "#0DC58A",
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="body2"
              noWrap
              component="div"
              sx={{
                color: "lightgray",
              }}
            >
              Good Morning
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                color: "black",
              }}
            >
              Welcome Back!
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <div
            style={{
              textAlign: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                color: "#0DC58A",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Fitness{" "}
              <span>
                <img src={fitnessLogo} alt="" width={20} height={20} />
              </span>
            </Typography>
          </div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {["Home", "Goals"].map((text, index) => {
            const isActive =
              location.pathname === "/dashboard"
                ? text === "Home"
                : text === "Goals";

            return (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    color: isActive ? "white" : "#0DC58A",
                    backgroundColor: isActive ? "#0DC58A" : "white",
                  }}
                  onClick={() => {
                    text === "Home"
                      ? navigate("/dashboard")
                      : navigate("/dashboard/goals");
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: isActive ? "white" : "#0DC58A",
                    }}
                  >
                    {index % 2 === 0 ? (
                      <Link to={"/dashboard"}>
                        <AppsIcon />
                      </Link>
                    ) : (
                      <Link to={"/dashboard/goals"}>
                        <FitnessCenterIcon />
                      </Link>
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <List
          sx={{
            display: "flex",
            alignContent: "flex-end",
            height: "100%",
          }}
        >
          {["LogOut"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{
                display: "block",
                height: "50px",
                alignSelf: "flex-end",
                color: "#0DC58A",
              }}
            >
              <ListItemButton
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.clear();
                  location.replace("/login");
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  color: "#0DC58A",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "#0DC58A",
                  }}
                >
                  {index % 2 === 0 ? <LogoutIcon /> : <LogoutIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ opacity: open ? 1 : 0, color: "#0DC58A" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#F5F5F5",
          maxHeight: "200vh",
        }}
      >
        <DrawerHeader />
        {/* <Home /> */}
        {/* <CustomTable
          data={data}
          handleEdit={() => console.log("edit Handler Click")}
          handleDelete={() => console.log("delete Handler Click")}
          handleStatus={() => console.log("Status Handler Click")}
        /> */}

        <Outlet />
      </Box>
    </Box>
  );
}
