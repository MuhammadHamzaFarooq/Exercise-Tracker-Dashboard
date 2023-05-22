import { useNavigate } from "react-router-dom";
import bgLanding from "./assets/imgs/bg-landing.png";
import { Typography } from "@mui/material";
import "./index.css"

function App() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: "#F4FFFC",
      }}
    >
      <header
        style={{
          width: "100%",
          height: "25%",
          padding: "30px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <section>
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: "bold",
              marginLeft: "20px",
            }}
          >
            Exercise Tracker
          </Typography>
        </section>
        <section
          className="landing-btn-container"
          style={{
            width: "25%",
            height: "15%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div>
            <button
              style={{
                width: "110px",
                height: "40px",
                backgroundColor: " #0DC58A",
                borderRadius: "20px",
                marginLeft: "10px",
                marginRight: "10px",
                color: "white",
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
          <div>
            <button
              style={{
                position: "absolute",
                width: "110px",
                height: "40px",
                backgroundColor: " #0DC58A",
                borderRadius: "20px",
                color: "white",
              }}
              onClick={() => navigate("/register")}
            >
              SignUp
            </button>
          </div>
        </section>
      </header>
      <section
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* Image Container */}
        <section 
        className="landingImage"
          style={{
            width: "50%",
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={bgLanding}
            alt=""
            width="80%"
            height="50%"
            style={{
              objectFit: "contain",
            }}
          />
        </section>
        <section
        className="landing-content-container"
          style={{
            width: "50%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "80%",
              height: "80%",
            }}
          >
            <h6
              style={{
                color: "#FF8744",
              }}
            >
              TIME TO GET FITNESS PRO
            </h6>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: "bold",
                marginTop: "10px",
              }}
            >
              Fitness Pro for any person.
            </Typography>
            <div
              style={{
                width: "100px",
                height: "2px",
                backgroundColor: "#FF8744",
                marginLeft: "5px",
                marginTop: "15px",
              }}
            ></div>
            <div
              style={{
                marginTop: "10px",
              }}
            >
              <p
                style={{
                  color: "#838796",
                }}
              >
                Track your workouts, get better results, and be the best <br />{" "}
                version of you. Less thinking, more lifting.
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}

export default App;
