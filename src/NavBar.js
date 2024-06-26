import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import PhoneIcon from "@mui/icons-material/Phone"; // ייבוא האייקון של הטלפון
import { styled } from "@mui/material/styles";

const CustomAppBar = styled(AppBar)({
  backgroundColor: "#ffffff",
  height: "70px", // הוספת גובה ל-AppBar
  boxShadow: "0px 9px 6px rgba(0, 0, 0, 0.1)", // הוספת הצללה כדי להדגיש את ה-AppBar
});

const CustomIconButton = styled(IconButton)({
  marginRight: "16px",
});

const CustomTypography = styled(Typography)({
  flexGrow: 1,
  // textShadow: "2px 2px 2px rgba(0, 0, 0, 0.3)",
  color: "#D2B48C", // צבע בז' לטקסט
  fontFamily: "'Roboto Slab', serif", // שימוש בפונט מעניין יותר
  fontWeight: "600", // עובי פונט
});

const PhoneContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  color: "#000000", // צבע שחור לטקסט ולסמל
});

const PhoneNumber = styled(Typography)({
  marginLeft: "16px", // רווח בין האייקון למספר הטלפון
  color: "#000000", // צבע שחור לטקסט
  fontFamily: "'Roboto Slab', serif",
  fontWeight: "800",
});

const NavBar = () => {
  return (
    <CustomAppBar position="static" className="home">
      <Toolbar variant="regular">
        <CustomIconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon style={ {color: "#D2B48C"}} />
        </CustomIconButton>
        <CustomTypography variant="h3">DogBarberShop</CustomTypography>
        
      </Toolbar>
    </CustomAppBar>
  );
};

export default NavBar; // ודא שהקומפוננטה מיוצאת כברירת מחדל
