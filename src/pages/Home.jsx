import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "../components/Card";
import boyRun from "../assets/imgs/boy-run.png";
import boySwim from "../assets/imgs/boy-swim.png";
import boyHike from "../assets/imgs/boy-hike.png";
import girlWalk from "../assets/imgs/girl-walk.png";
import girlBicycleRide from "../assets/imgs/girl-bicycle.png";
import CountCard from "../components/CountCard";
import { GiRun } from "react-icons/gi";
import { FaSwimmer } from "react-icons/fa";
import { BiCycling } from "react-icons/bi";
import { RiWalkLine } from "react-icons/ri";
import { GiEgyptianWalk } from "react-icons/gi";

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={8}>
        <Grid xs={2}>
          <CountCard
            icon={
              <GiRun
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
            }
            title={"Run"}
            count={"243"}
            color={"#ADEFB0"}
          />
        </Grid>
        <Grid xs={2}>
          <CountCard
            icon={
              <FaSwimmer
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
            }
            title={"Swim"}
            count={"203"}
            color={"#ADEFB0"}
          />
        </Grid>
        <Grid xs={2}>
          <CountCard
            icon={
              <GiEgyptianWalk
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
            }
            title={"Hike"}
            count={"273"}
            color={"#ADEFB0"}
          />
        </Grid>
        <Grid xs={2}>
          <CountCard
            icon={
              <BiCycling
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
            }
            title={"Bicycle Ride"}
            count={"303"}
            color={"#ADEFB0"}
          />
        </Grid>
        <Grid xs={2}>
          <CountCard
            icon={
              <RiWalkLine
                style={{
                  width: "30px",
                  height: "30px",
                }}
              />
            }
            title={"Walk"}
            count={"200"}
            color={"#ADEFB0"}
          />
        </Grid>

        <Grid xs={2}></Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <Card onClick={() => console.log("Run")} title={"Run"} img={boyRun} />
        </Grid>
        <Grid xs={4}>
          <Card
            onClick={() => console.log("Swim")}
            title={"Swim"}
            img={boySwim}
          />
        </Grid>
        <Grid xs={4}>
          <Card
            onClick={() => console.log("Hike")}
            title={"Hike"}
            img={boyHike}
          />
        </Grid>
        <Grid xs={4}>
          <Card
            onClick={() => console.log("Bicycle Ride")}
            title={"Bicycle Ride"}
            img={girlBicycleRide}
          />
        </Grid>
        <Grid xs={4}>
          <Card
            onClick={() => console.log("Walk")}
            title={"Walk"}
            img={girlWalk}
          />
        </Grid>
        <Grid xs={4}></Grid>
      </Grid>
    </Box>
  );
}
