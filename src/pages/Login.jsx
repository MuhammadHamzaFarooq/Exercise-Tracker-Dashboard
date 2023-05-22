import React from "react";
import { CiMail } from "react-icons/ci";
import { FaLock } from "react-icons/fa";
import Button from "../components/Button";
import Input from "../components/Input";
import img from "../assets/imgs/FitnessMainImg.png";
import "./css/Login.css";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
                SignIn
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
          <form action="">
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
                onChange={(e) => console.log(e.target.value)}
                value={"mhamza2021999@gmail.com"}
              />
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
                onChange={(e) => console.log(e.target.value)}
                value={"1234567890"}
              />
            </div>
            <div
              style={{
                marginBottom: "30px",
                marginTop: "30px",
              }}
            >
              <Button
                onClick={() => navigate("/dashboard")}
                title="Login"
                _style={{
                  backgroundColor: "#0DC58A",
                  border: "none",
                  width: "100%",
                  padding: "15px",
                  textAlignCenter: "center",
                  borderRadius: "50px",
                  color: "white",
                }}
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
                    onClick={() => navigate("/register")}
                    style={{
                      color: "#2C5688",
                      backgroundColor: "white",
                      outline: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Sign Up
                  </button>
                </span>
              </p>
            </div>
          </form>
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

export default Login;
