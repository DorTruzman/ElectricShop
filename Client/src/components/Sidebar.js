import {
  Button,
  Drawer,
  FormControl,
  Input,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

function Sidebar({ searchFunction, productTypes }) {
  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");

  useEffect(() => {
    searchFunction &&
      searchFunction({
        name: productName !== "" ? productName : undefined,
        description: productDescription !== "" ? productDescription : undefined,
        productType: productType !== "" ? productType : undefined,
      });
  }, [productName, productDescription, productType]);

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor={"left"}
      open={true}
    >
      <div
        style={{
          marginTop: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight={"bold"}>
          חיפוש מוצרים
        </Typography>
        <List>
          <ListItem>
            <Input
              placeholder="שם המוצר"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <Input
              placeholder="תיאור המוצר"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <FormControl fullWidth>
              <InputLabel id="productTypeSelect">סוג</InputLabel>
              <Select
                value={productType}
                labelId="productTypeSelect"
                label="סוג"
                onChange={(e) => setProductType(e.target.value)}
              >
                <MenuItem value="">
                  <em>ניקוי</em>
                </MenuItem>
                {productTypes &&
                  productTypes.map((type) => (
                    <MenuItem value={type._id}>{type.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </ListItem>
        </List>

        <Button
          variant="contained"
          onClick={() => {
            setProductName("");
            setProductDescription("");
            setProductType("");
          }}
        >
          ניקוי
        </Button>
      </div>
    </Drawer>
  );
}

export default Sidebar;
