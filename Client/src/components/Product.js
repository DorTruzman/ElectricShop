import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Product({ _id, name, price, image, addToCart }) {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: 360, marginRight: 2, marginLeft: 2 }}>
      <Box sx={{ my: 3, mx: 2, height: 50 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography
              gutterBottom
              variant="h5"
              style={{ fontWeight: "bold" }}
              component="div"
            >
              {name.length > 30 ? name.substring(0, 30) + "..." : name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6" component="div">
              ${price}
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
        <img
          src={image}
          style={{ maxWidth: 180, maxHeight: 140 }}
          alt="Product"
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
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
