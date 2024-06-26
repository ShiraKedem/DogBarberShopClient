import React from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { Logout as LogoutAction } from "./usersSlice"; // הניחו שזהו הפעולה של Redux
import { logout } from "./usersApi"; // הניחו שזהו ה-API שלך

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
       logout(); // בוצע התנתקות באמצעות ה-API
      dispatch(LogoutAction()); // מפעיל פעולה של Redux להתנתקות
      
    } catch (error) {
      console.error("לא התנתק בהצלחה", error); // הדפסת שגיאה במקרה של כישלון
    }
  };

  return (
    <Button
      onClick={handleLogout}
      variant="contained"
      color="primary"
      style={{
        // width: "300px",
        // marginLeft: "30px",
        // marginTop: "38px",
        backgroundColor: "black",
      }}
    >
      התנתק
    </Button>
  );
};

export default Logout;
