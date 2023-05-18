import React from "react";

const CountCard = ({ icon, title, count, color }) => {
  return (
    <div
      style={{
        display: "flex",
        // backgroundColor: "#ADEFB0",
        backgroundColor: { color },
        padding: "10px",
        width: "200px",
        height: "130px",
        boxShadow: " 5px 2px 12px gray",
      }}
    >
      {/* Box One */}
      <div
        style={{
          //   backgroundColor: "greenyellow",
          flex: 2,
          padding: "10px",
        }}
      >
        <div>
          {/* <GiRun
            style={{
              width: "30px",
              height: "30px",
            }}
          /> */}
          {icon}
        </div>
        <div>
          <h3>{title}</h3>
        </div>
      </div>
      {/* Box Two */}
      <div
        style={{
          //   backgroundColor: "red",
          flex: 1,
          alignItems: "flex-end",
          alignSelf: "flex-end",
        }}
      >
        <h4
          style={{
            alignSelf: "flex-end",
            fontWeight: "bold",
            fontSize: "29px",
          }}
        >
          {count}
        </h4>
      </div>
    </div>
  );
};

export default CountCard;
