import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Product({
  _id,
  name,
  price,
  description,
  image,
  productType,
  addToCart,
  searchProductsByType,
}) {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: 360, marginRight: 2, marginLeft: 2 }}>
      <Box sx={{ my: 3, mx: 2 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography
              gutterBottom
              variant="h5"
              style={{ fontWeight: "bold" }}
              component="div"
            >
              {name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6" component="div">
              ₪{price}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider variant="middle" />
      <Box
        sx={{ my: 2, mx: 2 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={150}
      >
        <img src={image} style={{ maxWidth: 180 }} alt="Product" />
      </Box>
      <Box sx={{ mt: 4, ml: 9, my: 1 }}>
        <Button
          onClick={() => {
            addToCart && addToCart(_id);
          }}
        >
          הוספה לסל הקניות
        </Button>
        <Button
          color="success"
          onClick={() => {
            navigate("/product", {
              state: { productId: _id },
            });
          }}
        >
          צפייה במוצר
        </Button>
      </Box>
    </Box>
  );
}

export default Product;
