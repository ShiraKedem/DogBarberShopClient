import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { login } from "./usersApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Login as loginAction } from "./usersSlice";
import "./Login.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [message, setMessage] = useState("");
  const [signUp, setSignUp] = useState(false);
  const [loginState, setLoginState] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await login(data.userName, data.password);
      if (response && response.data) {
        setMessage(response.data.message);
        dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });

        reset(); 
        window.location.href = "/getAllQueues";
      } else {
        setMessage("Unexpected response from server");
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      setMessage(error.response.data.message);
      if (error.response.data.message === "User does not exist") {
        setSignUp(true);
      }
    }
  };

  return (
    <div className="all-form">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // מרכז את כל הרכיבים אופקית
          justifyContent: "center", // מרכז את כל הרכיבים אנכית
          gap: "20px", // מרווחים בין הרכיבים
        }}
      >
        <Avatar sx={{ m: "20px", bgcolor: "warning.main", margin: "0" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h2"
          variant="h4"
          style={{ marginBottom: "20px" }}
        >
          התחברות
        </Typography>
        <TextField
          style={{ width: "350px", fontSize: "19px", marginBottom: "20px" }}
          label="userName"
          variant="outlined"
          margin="dense"
          {...register("userName", {
            required: { value: true, message: "שדה זה חובה" },
          })}
        />
        {errors.userName && (
          <Alert
            severity="error"
            style={{
              width: "300px",
            }}
          >
            {errors.userName.message}
          </Alert>
        )}
        <TextField
          style={{ width: "350px" }}
          label="password"
          variant="outlined"
          margin="dense"
          type="password"
          {...register("password", {
            required: { value: true, message: "שדה זה חובה" },
            minLength: { value: 6, message: "סיסמה קצרה מידי" },
          })}
        />
        {errors.password && (
          <Alert
            severity="error"
            style={{
              width: "300px",
            }}
          >
            {errors.password.message}
          </Alert>
        )}
        {message && (
          <Alert
            severity="success"
            style={{
              width: "300px",
            }}
          >
            {message}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "350px",
            marginTop: "20px",
            backgroundColor: "warning.main", // תואם לצבע האייקון
            fontSize: "19px",
            fontFamily: "'Roboto Slab', serif",
          }}
        >
          Login
        </Button>
     {loginState&&(<Link to="/addQueue"/>)}

        {signUp && (
          <Link to="/signUp">
            <Button
              variant="contained"
              sx={{
                width: "350px",
                marginTop: "20px",
                backgroundColor: "#D2B48D",
                fontSize: "19px",
                fontFamily: "'Roboto Slab', serif",
              }}
            >
              signUp
            </Button>
          </Link>
        )}
      </form>
    </div>
  );
};

export default Login;
