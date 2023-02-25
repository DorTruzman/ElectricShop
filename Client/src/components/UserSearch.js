import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { getEntities, searchEntity } from "../services/fetchService";

function UserSearch({ setUsers }) {
  const [userTypes, setUserTypes] = useState();
  const [areas, setAreas] = useState();

  const [userType, setUserType] = useState("");
  const [userMinAmountOfOrders, setUserMinAmountOfOrders] = useState("");
  const [userArea, setUserArea] = useState("");

  const [params, setParams] = useState();

  useEffect(() => {
    getEntities({ name: "userType" }).then((userTypes) => {
      setUserTypes(userTypes);
    });
    getEntities({ name: "area" }).then((areas) => {
      setAreas(areas);
    });
  }, []);

  useEffect(() => {
    if (params) {
      searchEntity({ name: "user", params }).then((productList) => {
        if (setUsers) setUsers(productList);
      });
    }
  }, [params]);

  return (
    <div
      style={{
        display: "flex",
        textAlign: "center",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" fontWeight={"bold"}>
        חיפוש משתמשים
      </Typography>
      <List>
        <ListItem>
          <FormControl fullWidth>
            <InputLabel id="userTypeSelect">סוג</InputLabel>
            <Select
              value={userType}
              labelId="userTypeSelect"
              label="סוג"
              onChange={(e) => setUserType(e.target.value)}
            >
              <MenuItem value="">
                <em>ניקוי</em>
              </MenuItem>
              {userTypes &&
                userTypes.map((type, idx) => (
                  <MenuItem value={type._id} key={`typeMenuItem${idx}`}>
                    {type.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </ListItem>
        <ListItem>
          <TextField
            label="מינימום הזמנות"
            style={{
              width: "65%",
            }}
            variant="standard"
            type="number"
            inputProps={{
              min: 0,
              step: 1,
            }}
            value={userMinAmountOfOrders}
            onChange={(e) => setUserMinAmountOfOrders(Number(e.target.value))}
          />
        </ListItem>
        <ListItem>
          <FormControl fullWidth>
            <InputLabel id="userAreaSelect">אזור</InputLabel>
            <Select
              value={userArea}
              labelId="userAreaSelect"
              label="אזור"
              onChange={(e) => setUserArea(e.target.value)}
            >
              <MenuItem value="">
                <em>ניקוי</em>
              </MenuItem>
              {areas &&
                areas.map((type, idx) => (
                  <MenuItem value={type._id} key={`areaMenuItem${idx}`}>
                    {type.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </ListItem>
        <ListItem>
          <Button
            variant="contained"
            onClick={() => {
              setParams({
                type: userType !== "" ? userType : undefined,
                minOrders:
                  userMinAmountOfOrders !== "" && userMinAmountOfOrders !== 0
                    ? userMinAmountOfOrders
                    : undefined,
                area: userArea !== "" ? userArea : undefined,
              });
            }}
          >
            חפש
          </Button>
        </ListItem>
      </List>
    </div>
  );
}

export default UserSearch;
