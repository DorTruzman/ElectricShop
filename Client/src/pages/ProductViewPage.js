import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CartContext } from "../contexts/cartContext";
import { getEntityById } from "../services/fetchService";

function ProductViewPage() {
  const location = useLocation();
  const { productId } = location.state;
  const [product, setProduct] = useState();
  const [amount, setAmount] = useState(0);
  const cartState = useContext(CartContext);
  const cart = cartState.state.cart;
  const addToCart = cartState.addAmountOfProductToCart;

  useEffect(() => {
    getEntityById({ name: "product", id: productId }).then((product) => {
      setProduct(product);
    });
  }, [productId]);

  return (
    <>
      {product && (
        <Box sx={{ width: 500, marginRight: 2, marginLeft: 2 }}>
          <Box sx={{ my: 3, mx: 2 }}>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography
                  gutterBottom
                  variant="h4"
                  style={{ fontWeight: "bold" }}
                  component="div"
                >
                  {product.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="h4" component="div">
                  ₪{product.price}
                </Typography>
              </Grid>
            </Grid>
            <Typography color="text.secondary" variant="h5">
              {product.description}
            </Typography>
          </Box>
          <Divider variant="middle" />
          <Box
            sx={{ my: 2, mx: 2 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={300}
          >
            <img src={product.image} style={{ maxWidth: 300 }} alt="Product" />
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <TextField
              label="כמות"
              variant="standard"
              style={{ width: "10%", marginLeft: 50 }}
              placeholder="כמות"
              type="number"
              inputProps={{ min: 1, max: cartState.MAX_AMOUNT, step: 1 }}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <Button
              variant="contained"
              disabled={
                !amount ||
                (cart[product._id] &&
                  cart[product._id].amount + amount > cartState.MAX_AMOUNT)
              }
              onClick={() => {
                addToCart && addToCart(product._id, amount);
              }}
            >
              הוספה לסל הקניות
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
}

export default ProductViewPage;
