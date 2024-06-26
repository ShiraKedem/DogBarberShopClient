import React, { useState, useEffect } from "react";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getAllQueues, deleteQueue } from "./queueApi";
import { getUserName, getUserId } from "../user/getUserNameApi";
import { Link } from "react-router-dom";

const GetAllQueues = () => {
  const [queues, setQueues] = useState([]);
  const [message, setMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    getQueues();
    fetchUserId();
  }, []);

  const getQueues = async () => {
    try {
      const response = await getAllQueues();
      const queuesData = response.data;
      setQueues(queuesData);
      fetchUserNames(queuesData);
    } catch (error) {
      setMessage("שגיאה בקבלת התורים");
    }
  };

  const fetchUserId = async () => {
    try {
      const id = await getUserId();
      setCurrentUserId(id);
    } catch (error) {
      console.error("Error fetching userId:", error);
    }
  };

  const fetchUserNames = async (queues) => {
    const userIds = queues.map((queue) => queue.userId);
    const uniqueUserIds = [...new Set(userIds)];
    const names = {};

    await Promise.all(
      uniqueUserIds.map(async (userId) => {
        try {
          const response = await getUserName(userId);
          if (response.status === 200) {
            names[userId] = response.data;
          } else {
            names[userId] = "שגיאה בקבלת השם";
          }
        } catch (error) {
          names[userId] = "שגיאה בקבלת השם";
        }
      })
    );

    setUserNames(names);
  };

  const handleDelete = async (queueId) => {
    try {
      await deleteQueue(queueId);
      getQueues(); // לאחר המחיקה, רענון רשימת התורים
    } catch (error) {
      setMessage("שגיאה במחיקת התור");
    }
  };

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: 13,
          width: "38%",
          marginLeft: "60%",
          textAlign: "center",
        }}
      >
        <Table sx={{ minWidth: 200, textAlign: "center" }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#D2B48C" }}>
              <TableCell sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                שם משתמש
              </TableCell>
              <TableCell sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                תאריך
              </TableCell>
              <TableCell sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                שעה
              </TableCell>
              <TableCell sx={{ fontSize: "1.4rem", fontWeight: "bold" }}>
                פעולות
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {queues.map((queue) => (
              <TableRow key={queue.id} sx={{ backgroundColor: "#FAF0E6" }}>
                <TableCell sx={{ padding: "10px", fontSize: "1rem" }}>
                  {userNames[queue.userId] || "טוען..."}
                </TableCell>
                <TableCell sx={{ padding: "10px", fontSize: "1rem" }}>
                  {queue.date}
                </TableCell>
                <TableCell sx={{ padding: "10px", fontSize: "1rem" }}>
                  {queue.hour}
                </TableCell>
                <TableCell sx={{ padding: "10px", fontSize: "1rem" }}>
                  {queue.userId === currentUserId.data ? (
                    <>
                      <IconButton
                        onClick={() => handleDelete(queue.id)}
                        color="secondary"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>

                      <Link to={`/updateQueue/${queue.id}`}>
                        <IconButton color="primary" size="small">
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </>
                  ) : (
                    // אם המשתמש הנוכחי לא מתאים, מציג תא ריק לשמירה על מבנה העיצוב
                    <></>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {message && <Typography color="error">{message}</Typography>}
      <Link to="/addQueue">
        <Button
          variant="contained"
          sx={{
            bgcolor: "#d2691e",
            width: 250,
            height: 50,
            marginTop: 6,
            marginLeft: "73%",
          }}
        >
          להוספת תור חדש לחץ כאן
        </Button>
      </Link>
    </div>
  );
};

export default GetAllQueues;
