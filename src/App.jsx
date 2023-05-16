import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Exercise Tracker</h1>
      <div
        style={{
          display: "flex",
          margin: "10px",
          justifyContent: "space-between",
        }}
      >
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    </>
  );
}

export default App;
