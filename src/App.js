import logo from "./logo.svg";
import "./App.css";
import Login from "./features/users/Login";
import Logout from "./features/users/Logout";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import AddQueue from "./features/queue/AddQueue";
import GetAllQueues from "./features/queue/GetAllQueues";
import NavBar from "./NavBar";
import UpdateQueue from "./features/queue/UpdateQueue";

function App() {
  return (
    <>
      <NavBar />
      <Home />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/addQueue" element={<AddQueue />} />
        <Route path="/getAllQueues" element={<GetAllQueues />} />
        <Route path="/updateQueue/:queueId" element={<UpdateQueue />} />
      </Routes>
      {/* <Login />
      
      <Logout /> */}
    </>
  );
}

export default App;
