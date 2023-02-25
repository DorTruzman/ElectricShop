import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUserDisplayName } from "../services/firebase";

function UserList({ users }) {
  const [updatedUsers, setUpdatedUsers] = useState([]);

  useEffect(() => {
    const updateUsers = async () => {
      let newUsers = [];

      for (const user of users) {
        const dispName = await getUserDisplayName(user.username);
        newUsers.push({ ...user, name: dispName });
      }

      setUpdatedUsers(newUsers);
    };

    updateUsers();
  }, [users]);

  return (
    <List sx={{ width: 500, bgcolor: "background.paper" }}>
      {updatedUsers.map((value, idx) => {
        const labelId = `checkbox-list-secondary-label-${idx}`;
        return (
          <ListItem key={idx}>
            <ListItemAvatar>
              <Avatar alt="Logo" src={value.image} />
            </ListItemAvatar>
            <ListItemText
              id={labelId}
              primary={`${value.name} (סוג - ${
                value.type ? value.type.name : "אין"
              })`}
              secondary={`מספר הזמנות - ${value.amountOfOrders}, אזור - ${
                value.area ? value.area.name : "אין"
              }`}
            />
          </ListItem>
        );
      })}
    </List>
  );
}

export default UserList;
