import React, { useState, useContext } from "react";
import { Button, Checkbox, TextField, CircularProgress } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link, useNavigate } from "react-router-dom";
// import bcrypt from "bcryptjs";
import "../../Style/FormStyling.css";
import { UserContext } from "../../App";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const loginBtnClicked = async (e) => {
    e.preventDefault();
    setLoading(true);
    //   const hashedPassword = await bcrypt.hash(password,10);
    //   const response = await DH_API.login(username, hashedPassword);
    //   if (response.token!==undefined) {
    //       localStorage.setItem("DHToken", response.token);
    //       localStorage.setItem("AccountId", response.accountId);
    //       localStorage.setItem("isAdmin", response.isadmin)
    //       localStorage.setItem("isAgent", response.isagent)
    //       setUser({jwt: localStorage.getItem("DHToken"), id: localStorage.getItem("AccountId")})
    //       setLoading(false)
    navigate("/");
    //   } else {
    //       // login failed
    //       setError("Username or Password Invalid")
    //       setLoading(false)
    //   }
    setLoading(false);
  };

  return (
    <div className="formContainer">
      <h2 style={{ color: "black", fontWeight: "900" }}>Login</h2>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div style={{ display: "flex" }}>
            <TextField
              required
              className="outlined-basic-login"
              type="text"
              label="Username"
              variant="outlined"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div style={{ display: "flex" }}>
            <TextField
              required
              className="outlined-basic-login"
              type="password"
              label="Password"
              variant="outlined"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
        </div>

        <div style={{ padding: 20 }}>
          {error.length > 0 && !loading && (
            <p className="err-msg">
              <span style={{ color: "red", fontWeight: "900" }}>X</span> {error}
            </p>
          )}
        </div>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              // borderStyle: "solid",
              backgroundColor: "#0ac493",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <Button
            style={{
              color: "white",
              backgroundColor: "#1f7ede",
            }}
            type="submit"
            onClick={(e) => {
              loginBtnClicked(e);
            }}
          >
            Login
          </Button>
        )}
      </form>
      <div style={{ padding: 10 }}>
        <Link to="/signup">
          <p style={{ color: "#348feb" }} className="underline">
            New user? Create an account here.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
