import React, { useEffect, useState } from "react";

const NotFound = () => {
  let token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      location.replace("/dashboard");
    } else {
      location.replace("/login");
    }
  }, []);
  // write UseEffect Logic
  return <div></div>;
};

export default NotFound;
