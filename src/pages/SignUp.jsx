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
  const [isButtonDisabled, setButtonDisabled] = useState(true);

  const dispatch = useDispatch();

  const validateName = (value) => {
    if (value.trim() === "") {
      setNameError("Name is required");
    } else if (/\d/.test(value)) {
      setNameError("Numbers are not allowed in the name");
    } else {
      setNameError("");
    }
    validateForm();
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
    validateForm();
  };

  const validatePassword = (value) => {
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
    validateForm();
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    validateName(newName);
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const validateForm = () => {
    setButtonDisabled(
      !name || !email || !password || nameError || emailError || passwordError
    );
  };

  // const handleSubmit = () => {
  //   // Validate name, email, and password before submitting
  //   validateName(name);
  //   validateEmail(email);
  //   validatePassword(password);

  //   // If there are no errors, proceed with form submission
  //   if (
  //     !nameError &&
  //     !emailError &&
  //     !passwordError &&
  //     email &&
  //     password &&
  //     name
  //   ) {
  //     setLoading(true);

  //     // Perform your form submission logic here
  //     const payload = {
  //       name: name,
  //       email: email,
  //       password: password,
  //     };
  //     dispatch(signup(payload))
  //       .then((res) => {
  //         console.log("Sign up successful", res);
  //         Swal.fire("Good job!", "SignUp Successfully", "success");
  //         // location.replace("/login");
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.error("Sign up error:", error);
  //         if (
  //           error.response &&
  //           error.response.data &&
  //           error.response.data.message
  //         ) {
  //           Swal.fire("Oops!", error.response.data.message, "error");
  //         } else {
  //           Swal.fire("Oops!", "Sign up failed", "error");
  //         }
  //       });
  //     console.log("Form submitted successfully");
  //   } else {
  //     Swal.fire("Oops!", "SignUp Failed", "error");
  //   }
  // };

  const handleSubmit = async () => {
    // Validate name, email, and password before submitting
    validateName(name);
    validateEmail(email);
    validatePassword(password);

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

      try {
        const response = await dispatch(signup(payload));
        console.log("Sign up successful", response);
        if (response?.success === true) {
          Swal.fire("Good job!", "SignUp Successfully", "success");
          // Redirect to the login page after successful signup
          navigate("/login");
          setLoading(false);
        } else {
          let str = response?.message;
          if (str) {
            str = str.toLowerCase().replace(/_/g, " ");
          }

          Swal.fire("Oops", str, "error");
          setLoading(false);
        }
      } catch (error) {
        console.error("Sign up error:", error);
        Swal.fire("Oops!", error.message || "Signup Failed", "error");
        setLoading(false);
      }
    } else {
      Swal.fire("Oops!", "SignUp Failed", "error");
    }
  };

  // const handleSubmit = () => {
  //   // Validate name, email, and password before submitting
  //   validateName(name);
  //   validateEmail(email);
  //   validatePassword(password);

  //   // If there are no errors, proceed with form submission
  //   if (
  //     !nameError &&
  //     !emailError &&
  //     !passwordError &&
  //     email &&
  //     password &&
  //     name
  //   ) {
  //     setLoading(true);

  //     // Perform your form submission logic here
  //     const payload = {
  //       name: name,
  //       email: email,
  //       password: password,
  //     };

  //     dispatch(signup(payload))
  //       .then((res) => {
  //         console.log("Sign up successful", res);
  //         Swal.fire("Good job!", "SignUp Successfully", "success");
  //         // Redirect to the login page after successful signup
  //         navigate("/login");
  //       })
  //       .catch((error) => {
  //         console.error("Sign up error:", error);
  //         // Handle error here
  //         Swal.fire("Oops!", error.message || "Signup Failed", "error");
  //         setLoading(false);
  //       });
  //   } else {
  //     Swal.fire("Oops!", "SignUp Failed", "error");
  //   }
  // };

  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
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
            Exercise Tracker
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
                value={name}
                onBlur={() => validateName(name)}
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
                value={email}
                onBlur={validateEmail}
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
                value={password}
                onBlur={validatePassword}
              />
              {passwordError && <p className="error">{passwordError}</p>}
            </div>
            <div
              style={{
                marginBottom: "30px",
                marginTop: "30px",
              }}
            >
              <Button
                title={isLoading ? <CircularProgress size={24} /> : "Sign Up"}
                onClick={handleSubmit}
                _style={{
                  backgroundColor: isButtonDisabled ? "#EBE8E8" : "#0DC58A",
                  border: "none",
                  width: "100%",
                  padding: "15px",
                  textAlign: "center",
                  borderRadius: "50px",
                  color: "white",
                }}
                disabled={isButtonDisabled}
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
