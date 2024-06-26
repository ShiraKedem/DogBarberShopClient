import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { addQueue } from "./queueApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../users/Login.css";

export const AddQueue = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [message, setMessage] = useState("");
  const [signUp, setSignUp] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const response = await addQueue(data.date, data.time);
      setMessage("Queue added successfully!");
      dispatch({ type: "AddQueue_SUCCESS", payload: response });
      reset();
    } catch (error) {
      alert("נכנס ל-CATCH");
      setMessage(error.response ? error.response.data.message : error.message);
      if (
        error.response &&
        error.response.data.message === "User does not exist"
      ) {
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
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
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
          קביעת תור
        </Typography>
        <TextField
          style={{ width: "350px", fontSize: "19px", marginBottom: "20px" }}
          label="תאריך"
          type="date"
          variant="outlined"
          margin="dense"
          {...register("date", {
            required: { value: true, message: "שדה זה חובה" },
          })}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {errors.date && (
          <Alert severity="error" style={{ width: "300px" }}>
            {errors.date.message}
          </Alert>
        )}
        <TextField
          style={{ width: "350px", fontSize: "19px", marginBottom: "20px" }}
          label="שעה"
          type="text"
          variant="outlined"
          margin="dense"
          {...register("time", {
            required: { value: true, message: "שדה זה חובה" },
          })}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {errors.time && (
          <Alert severity="error" style={{ width: "300px" }}>
            {errors.time.message}
          </Alert>
        )}
        {message && (
          <Alert severity="success" style={{ width: "300px" }}>
            {message}
          </Alert>
        )}

        <Link to="/getAllQueues">
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "350px",
              marginTop: "20px",
              backgroundColor: "warning.main",
              fontSize: "19px",
              fontFamily: "'Roboto Slab', serif",
            }}
          >
            קביעת תור
          </Button>
        </Link>
        {signUp && <Link to="/signUp" />}
      </form>
    </div>
  );
};

export default AddQueue;
