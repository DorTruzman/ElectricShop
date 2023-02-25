import React, { useContext, useEffect, useState } from "react";
import AreaChart from "../components/AreaChart";
import { Button, TextField, Typography } from "@mui/material";
import { SocketContext } from "../contexts/socketContext";
import UserSearch from "../components/UserSearch";

function AdminPage() {
  const [numberOfConnected, setNumberOfConnected] = useState(0);
  const [adminMsg, setAdminMsg] = useState();
  const [lastAdminMsg, setLastAdminMsg] = useState();
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit("ToAPI");
    socket.on("FromAPI", (data) => {
      setNumberOfConnected(data.numberOfConnected);
      data.lastAdminMsg && setLastAdminMsg(data.lastAdminMsg);
    });
  }, []);

  return (
    <>
      <Typography>מספר המחוברים כעת: {numberOfConnected}</Typography>
      <Typography>הודעת אדמין אחרונה: {lastAdminMsg}</Typography>
      <TextField
        label="הודעת אדמין"
        variant="standard"
        style={{ width: "20%", marginLeft: 50 }}
        placeholder="הודעת אדמין"
        value={adminMsg}
        onChange={(e) => setAdminMsg(e.target.value)}
      />
      <Button onClick={() => socket && socket.emit("ToAPI", adminMsg)}>
        שלח
      </Button>

      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AreaChart />
        <UserSearch />
      </div>
    </>
  );
}

export default AdminPage;
