import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/cartContext";
import {
  deleteEntityById,
  getEntityById,
  updateEntityById,
} from "../services/fetchService";

function ProductViewPage() {
  const isAdmin = false;
  const location = useLocation();
  const { productId } = location.state;
  const [product, setProduct] = useState();
  const [amount, setAmount] = useState(0);
  const cartState = useContext(CartContext);
  const cart = cartState.state.cart;
  const addToCart = cartState.addAmountOfProductToCart;
  const [updatedParams, setUpdatedParams] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getEntityById({ name: "product", id: productId }).then((product) => {
      setProduct(product);
      setUpdatedParams({ ...product });
    });
  }, [productId]);

  return (
    <>
      {product && (
        <Box sx={{ width: 500, marginRight: 2, marginLeft: 2 }}>
          <Box sx={{ my: 3, mx: 2 }}>
            <Grid container alignItems="center">
              <Grid item xs>
                {!isAdmin ? (
                  <Typography
                    gutterBottom
                    variant="h4"
                    style={{ fontWeight: "bold" }}
                    component="div"
                  >
                    {product.name}
                  </Typography>
                ) : (
                  <TextField
                    style={{ marginTop: 10, marginBottom: 10 }}
                    label="שם המוצר"
                    value={updatedParams.name}
                    onChange={(e) =>
                      setUpdatedParams({
                        ...updatedParams,
                        name: e.target.value,
                      })
                    }
                  />
                )}
              </Grid>
              <Grid item>
                {!isAdmin ? (
                  <Typography gutterBottom variant="h4" component="div">
                    ₪{product.price}
                  </Typography>
                ) : (
                  <TextField
                    style={{ marginTop: 10, marginBottom: 10 }}
                    label="מחיר"
                    type="number"
                    inputProps={{
                      min: 0,
                    }}
                    value={updatedParams.price}
                    onChange={(e) =>
                      setUpdatedParams({
                        ...updatedParams,
                        price: Number(e.target.value),
                      })
                    }
                  />
                )}
              </Grid>
            </Grid>

            {!isAdmin ? (
              <Typography color="text.secondary" variant="h5">
                {product.description}
              </Typography>
            ) : (
              <TextField
                style={{ marginTop: 10, marginBottom: 10 }}
                label="תיאור"
                value={updatedParams.description}
                onChange={(e) =>
                  setUpdatedParams({
                    ...updatedParams,
                    description: e.target.value,
                  })
                }
              />
            )}
          </Box>
          <Divider variant="middle" />
          <Box
            sx={{ my: 2, mx: 2 }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            height={300}
          >
            <img
              src={!isAdmin ? product.image : updatedParams.image}
              style={{ maxWidth: 300 }}
              alt="Product"
            />
            {isAdmin && (
              <TextField
                style={{ margin: 20 }}
                label="קישור לתמונה"
                value={updatedParams.image}
                onChange={(e) =>
                  setUpdatedParams({
                    ...updatedParams,
                    image: e.target.value,
                  })
                }
              />
            )}
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            {!isAdmin ? (
              <>
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
              </>
            ) : (
              <>
                <Button
                  style={{ margin: 10 }}
                  variant="contained"
                  disabled={!updatedParams}
                  onClick={() => {
                    updateEntityById({
                      name: "product",
                      id: product._id,
                      entity: updatedParams,
                    });
                  }}
                >
                  עדכון פרטי המוצר
                </Button>
                <Button
                  style={{ margin: 10 }}
                  variant="contained"
                  color="error"
                  disabled={!updatedParams}
                  onClick={() => {
                    deleteEntityById({
                      name: "product",
                      id: product._id,
                    });
                    navigate("/home");
                  }}
                >
                  מחיקת המוצר
                </Button>
              </>
            )}
          </Box>
        </Box>
      )}
    </>
  );
}

export default ProductViewPage;
