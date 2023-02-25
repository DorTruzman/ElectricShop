import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/cartContext";
import { getEntityById } from "../services/fetchService";

function CartPage() {
  const [products, setProducts] = useState([]);
  const cartState = useContext(CartContext);
  const cart = cartState.state.cart;

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
              <Button
                color="success"
                variant="contained"
                style={{
                  fontSize: "1.5em",
                  marginTop: 20,
                }}
              >
                רכישה
              </Button>
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
