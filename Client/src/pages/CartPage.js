import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/cartContext";
import {
  getEntities,
  getEntityById,
  updateEntityById,
} from "../services/fetchService";
import { auth } from "../services/firebase";

function CartPage() {
  const [products, setProducts] = useState([]);
  const [areas, setAreas] = useState([]);
  const [area, setArea] = useState("");
  const cartState = useContext(CartContext);
  const cart = cartState.state.cart;
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    getEntities({ name: "area" }).then((areaList) => {
      setAreas(areaList);
    });
  }, []);

  useEffect(() => {
    setProducts([]);

    const fetchProducts = async () => {
      let newProducts = [];

      for (const key of Object.keys(cart)) {
        const product = await getEntityById({ name: "product", id: key });
        newProducts.push({ ...product });
      }

      setProducts(newProducts);
    };

    fetchProducts();
  }, [cart]);

  const makePurchase = async () => {
    updateEntityById({
      name: "user",
      id: user.uid,
      entity: { area, purchase: true },
    });
    cartState.setCart({});
    alert("תודה שקנית אצלנו!");
    navigate("/home");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ my: 3, mx: 2 }}>
          <Typography
            variant="h4"
            fontWeight={"bold"}
            style={{ textAlign: "center" }}
          >
            סל הקניות שלך
          </Typography>
          <List sx={{ width: 500, bgcolor: "background.paper" }}>
            {products.map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem
                  key={value}
                  secondaryAction={
                    <>
                      <TextField
                        variant="standard"
                        placeholder="כמות"
                        type="number"
                        inputProps={{
                          min: 1,
                          max: cartState.MAX_AMOUNT,
                          step: 1,
                        }}
                        value={cart[value._id] && cart[value._id].amount}
                        onChange={(e) =>
                          cartState.setAmountOfProductToCart(
                            value._id,
                            Number(e.target.value)
                          )
                        }
                      />

                      <Button
                        color="error"
                        onClick={() =>
                          cartState.deleteProductFromCart(value._id)
                        }
                      >
                        מחק
                      </Button>
                    </>
                  }
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar alt="Logo" src={value.image} />
                    </ListItemAvatar>
                    <ListItemText
                      id={labelId}
                      primary={`${value.name}`}
                      secondary={`${
                        value.price *
                        (cart[value._id] ? cart[value._id].amount : 0)
                      } ₪`}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          <div
            style={{
              textAlign: "center",
            }}
          >
            <Typography>
              סה"כ:{" "}
              {products.reduce(
                (prev, curr) =>
                  prev +
                  curr.price * (cart[curr._id] ? cart[curr._id].amount : 0),
                0
              )}{" "}
              ₪
            </Typography>
            {products.length ? (
              <>
                <FormControl fullWidth style={{ marginTop: 20 }}>
                  <InputLabel id="productTypeSelect">לאן לשלוח?</InputLabel>
                  <Select
                    value={area}
                    labelId="productTypeSelect"
                    label="לאן לשלוח?"
                    onChange={(e) => setArea(e.target.value)}
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

                <Button
                  onClick={() => {
                    makePurchase();
                  }}
                  disabled={!area || area === ""}
                  color="success"
                  variant="contained"
                  style={{
                    fontSize: "1.5em",
                    marginTop: 20,
                  }}
                >
                  רכישה
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
}

export default CartPage;
