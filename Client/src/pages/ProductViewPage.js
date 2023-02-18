import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getEntityById } from "../services/fetchService";

function ProductViewPage({}) {
  const location = useLocation();
  const { productId } = location.state;
  const [product, setProduct] = useState();

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
          <Box sx={{ mt: 4, ml: 9, my: 1 }}>
            <Button
              onClick={() => {
                // addToCart && addToCart(id);
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
