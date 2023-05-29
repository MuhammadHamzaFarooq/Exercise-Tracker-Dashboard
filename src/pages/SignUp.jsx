import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaLock } from "react-icons/fa";
import Button from "../components/Button";
import { AiOutlineUser } from "react-icons/ai";
import Input from "../components/Input";
import img from "../assets/imgs/FitnessMainImg.png";
import "./css/Login.css";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../features/auth/authSlice";
import Swal from "sweetalert2";
import { delay } from "../utils/helper";
import { CircularProgress } from "@mui/material";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const validateName = () => {
    if (name.trim() === "") {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail)) {
      setEmailError("Invalid email address");
    } else if (inputEmail.includes(" ")) {
      setEmailError("Email cannot contain spaces");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = () => {
    console.log("handleSubmit Click");
    // Validate name, email, and password before submitting
    validateName();
    validateEmail();
    validatePassword();
    // If there are no errors, proceed with form submission
    if (
      !nameError &&
      !emailError &&
      !passwordError &&
      email &&
      password &&
      name
    ) {
      setLoading(true);

      // Perform your form submission logic here
      const payload = {
        name: name,
        email: email,
        password: password,
      };
      console.log();
      dispatch(signup(payload))
        .then((res) => {
          console.log("Sign up successful", res);
          delay(2000);
          Swal.fire("Good job!", "SignUp  Successfully", "success");
          location.replace("/login");
        })
        .catch((error) => {
          console.error("Sign up error:", error);
          // Handle error here
        });
      console.log("Form submitted successfully");
    } else {
      Swal.fire("Oops!", "SignUp Failed", "error");
    }

    // If there are no errors, proceed with form submission
    if (!nameError && !emailError && !passwordError) {
    }
  };

  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {/* Content Box */}
      <div
        id="content-container"
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          height: "100vh",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <header
          style={{
            height: "15%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: "bold",
              marginTop: "10px",
              textAlign: "center",
              marginTop: "15px",
              marginLeft: "20px",
              marginBottom: "20px",
            }}
          >
            Exercise Tracker{" "}
          </Typography>
          <hr
            style={{
              color: "#D9DBE9",
              height: "1px",
            }}
          />
        </header>
        <section
          id="form-section"
          style={{
            display: "flex",
            width: "60%",
            height: "60%",
            margin: " auto",
            flexDirection: "column",
            marginTop: "50px",
          }}
        >
          <div>
            <div>
              <Typography
                variant="h6"
                component="h2"
                sx={{
                  fontWeight: "bold",
                  marginTop: "10px",
                  marginTop: "15px",
                  marginBottom: "20px",
                }}
              >
                Sign Up
              </Typography>
            </div>
            <div>
              <p
                style={{
                  marginBottom: "10px",
                  color: "#6F6C90",
                }}
              >
                Log into your existing account of Exercise Tracker
              </p>
            </div>
          </div>
          <div>
            <div
              style={{
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              <Input
                _style={{ color: "#6F6C90" }}
                placeholder="Name"
                icon={<AiOutlineUser />}
                type="text"
                onChange={handleNameChange}
                onBlur={validateName}
                value={name}
              />
              {nameError && <p className="error">{nameError}</p>}
            </div>
            <div
              style={{
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              <Input
                _style={{}}
                placeholder="Email"
                icon={<CiMail />}
                type="email"
                onChange={handleEmailChange}
                onBlur={validateEmail}
                value={email}
              />
              {emailError && <p className="error">{emailError}</p>}
            </div>
            <div
              style={{
                marginBottom: "20px",
                marginTop: "20px",
              }}
            >
              <Input
                _style={{}}
                placeholder="Password"
                icon={<FaLock />}
                type="password"
                onChange={handlePasswordChange}
                onBlur={validatePassword}
                value={password}
              />
              {passwordError && <p className="error">{passwordError}</p>}
            </div>
            <div
              style={{
                marginBottom: "30px",
                marginTop: "30px",
              }}
            >
              {/* <Button
                onClick={handleSubmit}
                title="Sign Up"
                _style={{
                  backgroundColor: "#0DC58A",
                  border: "none",
                  width: "100%",
                  padding: "15px",
                  textAlignCenter: "center",
                  borderRadius: "50px",
                  color: "white",
                }}
              /> */}
              <Button
                title={isLoading ? <CircularProgress size={24} /> : "SignUp"}
                onClick={handleSubmit}
                _style={{
                  backgroundColor: "#0DC58A",
                  border: "none",
                  width: "100%",
                  padding: "15px",
                  textAlignCenter: "center",
                  borderRadius: "50px",
                  color: "white",
                }}
                disabled={isLoading}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>
                Don’t have an account?{" "}
                <span>
                  <button
                    onClick={() => navigate("/login")}
                    style={{
                      color: "#2C5688",
                      backgroundColor: "white",
                      outline: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    login
                  </button>
                </span>
              </p>
            </div>
          </div>
        </section>
      </div>
      {/* Image Box  */}
      <div
        id="img-container"
        style={{
          flex: 1,
          backgroundColor: "#F3F1FF",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={img}
          alt=""
          width={"75%"}
          height={"75%"}
          style={{
            marginTop: "50px",
            marginLeft: "50px",
          }}
        />
      </div>
    </div>
  );
};

export default SignUp;
