import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";

function Product({
  id,
  name,
  price,
  description,
  image,
  productType,
  addToCart,
  searchProductsByType,
}) {
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
        <Typography color="text.secondary" variant="body2">
          {description}
        </Typography>
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
      <Box sx={{ mt: 4, ml: 15 }}>
        <Button
          onClick={() => {
            addToCart && addToCart(id);
          }}
        >
          הוספה לסל הקניות
        </Button>
        {/* <Button
          color="success"
          onClick={() => {
            searchProductsByType && searchProductsByType(productType._id);
          }}
        >
          עוד {productType.name}
        </Button> */}
      </Box>
    </Box>
  );
}

export default Product;
