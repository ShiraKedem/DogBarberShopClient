import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  CssBaseline,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

import { updateQueue as updateQ } from "./queueApi";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f48fb1", // ורוד בהיר
    },
    secondary: {
      main: "#f06292", // ורוד בינוני
    },
    warning: {
      main: "#d2691e", // צבע חם כמו הפרווה בתמונה
    },
  },
});

export const UpdateQueue = () => {
  const dispatch = useDispatch();
  const { queueId } = useParams(); // Get the queueId from the URL
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [userExists, setUserExists] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await updateQ(queueId, data.date, data.time);
      setMessage("עריכת התור התבצעה בהצלחה");

      window.location.href = "/getAllQueues";

      dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
      reset();
    } catch (error) {
      setMessage("שגיאה");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          position: "absolute",
          right: 100,
          top: "40%",
          transform: "translateY(-50%)",
          padding: 2,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 250,
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
            עדכון תור
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "warning.main",
                "&:hover": { bgcolor: "#cd6839" },
              }}
            >
              עדכון תור
            </Button>

            {message && <Typography color="error">{message}</Typography>}
            {userExists && (
              <Typography color="error">המשתמש כבר קיים במערכת.</Typography>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default UpdateQueue;
